<template>
  <div>
    HELLO
    <video controls class="video">
      <source :src="videoId" type="video/mp4">
      <p>Votre navigateur ne supporte pas la vidéo HTML5. Voici à la place <a href="rabbit320.mp4">un lien vers la vidéo</a>.</p>
    </video>
  </div>
</template>

<script> 
import VideoPlayer from '@/components/Home/video.vue';
import { createDecipheriv } from 'crypto';

export default {
  name: 'VideoExample',
 
  data() {
    return {
      videoId: '',
    };
  },
    methods: {
      mounted() {
        console.log("PARAMS", this.$route.query)
        this.videoId = `http://yanissloisel.com/api/video?video=${this.$route.query.video}`;
      }
    },
         created() {
           console.log("PARAMS", this.$route.query)
           this.videoId = `http://yanissloisel.com/api/video?video=${this.$route.query.id}`;
           console.log(this.videoId);
         },
};
</script>

<style>

.video {
  width: 100%;
  height: 100%;
}
</style>