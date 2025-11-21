<template>
  <header class="c-header c-header-light c-header-fixed c-header-with-subheader">
    <!-- Mobile Sidebar Toggle -->
    <button class="c-header-toggler c-class-toggler d-lg-none mfe-auto" type="button" data-target="#sidebar" data-class="c-sidebar-show">
      <svg class="c-icon c-icon-lg" aria-hidden="true">
        <use xlink:href="/icons/free.svg#cil-menu"></use>
      </svg>
    </button>

    <!-- Desktop Sidebar Toggle -->
    <button class="c-header-toggler c-class-toggler mfs-3 d-md-down-none" type="button" data-target="#sidebar" data-class="c-sidebar-lg-show">
      <svg class="c-icon c-icon-lg" aria-hidden="true">
        <use xlink:href="/icons/free.svg#cil-menu"></use>
      </svg>
    </button>

    <!-- User Menu -->
    <ul class="c-header-nav ml-auto mr-4">
      <li class="c-header-nav-item dropdown">
        <a class="c-header-nav-link" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
          <div class="c-avatar">
            <img
              class="c-avatar-img"
              :src="avatarUrl"
              alt="User Avatar"
              @error="useFallback"
            />
          </div>
        </a>
        <div class="dropdown-menu dropdown-menu-right pt-0">
          <div class="dropdown-header bg-light py-2 rounded">
            <strong>QUICK MENU</strong>
          </div>

          <NuxtLink class="dropdown-item" to="/admin/categories">
            <svg class="c-icon mr-2" aria-hidden="true">
              <use xlink:href="/icons/free.svg#cil-folder"></use>
            </svg>
            Categories
          </NuxtLink>

          <NuxtLink class="dropdown-item" to="/admin/products">
            <svg class="c-icon mr-2" aria-hidden="true">
              <use xlink:href="/icons/free.svg#cil-layers"></use>
            </svg>
            Products
          </NuxtLink>

          <NuxtLink class="dropdown-item" to="/admin/customers">
            <svg class="c-icon mr-2" aria-hidden="true">
              <use xlink:href="/icons/free.svg#cil-user"></use>
            </svg>
            Customers
          </NuxtLink>

          <div class="dropdown-divider"></div>
          <div class="dropdown-header bg-light py-2 rounded">
            <strong>ORDERS</strong>
          </div>

          <NuxtLink class="dropdown-item" to="/admin/invoices">
            <svg class="c-icon mr-2" aria-hidden="true">
              <use xlink:href="/icons/free.svg#cil-cart"></use>
            </svg>
            Invoices
          </NuxtLink>

          <div class="dropdown-divider"></div>

          <a class="dropdown-item" role="button" @click="logout">
            <svg class="c-icon mr-2" aria-hidden="true">
              <use xlink:href="/icons/free.svg#cil-account-logout"></use>
            </svg>
            Logout
          </a>
        </div>
      </li>
    </ul>
  </header>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$auth.user || { name: "User" };
    },
    avatarUrl() {
      const name = encodeURIComponent(this.user.name || "User");
      return `https://ui-avatars.com/api/?name=${name}&background=4e73df&color=ffffff&size=100`;
    },
  },

  methods: {
    useFallback(e) {
      e.target.src = "/images/default-avatar.png"; // Letakkan avatar default di static/images/
    },

    async logout() {
      await this.$auth.logout();
      this.$router.push({ name: "admin-login" });
    },
  },
};
</script>

<style scoped>
.c-avatar-img {
  object-fit: cover;
}
</style>
