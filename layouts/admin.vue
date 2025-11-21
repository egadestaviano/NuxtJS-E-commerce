<template>
  <div class="c-app">
    <div class="c-sidebar c-sidebar-dark c-sidebar-fixed c-sidebar-lg-show" id="sidebar">
      <div class="c-sidebar-brand d-lg-down-none">
        <img src="/images/xiaomi.png" alt="Logo MI STORE" class="bg-light rounded shadow-sm p-2" width="35" />
        <span class="ml-2 font-weight-bold">MI STORE</span>
      </div>

      <!-- sidebar -->
      <Sidebar />
      <!-- end sidebar -->
    </div>

    <div class="c-wrapper c-fixed-components">
      <!-- header -->
      <Header />
      <!-- end header -->

      <div class="c-body">
        <!-- content -->
        <Nuxt />
        <!-- end content -->

        <footer class="c-footer">
          <div><strong>MI STORE</strong> &copy; 2021 - Yanafriyoko.com.</div>
          <div class="ml-auto">
            Template by&nbsp;<a href="https://coreui.io/" target="_blank" rel="noopener noreferrer">CoreUI</a>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/admin/header.vue'
import Sidebar from '@/components/admin/sidebar.vue'

export default {
  middleware: 'isAdmin',
  components: {
    Header,
    Sidebar,
  },
}
</script>

<style scoped>
/* Bisa ditambahkan styling custom di sini */
</style>
