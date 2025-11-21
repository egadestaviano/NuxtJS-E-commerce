<template>
  <div class="layout-wrapper">
    <!-- header -->
    <Header />
    <!-- end header -->

    <!-- content -->
    <main class="content">
      <Nuxt />
    </main>
    <!-- end content -->

    <!-- footer -->
    <Footer />
    <!-- end footer -->
  </div>
</template>

<script>
  import Header from '@/components/web/header.vue'
  import Footer from '@/components/web/footer.vue'

  export default {
    components: {
      Header,
      Footer
    }
  }
</script>

<style scoped>
.layout-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.content {
  flex-grow: 1;
}
</style>
