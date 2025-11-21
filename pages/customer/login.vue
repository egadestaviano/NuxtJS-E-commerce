<template>
  <div class="container mt-custom mb-3">
    <div class="fade-in">
      <div class="row justify-content-center">
        <div class="col-md-4">
          <div class="card-group">
            <div class="card border-top-orange border-0 shadow-sm rounded">
              <div class="card-body">
                <h3>LOGIN</h3>
                <hr>

                <!-- Notifikasi error umum -->
                <b-alert v-if="validation.message" show variant="danger" class="mt-2">
                  {{ validation.message }}
                </b-alert>

                <form @submit.prevent="login">
                  <!-- Email -->
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text">
                        <i class="fa fa-envelope"></i>
                      </span>
                    </div>
                    <input class="form-control" v-model="user.email" type="email" placeholder="Email Address">
                  </div>
                  <b-alert v-if="validation.email" show variant="danger" class="mt-2">
                    {{ validation.email[0] }}
                  </b-alert>

                  <!-- Password -->
                  <div class="input-group mb-4">
                    <div class="input-group-prepend">
                      <span class="input-group-text">
                        <i class="fa fa-lock"></i>
                      </span>
                    </div>
                    <input class="form-control" v-model="user.password" type="password" placeholder="Password">
                  </div>
                  <b-alert v-if="validation.password" show variant="danger" class="mt-2">
                    {{ validation.password[0] }}
                  </b-alert>

                  <!-- Tombol Login dengan Indikator Loading -->
                  <div class="row">
                    <div class="col-12">
                      <button 
                        class="btn btn-warning shadow-sm rounded-sm px-4 w-100" 
                        type="submit" 
                        :disabled="loading"
                      >
                        <span v-if="loading">
                          <i class="fa fa-spinner fa-spin"></i> Processing...
                        </span>
                        <span v-else>LOGIN</span>
                      </button>
                    </div>
                  </div>
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="text-center mt-3">
        Belum punya akun? 
        <nuxt-link :to="{name: 'customer-register'}" class="font-weight-bold">
          Daftar Sekarang
        </nuxt-link>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  middleware: "authenticated",
  layout: "default",

  head() {
    return {
      title: "Login - Customer",
    };
  },

  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      validation: [],
      loading: false, // Tambahkan state loading
    };
  },

  methods: {
    async login() {
      this.loading = true;
      this.validation = []; // Reset error sebelum mulai request

      try {
        await this.$auth.loginWith("customer", {
          data: {
            email: this.user.email,
            password: this.user.password,
          },
        });

        // Fetching cart data
        this.$store.dispatch("web/cart/getCartsData");
        this.$store.dispatch("web/cart/getCartPrice");

        // Redirect ke dashboard
        this.$router.push({ name: "customer-dashboard" });

      } catch (error) {
        // Pastikan error.response ada sebelum mengaksesnya
        this.validation = error.response?.data || { message: "Login failed. Please try again." };
      } finally {
        this.loading = false; // Matikan loading setelah request selesai
      }
    },
  },
};
</script>
