<template>
  <ul class="c-sidebar-nav">
    <!-- Dashboard -->
    <li class="c-sidebar-nav-item">
      <NuxtLink :to="{ name: 'admin-dashboard' }" class="c-sidebar-nav-link">
        <svg class="c-sidebar-nav-icon" aria-hidden="true">
          <use xlink:href="/icons/free.svg#cil-speedometer"></use>
        </svg>
        Dashboard
      </NuxtLink>
    </li>

    <!-- Master Data -->
    <li class="c-sidebar-nav-title">MASTER DATA</li>

    <li class="c-sidebar-nav-item">
      <NuxtLink :to="{ name: 'admin-categories' }" class="c-sidebar-nav-link">
        <svg class="c-sidebar-nav-icon" aria-hidden="true">
          <use xlink:href="/icons/free.svg#cil-folder"></use>
        </svg>
        Categories
      </NuxtLink>
    </li>

    <li class="c-sidebar-nav-item">
      <NuxtLink :to="{ name: 'admin-products' }" class="c-sidebar-nav-link">
        <svg class="c-sidebar-nav-icon" aria-hidden="true">
          <use xlink:href="/icons/free.svg#cil-layers"></use>
        </svg>
        Products
      </NuxtLink>
    </li>

    <!-- Orders -->
    <li class="c-sidebar-nav-title">ORDERS</li>

    <li class="c-sidebar-nav-item">
      <NuxtLink :to="{ name: 'admin-invoices' }" class="c-sidebar-nav-link">
        <svg class="c-sidebar-nav-icon" aria-hidden="true">
          <use xlink:href="/icons/free.svg#cil-cart"></use>
        </svg>
        Invoices
      </NuxtLink>
    </li>

    <!-- Others -->
    <li class="c-sidebar-nav-title">OTHERS</li>

    <li class="c-sidebar-nav-item">
      <NuxtLink :to="{ name: 'admin-customers' }" class="c-sidebar-nav-link">
        <svg class="c-sidebar-nav-icon" aria-hidden="true">
          <use xlink:href="/icons/free.svg#cil-user"></use>
        </svg>
        Customers
      </NuxtLink>
    </li>

    <li class="c-sidebar-nav-item">
      <NuxtLink :to="{ name: 'admin-sliders' }" class="c-sidebar-nav-link">
        <svg class="c-sidebar-nav-icon" aria-hidden="true">
          <use xlink:href="/icons/free.svg#cil-laptop"></use>
        </svg>
        Sliders
      </NuxtLink>
    </li>

    <li class="c-sidebar-nav-item">
      <NuxtLink :to="{ name: 'admin-users' }" class="c-sidebar-nav-link">
        <svg class="c-sidebar-nav-icon" aria-hidden="true">
          <use xlink:href="/icons/free.svg#cil-group"></use>
        </svg>
        Users
      </NuxtLink>
    </li>

    <!-- Divider -->
    <li class="c-sidebar-nav-divider"></li>
  </ul>
</template>

<script>
export default {};
</script>

<style scoped>
a.nuxt-link-active {
  background-color: rgba(255, 255, 255, 0.05) !important;
}
</style>
