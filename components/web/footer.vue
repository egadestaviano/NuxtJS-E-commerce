<template>
  <footer class="pt-5" style="background: #fff; border-top: 5px solid #e64a1a;">
    <div class="container-fluid">
      <div class="row">
        <!-- Tentang -->
        <div class="col-md-5 mb-4">
          <h4 class="font-weight-bold">TENTANG</h4>
          <hr class="footer-divider" />
          <p>
            Mi Store Official Terpercaya di Indonesia. Jual Beli Aman &amp; Harga Termurah!
            Belanja sekarang.
          </p>
        </div>

        <!-- Metode Pembayaran -->
        <div class="col-md-3 mb-4">
          <h4 class="font-weight-bold">METODE PEMBAYARAN</h4>
          <hr class="footer-divider" />
          <div class="row">
            <div v-for="(img, index) in payments" :key="index" class="col-md-4 col-4 mb-3">
              <div class="card rounded">
                <div class="card-body p-2 text-center">
                  <img :src="img.src" :alt="img.alt" :style="imgStyle(img.width)" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Jam Operasional -->
        <div class="col-md-4 mb-4">
          <h4 class="font-weight-bold">JAM OPERASIONAL</h4>
          <hr class="footer-divider" />
          <p>
            <i class="fa fa-clock"></i> Toko Buka Setiap Hari:
            <br /><br />
            <strong>Senin - Jum'at</strong> ( 07.00 s/d 19.00 )
            <br />
            <strong>Sabtu - Minggu</strong> ( 07.00 s/d 17.00 )
          </p>
        </div>
      </div>

      <!-- Copyright -->
      <div class="row text-center mt-3 pb-3">
        <div class="col-md-12">
          <hr />
          © <strong>YAN STORE</strong> 2024 • Hak Cipta Dilindungi
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      payments: [
        { src: "/images/payment/BCA.png", alt: "BCA", width: 50 },
        { src: "/images/payment/BNI.png", alt: "BNI", width: 45 },
        { src: "/images/payment/BRI.png", alt: "BRI", width: 60 },
        { src: "/images/payment/GOPAY.png", alt: "Gopay", width: 60 },
        { src: "/images/payment/indomaret-logo.png", alt: "Indomaret", width: 60 },
        { src: "/images/payment/atm-bersama.jpg", alt: "ATM Bersama", width: 40 },
      ],
    };
  },
  methods: {
    imgStyle(width) {
      return `width: ${width}px;`;
    },
  },
};
</script>

<style scoped>
.footer-divider {
  border-top: 3px solid rgb(226, 232, 240);
  border-radius: 0.5rem;
}
</style>
