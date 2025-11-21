<template>
  <div class="c-app flex-row align-items-center min-vh-100 d-flex justify-content-center">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-4">
          <Nuxt />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // bisa ditambahkan logic jika diperlukan
}
</script>

<style scoped>
.c-app {
  background-color: #bccad8 !important;
  font-family: 'Quicksand', sans-serif;
}

.form-control {
  height: initial;
  font-size: 1rem;
}

/* Body styling pindahkan ke global */
</style>
