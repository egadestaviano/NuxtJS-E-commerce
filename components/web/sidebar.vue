<template>
  <div class="card border-0 rounded shadow-sm border-top-orange">
    <div class="card-body">
      <h5>MAIN MENU</h5>
      <hr />
      <ul class="list-group">
        <li class="list-group-item" :class="{ active: $route.name === 'customer-dashboard' }">
          <nuxt-link
            :to="{ name: 'customer-dashboard' }"
            class="text-decoration-none text-dark text-uppercase d-block"
          >
            <i class="fa fa-tachometer-alt"></i> Dashboard
          </nuxt-link>
        </li>

        <li class="list-group-item" :class="{ active: $route.name === 'customer-invoices' }">
          <nuxt-link
            :to="{ name: 'customer-invoices' }"
            class="text-decoration-none text-dark text-uppercase d-block"
          >
            <i class="fa fa-shopping-cart"></i> My Orders
          </nuxt-link>
        </li>

        <li class="list-group-item">
          <a @click="logout" class="text-decoration-none text-dark text-uppercase d-block" style="cursor: pointer;">
            <i class="fa fa-sign-out-alt"></i> Logout
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    async logout() {
      try {
        await this.$auth.logout();

        this.$store.commit('web/cart/SET_CARTS_DATA', []);
        this.$store.commit('web/cart/SET_CART_PRICE', 0);

        this.$router.push({ name: 'customer-login' });
      } catch (error) {
        console.error('Logout failed:', error);
        // Bisa juga tampilkan toast atau alert ke user
      }
    },
  },
};
</script>

<style scoped>
.list-group-item.active,
.list-group-item:hover {
  background-color: #ffe5d9;
  font-weight: bold;
}

a.nuxt-link-active {
  background: rgba(255, 222, 212, 0.05) !important;
}
</style>
