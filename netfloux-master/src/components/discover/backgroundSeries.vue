<template>
  <div>
    <div class="nextReleasesContainer">
      <div class="videoContainer">
        <video autoplay muted loop src="@/assets/narcosvideo.mp4"></video>
      </div>

      <div class="containerReleases">
        <h1>N A R C O S</h1>
        <p class="fs-5">
          Dans ce drame de gangsters, la drogue violente et puissante de Colombie
          Vous assisterez à la véritable histoire des cartels.
        </p>
        <button id="buttonPlay">
          <i class="fas fa-play"></i>

          <span>Lire</span>
        </button>
        <button id="buttonInfo">
          <i class="fas fa-info-circle"></i>

          <span>En savoir plus</span>
        </button>
      </div>
    </div>
  </div>
</template>
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