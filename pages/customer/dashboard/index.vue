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
              <h5><i class="fa fa-tachometer-alt"></i> DASHBOARD</h5>
              <hr />

              <div v-if="loading" class="text-center">
                <i class="fas fa-spinner fa-spin fa-2x"></i> Loading...
              </div>

              <div v-else>
                <div class="alert alert-success" role="alert">
                  Selamat Datang <strong>{{ $auth.user.name }}</strong>
                </div>

                <div class="row">
                  <DashboardCard color="primary" icon="fa-circle-notch fa-spin" label="PENDING" :count="pending" />
                  <DashboardCard color="success" icon="fa-check-circle" label="SUCCESS" :count="success" />
                  <DashboardCard color="warning" icon="fa-exclamation-triangle" label="EXPIRED" :count="expired" />
                  <DashboardCard color="danger" icon="fa-times-circle" label="FAILED" :count="failed" />
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

// Komponen reusable untuk kartu dashboard
const DashboardCard = {
  props: ["color", "icon", "label", "count"],
  template: `
    <div class="col-6 col-lg-3">
      <div class="card rounded shadow-sm overflow-hidden">
        <div class="card-body p-0 d-flex align-items-center">
          <div :class="'bg-' + color + ' py-4 px-5 mfe-3'">
            <i :class="'fas ' + icon + ' fa-2x'"></i>
          </div>
          <div>
            <div :class="'text-value text-' + color">{{ count }}</div>
            <div class="text-muted text-uppercase font-weight-bold small">{{ label }}</div>
          </div>
        </div>
      </div>
    </div>
  `,
};

export default {
  middleware: "isCustomer",
  layout: "default",

  components: {
    Sidebar,
    DashboardCard, // Daftarkan komponen reusable
  },

  head() {
    return {
      title: "Dashboard - Customer",
    };
  },

  data() {
    return {
      pending: 0,
      success: 0,
      expired: 0,
      failed: 0,
      loading: true, // Tambahkan indikator loading
    };
  },

  async asyncData({ $axios }) {
    try {
      const dashboard = await $axios.$get("/api/customer/dashboard");

      return {
        pending: dashboard.data.count.pending,
        success: dashboard.data.count.success,
        expired: dashboard.data.count.expired,
        failed: dashboard.data.count.failed,
        loading: false, // Selesai loading
      };
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      return { loading: false }; // Matikan loading meskipun error
    }
  },
};
</script>
