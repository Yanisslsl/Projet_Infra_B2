# netfloux

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```
## IMAGE USAGE

build:
<em>use DevDockerFile to run this app with vue-cli</em>

```
docker build -f .\DockerFile -t vuejs-netfloux/app .
```

running the container
```
docker run -it -p 8080:80 --rm --name netfloux vuejs-netfloux/app
```
