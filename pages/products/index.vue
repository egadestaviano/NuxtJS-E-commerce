<template>
  <div class="container-fluid mt-custom">
    <div class="fade-in">
      <div class="row">
          
          <div class="col-md-3 mt-1 mb-4" v-for="product in products.data" :key="product.id">
          <div class="card h-100 border-0 rounded shadow-sm">
            <div class="card-body">
              <div class="card-img-actions"> 
                <img :src="product.image" class="card-img img-fluid"> 
                </div>
            </div>
            <div class="card-body bg-light-custom text-center rounded-bottom">
              <div class="mb-2">
                <h6 class="font-weight-semibold mb-2"> 
                  <nuxt-link :to="{name: 'products-slug', params: {slug: product.slug}}" class="text-default mb-2" data-abc="true">{{ product.title }}</nuxt-link> 
                </h6> 
                <nuxt-link :to="{name: 'categories-slug', params: {slug: product.category.slug}}" class="text-muted" data-abc="true">{{ product.category.name }}</nuxt-link>
              </div>
              <h6 class="mb-0 font-weight-semibold"><s class="text-red">Rp. {{ formatPrice(product.price) }}</s> / <strong>{{ product.discount }} %</strong></h6>
              <h5 class="mb-0 font-weight-semibold mt-3 text-success">Rp. {{ formatPrice(calculateDiscount(product)) }}</h5>
              <hr>
                <client-only>
                  <vue-star-rating :rating="parseFloat(product.reviews_avg_rating)" :increment="0.5" :star-size="20" :read-only="true" :show-rating="false" :inline="true"></vue-star-rating> 
                  (<strong>{{ product.reviews_count }}</strong> ulasan)
                </client-only>
                <div class="mt-2">
                  <button 
                    v-if="$auth.loggedIn && $auth.strategy.name === 'customer'" 
                    @click="addToWishlist(product.id)" 
                    class="btn btn-sm btn-outline-danger"
                  >
                    <i class="fa fa-heart"></i> Wishlist
                  </button>
                </div>
            </div>
          </div>
        </div>

      </div>

      <!-- pagination -->
      <div class="row justify-content-center mt-4 mb-4">
          <div class="text-center">
              <b-pagination align="center" :value="products.current_page" :total-rows="products.total"
                  :per-page="products.per_page" @change="changePage" aria-controls="my-table"></b-pagination>
          </div>
      </div>
      
    </div>
  </div>
</template>

<script>
export default {

    //meta
    head() {
      return {
        title: 'Products - MI STORE - Distributor Xiaomi Indonesia Resmi',
        meta: [{
            hid: 'og:title',
            name: 'og:title',
            content: 'MI STORE - Distributor Xiaomi Indonesia Resmi'
          },
          {
            hid: 'og:site_name',
            name: 'og:site_name',
            content: 'Products - MI STORE - Distributor Xiaomi Indonesia Resmi'
          },
          {
            hid: 'og:image',
            name: 'og:image',
            content: '/images/logo.png'
          },
          {
            hid: 'description',
            name: 'description',
            content: 'Jual Produk Original Xiaomi Indonesia Bergaransi Resmi'
          },
        ]
      }
    },

    //hook "asyncData"
    async asyncData({ store }) {
        await store.dispatch('web/product/getProductsData')
    },

    //computed
    computed: {

        //products
        products() {
            return this.$store.state.web.product.products
        },
    },

    //method
    methods: {

      //method "changePage"
      changePage(page) {

        //commit to mutation "SET_PAGE"
        this.$store.commit('web/product/SET_PAGE', page)

        //dispatch on action "getProductsData"
        this.$store.dispatch('web/product/getProductsData')
      },

      formatPrice(value) {
        if (!value) return '0';
        return new Intl.NumberFormat('id-ID').format(value);
      },
      calculateDiscount(product) {
        return product.price - (product.price * product.discount) / 100;
      },
      //method "addToWishlist"
      async addToWishlist(productId) {
        //check loggedIn "false"
        if (!this.$auth.loggedIn) {
          //redirect
          return this.$router.push({
            name: 'customer-login'
          })
        }

        //check customer role
        if (this.$auth.strategy.name != "customer") {
          //redirect
          return this.$router.push({
            name: 'customer-login'
          })
        }

        //dispatch to action "storeWishlist" vuex
        await this.$store.dispatch('web/wishlist/storeWishlist', {
            product_id: productId
          })

          //success add to wishlist
          .then(() => {
            //sweet alert
            this.$swal.fire({
              title: 'BERHASIL!',
              text: "Product Berhasil Ditambahkan ke Wishlist!",
              icon: 'success',
              showConfirmButton: false,
              timer: 3000
            })
          })
      },
    }

}
</script>

<style>

</style>