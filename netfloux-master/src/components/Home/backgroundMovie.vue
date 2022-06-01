<template>
  <div>
    <div class="nextReleasesContainer" style="background: none">
      <div class="videoContainer" style="top: -50px !important">
        <video autoplay muted loop src="@/assets/theplat.mp4"></video>
      </div>

      <div class="containerReleases">
        <h1>THE PLATFORM</h1>
        <p style="font-size: 18px !important">
          Dans une prison, une plate-forme couverte de nourriture descend plusieurs niveaux.
          Alors que les détenus des étages supérieurs mangent à leur maximum, ceux du bas sont affamés et impuissants.
          restes. La rébellion est inévitable.
        </p>
        <button id="buttonPlay" @click="showDetail()">
          <i class="fas fa-play"></i>

          <span>Voir</span>
        </button>
        <button @click="showDetail()" id="buttonInfo">
          <i class="fas fa-info-circle"></i>
          <span>Plus d'information </span>
        </button>
        <modals />
      </div>
    </div>

    <modals
      v-model="isOpen"
      :modalData="modalData"
      :videoId="videoId"
      :modalId="modalId"
    />
  </div>
</template>
<script>
import modals from "@/components/modal/modals.vue";
import axios from "axios";
export default {
  components: { modals },
  data() {
    return {
      isOpen: false,
      modalId: [],
      modalData: [],
      videoId: [],
    };
  },
  methods: {
    async showDetail() {
      try {
        await axios
          .get(
            `https://api.themoviedb.org/3/movie/619264?<//APIKEY\\>&language=en-US&append_to_response=videos,credits,release_dates,similar`
          )
          //TODO: implément api key
          .then((response) => {
            console.log("theplatfrom", response);
            this.modalId = response.data;
            this.modalData = this.modalId;
            console.log("this.modalData :>> ", this.modalData);
          });

        this.isOpen = true;
        this.videoId = this.modalData.videos.results;
      } catch (error) {
        console.error(error);
      } finally {
        this.showLoading = false;
      }
    },
  },
};
</script>
<style>
.videoContainer:after {
  content: "";
  display: block;
  position: absolute;
  width: 100%;
  height: 55%;
  bottom: 0;
  background: -webkit-linear-gradient(to top, #181818, transparent 50%);
  background: linear-gradient(to top, #181818, transparent 50%);
}
</style>
