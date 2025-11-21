<template>
  <div class="container mt-custom mb-3">
    <div class="fade-in">
      <div class="row justify-content-center">
        <div class="col-md-7">
          <div class="card-group">
            <div class="card border-top-orange border-0 shadow-sm rounded">
              <div class="card-body">
                <h3>REGISTER</h3>
                <hr>

                <!-- Notifikasi error umum -->
                <b-alert v-if="validation.message" show variant="danger" class="mt-2">
                  {{ validation.message }}
                </b-alert>

                <form @submit.prevent="register">

                  <div class="row">
                    <div class="col-md-6">
                      <div class="input-group mb-3">
                        <div class="input-group-prepend">
                          <span class="input-group-text">
                            <i class="fa fa-user"></i>
                          </span>
                        </div>
                        <input class="form-control" v-model="user.name" type="text" placeholder="Nama Lengkap">
                      </div>
                      <b-alert v-if="validation.name" show variant="danger" class="mt-2">
                        {{ validation.name[0] }}
                      </b-alert>
                    </div>

                    <div class="col-md-6">
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
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6">
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
                    </div>

                    <div class="col-md-6">
                      <div class="input-group mb-4">
                        <div class="input-group-prepend">
                          <span class="input-group-text">
                            <i class="fa fa-lock"></i>
                          </span>
                        </div>
                        <input class="form-control" v-model="user.password_confirmation" type="password"
                          placeholder="Password Confirmation">
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-12">
                      <!-- Tombol Register dengan Loading -->
                      <button 
                        class="btn btn-info shadow-sm rounded-sm px-4" 
                        type="submit" 
                        :disabled="loading"
                      >
                        <span v-if="loading">
                          <i class="fa fa-spinner fa-spin"></i> Processing...
                        </span>
                        <span v-else>REGISTER</span>
                      </button>

                      <!-- Tombol Reset -->
                      <button class="btn btn-warning shadow-sm rounded-sm px-4" type="button" @click="resetForm">
                        RESET
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
        Sudah punya akun? 
        <nuxt-link :to="{name: 'customer-login'}" class="font-weight-bold">
          Login Disini
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
      title: "Register - Customer",
    };
  },

  data() {
    return {
      user: {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
      },
      validation: [],
      loading: false, // Tambahkan state loading
    };
  },

  methods: {
    async register() {
      this.loading = true;
      this.validation = []; // Reset error sebelum request

      try {
        await this.$store.dispatch("customer/customer/storeRegister", {
          name: this.user.name,
          email: this.user.email,
          password: this.user.password,
          password_confirmation: this.user.password_confirmation,
        });

        // Sweet Alert sukses
        this.$swal.fire({
          title: "REGISTER BERHASIL!",
          text: "Proses Register Berhasil!",
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
        });

        // Reset Form
        this.resetForm();

        // Redirect ke login
        this.$router.push({ name: "customer-login" });

      } catch (error) {
        // Pastikan error.response ada sebelum mengaksesnya
        this.validation = error.response?.data || { message: "Registration failed. Please try again." };
      } finally {
        this.loading = false; // Matikan loading setelah request selesai
      }
    },

    resetForm() {
      this.user = {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
      };
      this.validation = [];
    },
  },
};
</script>
