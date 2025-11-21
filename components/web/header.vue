<template>
  <header class="section-header fixed-top">
    <section class="header-main border-bottom">
      <div class="container-fluid">
        <div class="row align-items-center">
          <!-- Logo -->
          <div class="col-lg-3 col-sm-4 col-md-4 col-5">
            <nuxt-link to="/" class="brand-wrap">
              <img src="/images/xiaomi.png" width="35" class="bg-light p-2 rounded" alt="Mi Store Logo" />
              <span class="logo">MI STORE</span>
            </nuxt-link>
          </div>

          <!-- Search Desktop -->
          <div class="col-lg-4 col-xl-5 col-sm-8 col-md-4 d-none d-md-block">
            <div class="search-wrap">
              <div class="input-group w-100">
                <input
                  v-model="search"
                  type="text"
                  class="form-control search-form"
                  @keypress.enter="searchData"
                  style="width: 55%"
                  placeholder="mau belanja apa hari ini ?"
                />
                <div class="input-group-append">
                  <button @click="searchData" class="btn btn-primary search-button">
                    <i class="fa fa-search"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Cart Info -->
          <div class="col-lg-5 col-xl-4 col-sm-8 col-md-4 col-7">
            <div class="d-flex justify-content-end">
              <nuxt-link :to="{ name: 'cart' }" class="btn search-button btn-md ml-4 d-md-block">
                <i class="fa fa-shopping-cart"></i>
                <span class="ml-2">{{ cartTotal }}</span> | Rp. {{ formatPrice(cartPrice) }}
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Navbar -->
    <nav class="navbar navbar-expand-md navbar-main border-bottom p-2">
      <div class="container-fluid">
        <!-- Mobile Search -->
        <div class="d-md-none my-2 w-100">
          <div class="input-group">
            <input
              v-model="search"
              type="search"
              name="search"
              class="form-control"
              @keypress.enter="searchData"
              placeholder="mau belanja apa hari ini ?"
            />
            <div class="input-group-append">
              <button @click="searchData" class="btn btn-warning">
                <i class="fa fa-search"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- Navbar toggler -->
        <button
          class="navbar-toggler collapsed"
          type="button"
          data-toggle="collapse"
          data-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Navbar Content -->
        <div class="collapse navbar-collapse" id="navbarContent">
          <!-- Left Menu -->
          <ul class="navbar-nav mr-auto">
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-toggle="dropdown"
                aria-expanded="false"
              >
                <i class="fa fa-list-ul"></i> KATEGORI
              </a>
              <div class="dropdown-menu">
                <nuxt-link
                  v-for="category in categories"
                  :key="category.id"
                  :to="{ name: 'categories-slug', params: { slug: category.slug } }"
                  class="dropdown-item"
                >
                  <img :src="category.image" width="50" :alt="category.name" />
                  {{ category.name }}
                </nuxt-link>
                <div class="dropdown-divider"></div>
                <nuxt-link :to="{ name: 'categories' }" class="dropdown-item text-center">
                  LIHAT SEMUA KATEGORI <i class="fa fa-long-arrow-alt-right"></i>
                </nuxt-link>
              </div>
            </li>
            <li class="nav-item">
              <nuxt-link :to="{ name: 'products' }" class="nav-link">
                <i class="fa fa-shopping-bag"></i> SEMUA PRODUK
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link to="/about" class="nav-link">
                <i class="fa fa-info-circle"></i> TENTANG
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link to="/contact" class="nav-link">
                <i class="fa fa-comments"></i> KONTAK
              </nuxt-link>
            </li>
          </ul>

          <!-- Right Menu -->
          <ul class="navbar-nav ml-auto">
            <li v-if="!$auth.loggedIn" class="nav-item">
              <nuxt-link :to="{ name: 'customer-login' }" class="nav-link">
                <i class="fa fa-user-circle"></i> ACCOUNT
              </nuxt-link>
            </li>
            <li v-else class="nav-item">
              <nuxt-link :to="{ name: 'customer-dashboard' }" class="nav-link">
                <i class="fa fa-tachometer-alt"></i> DASHBOARD
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  async fetch() {
    await this.$store.dispatch("web/category/getCategoriesData");

    if (this.$auth.loggedIn && this.$auth.strategy?.name === "customer") {
      await this.$store.dispatch("web/cart/getCartsData");
      await this.$store.dispatch("web/cart/getCartPrice");
    }
  },
  data() {
    return {
      search: "",
    };
  },
  computed: {
    categories() {
      return this.$store.state.web.category.categories || [];
    },
    cartPrice() {
      return this.$store.state.web.cart.cartPrice || 0;
    },
    cartTotal() {
      return this.$store.state.web.cart.carts?.length || 0;
    },
  },
  methods: {
    searchData() {
      if (this.search.trim() !== "") {
        this.$router.push({ name: "search", query: { q: this.search } });
      }
    },
    formatPrice(value) {
      return new Intl.NumberFormat("id-ID").format(value);
    },
  },
};
</script>

<style scoped>
.btn {
  font-size: initial;
}
</style>
