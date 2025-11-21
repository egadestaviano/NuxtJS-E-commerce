<template>
  <div class="container-fluid mt-custom">
    <div id="mycarousel" class="carousel slide" data-ride="carousel" data-interval="4000">
      <div class="carousel-inner">
        <div
          class="carousel-item"
          v-for="(slider, index) in sliders"
          :class="{ active: index === 0 }"
          :key="slider.id"
        >
          <a :href="slider.link" target="_blank" rel="noopener noreferrer">
            <img
              :src="slider.image"
              :alt="slider.title || 'Slider image'"
              class="d-block w-100 rounded"
              loading="lazy"
            />
          </a>
        </div>
      </div>

      <a class="carousel-control-prev" href="#mycarousel" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon banner-icons" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#mycarousel" role="button" data-slide="next">
        <span class="carousel-control-next-icon banner-icons" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  async fetch() {
    await this.$store.dispatch('web/slider/getSlidersData');
  },

  computed: {
    sliders() {
      return this.$store.state.web.slider.sliders;
    },
  },
};
</script>

<style scoped>
/* Tambahan gaya opsional untuk ikon navigasi */
.banner-icons {
  background-color: rgba(0, 0, 0, 0.5);
  padding: 0.75rem;
  border-radius: 50%;
}
</style>
