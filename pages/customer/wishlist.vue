<template>
  <div class="container-fluid mt-custom">
    <div class="fade-in">
      <div class="row">
        <div class="col-md-3">
          <!-- sidebar -->
          <Sidebar />
          <!-- end sidebar -->
        </div>
        <div class="col-md-9">
          <div class="card border-0 rounded shadow-sm border-top-orange">
            <div class="card-body">
              <h5><i class="fa fa-heart"></i> WISHLIST SAYA</h5>
              <hr />

              <div v-if="loading" class="text-center">
                <i class="fas fa-spinner fa-spin fa-2x"></i> Loading...
              </div>

              <div v-else>
                <div v-if="wishlists.length > 0" class="row">
                  <div
                    class="col-md-4 mb-4"
                    v-for="wishlist in wishlists"
                    :key="wishlist.id"
                  >
                    <div class="card h-100 border-0 rounded shadow-sm">
                      <div class="card-body">
                        <div class="card-img-actions">
                          <img
                            :src="wishlist.product.image"
                            :alt="wishlist.product.title"
                            class="card-img img-fluid"
                            loading="lazy"
                          />
                        </div>
                      </div>

                      <div class="card-body bg-light-custom text-center rounded-bottom">
                        <div class="mb-2">
                          <h6 class="font-weight-semibold mb-2">
                            <nuxt-link
                              :to="{ name: 'products-slug', params: { slug: wishlist.product.slug } }"
                              class="text-default mb-2 text-decoration-none"
                            >
                              {{ wishlist.product.title }}
                            </nuxt-link>
                          </h6>

                          <nuxt-link
                            :to="{ name: 'categories-slug', params: { slug: wishlist.product.category.slug } }"
                            class="text-muted text-decoration-none"
                          >
                            {{ wishlist.product.category.name }}
                          </nuxt-link>
                        </div>

                        <h6 class="mb-0 font-weight-semibold">
                          <s class="text-red">Rp. {{ formatPrice(wishlist.product.price) }}</s> /
                          <strong>{{ wishlist.product.discount }}%</strong>
                        </h6>
                        <h5 class="mb-0 font-weight-semibold mt-3 text-success">
                          Rp. {{ formatPrice(calculateDiscount(wishlist.product)) }}
                        </h5>
                        <hr />
                        <div class="d-flex justify-content-between">
                          <button @click="removeWishlist(wishlist.id)" class="btn btn-sm btn-danger">
                            <i class="fa fa-trash"></i> Hapus
                          </button>
                          <button @click="addToCart(wishlist.product.id, calculateDiscount(wishlist.product), wishlist.product.weight)" class="btn btn-sm btn-warning">
                            <i class="fa fa-shopping-cart"></i> Beli
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-else class="text-center">
                  <div class="empty-cart-cls text-center">
                    <img src="/images/heart.png" width="150" height="150" class="img-fluid mb-4 mr-3">
                    <h3><strong>Wishlist Anda Kosong</strong></h3>
                    <nuxt-link :to="{name: 'products'}" class="btn btn-warning btn-lg mt-4">BELANJA SEKARANG</nuxt-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/web/sidebar.vue";

export default {
  middleware: "isCustomer",
  layout: "default",

  components: {
    Sidebar,
  },

  head() {
    return {
      title: "Wishlist - Customer",
    };
  },

  data() {
    return {
      loading: true,
    };
  },

  async asyncData({ store }) {
    try {
      await store.dispatch('web/wishlist/getWishlistsData')
      
      return {
        loading: false,
      };
    } catch (error) {
      console.error("Error fetching wishlist data:", error);
      return { loading: false };
    }
  },

  computed: {
    wishlists() {
      return this.$store.state.web.wishlist.wishlists
    },
  },

  methods: {
    formatPrice(value) {
      if (!value) return '0';
      return new Intl.NumberFormat('id-ID').format(value);
    },
    
    calculateDiscount(product) {
      return product.price - (product.price * product.discount) / 100;
    },
    
    async removeWishlist(wishlistId) {
      await this.$swal.fire({
        title: 'APAKAH ANDA YAKIN ?',
        text: "INGIN MENGHAPUS ITEM DARI WISHLIST !",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'YA, HAPUS!',
        cancelButtonText: 'TIDAK',
      }).then((result) => {
        if (result.isConfirmed) {
          //call action vuex "removeWishlist"
          this.$store.dispatch('web/wishlist/removeWishlist', {
              wishlist_id: wishlistId
           })
          .then(() => {
            //alert
            this.$swal.fire({
                title: 'BERHASIL!',
                text: "Item Berhasil Dihapus dari Wishlist!",
                icon: 'success',
                showConfirmButton: false,
                timer: 2000
            })
          })
        }
      })
    },
    
    async addToCart(productId, price, weight) {
      //dispatch to action "storeCart" vuex
      await this.$store.dispatch('web/cart/storeCart', {
          product_id: productId,
          price: price,
          qty: 1,
          weight: weight
        })
        //success add to cart
        .then(() => {
          //sweet alert
          this.$swal.fire({
            title: 'BERHASIL!',
            text: "Product Berhasil Ditambahkan di Keranjang!",
            icon: 'success',
            showConfirmButton: false,
            timer: 3000
          })
        })
    }
  }
};
</script>

<style scoped>
.card-img {
  max-height: 200px;
  object-fit: cover;
}
</style>