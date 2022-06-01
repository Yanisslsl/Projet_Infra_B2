<template>
  <div>
    <navBar />
    <backgroundSeries />
    <series />
    <films />
    <others />

    <footers />
  </div>
</template>
<script>
import backgroundSeries from "@/components/discover/backgroundSeries";
import series from "@/components/discover/series";
import others from "@/components/discover/others";

import footers from "@/components/footer/footers.vue";
import films from '../components/discover/films.vue';

export default {
  components: {
    series,
    backgroundSeries,
    others,
    footers,
    films,
  },
};
</script>
