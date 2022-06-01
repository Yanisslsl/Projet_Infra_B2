# Projet Infra B2 Michel Romain Loisel Yaniss


Pour ce projet nous avons choisi de créer un site web dans lequel il nous serait possible de lire des vidéos depuis un serveur de streaming. Tout ceci orchestre dans un cluster kubernetes installé sur un VPS fournit par [Contabo](https://contabo.com/en/)  avec Ubuntu comme Os , 2VCore , 16Go de RAM et 100Go de SSD. 

### Prérequis: 
- Un Serveur sur lequel installé l'infra (Ici un VPS) 
- Un Back-End (ici en nodejs) sur lequel on streamera nos vidéos 
- Un Front-End qui permettra au client de lire les vidéos streamés depuis le Back
- Un service de stockage des médias (ici un object storage minio)
- Un deuxieme service de stockage nous permettant de backup notre minio (ici aws-s3)

## Mise en place

On commence par installer K3s sur notre serveur, K3s est une distribution light  de Kubernetes qui va ici nous simplifier grandement l'installation et la configuration de notre cluster.
Avec la commande fournit par la doc :

```
curl -sfL https://get.k3s.io | INSTALL_K3S_VERSION=v1.22.9+k3s1  sh - --write-kubeconfig-mode 644
```

On verifie la disponibilité de nos nodes 
```
chronos@vmi744824:~$ kubectl get nodes
NAME                          STATUS   ROLES                  AGE     VERSION
vmi744824.contaboserver.net   Ready    control-plane,master   7d22h   v1.22.9+k3s1
```

Ensuite on peut commencer a deployer notre minio d'apres les fichiers yaml (cf. repo)

On commence par notre PVC (Persistent Volume Claim), nécessaire pour pouvoir communiquer avec le PV automatiquement crée par Minio. Le PVC suivant a 20Go de stockage.

```
k apply -f minio-pvc.yaml
```
On deploit ensuite le deploimemnt minio.

```
k apply -f minio-deploy.yaml
```
Et on finit avec le service qui expose le deploiement de minio.

```
k apply -f minio-service.yaml
```

Nous voila terminé l'installtion de minio sur notre cluster. 
On peut ensuite forwarder notre service minio afin d'acceder a dahboard minio.

```
k port-forward minio-<id-du pod> 8950:9000
```
Un fois sur la plateforme on rentre les credentials specifies dans le deploiment minio, et on peut desormais creer des buckets et upload des fichiers sur notre object storage.

Une fois ces etapes réalisés on passe au deploiment de notre back et de notre front.
Notre serveur de streaming aura pour unique but de streamer le fichier requeté par le client depuis notre object storage (code dispo dans le repo)   
Notre front lui, développé en Vuejs, permettra au client de visionner les vidéos

On creer donc deux dockerfile, le premier est celui fournit  par nodejs pour conteneurise une app nodejs, le deuxieme (pour le front) est tout simplement un serveur nginx qui sert nos fichiers generes par le build de l'app.

Une fois terminé, on push nos images sur un repository (ici docker hub) en n'oubliant d'abord de se login a notre repo avec la commande "docker login" et de tager nos images avec :   [nom repo]:tag

```
docker tag back yanissdu33/nodejsstream:back_4
docker push yanissdu33/nodejsstream:back_4
```

On creer ensuite nos services et nos deploiment pour le front et le back (cf. repo).
On teste ensuite la présence et le statut de nos deploiments. 

```
chronos@vmi744824:~/ProjetInfra$ kubectl get pods
NAME                     READY   STATUS    RESTARTS   AGE
minio-678986485b-n628v   1/1     Running   0          7d22h
front-6984588989-m6k99   2/2     Running   0          7d21h
back-867c9bcfd7-zq87g    2/2     Running   0          7d21h
```

```
chronos@vmi744824:~/ProjetInfra$ kubectl get svc
NAME            TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)    AGE
kubernetes      ClusterIP   10.43.0.1       <none>        443/TCP    7d22h
minio-service   ClusterIP   10.43.194.120   <none>        9000/TCP   7d22h
back-service    ClusterIP   10.43.128.153   <none>        8080/TCP   7d21h
front-service   ClusterIP   10.43.136.68    <none>        8090/TCP   7d21h
```

Ensuite il va nous falloir un moyen de gerer l'accès externe aux services dans notre cluster.
On va donc utiliser un composant Ingress. 
K3s nous fournit deja un controller ingress nommé Traefik, ce que l'on va donc utiliser dans notre cluster.

```
k apply -f ingress.yaml
```
Ici j'ai fournit un hote pour nos rules de routing. Les regles de routing seront appliques uniquement pour l'hote 'yanissloiel.com'. En parrallele j'ai modifier les entrées DNS de mon nom domaine pour qu'il redirige les requetes le traffic http vers l'ip de mon vps.

On peut donc resumer notre cluster avec le shcema suivant:

![](https://cdn.discordapp.com/attachments/766297605755502592/979340722497011814/Untitled_Diagram.png)

## Solution de backup

Il est necessaire ici d'avoir une solution de backup pour notre object storage dans le cas ou notre infra venait a rencontrés a des problemes. Notre Object storage est une application stateful, c'est a dire une application qui depend de certaines data , en opposition avec une stateless application comme nos deploiements par exemple.

Pour ce faire j'utilise un job qui s'executera une fois par jour.
Notre job run un script bash qui a pour but de cloner le contenu de notre object storage minio vers un s3 aws.

```
#!/bin/bash
# File: minio-backup.sh
# Author: Yaniss Loisel


 clone mirror minio-stream/stream-bucket aws-s3/minio-backup-stream-project 1>./minio-backup.log
echo Current Date of Backup is: `date +"%Y-%m-%d %T"` >> ./minio-backup.log

```

Vous pouvez tester le site sur l'url suivante: http://yanissloisel.com/
