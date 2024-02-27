<template>
  <div class="info-container">
    <h4>Movimientos del dia</h4>
    <router-link class="router" to="/movements">
      <h3>Movimientos <i class="bi bi-arrow-right"></i></h3>
    </router-link>
  </div>

  <div class="info-container">
    <h4>Productos faltantes</h4>

    <router-link class="router" to="/missingStock">
      <h3>Faltantes <i class="bi bi-arrow-right"></i></h3>
    </router-link>
  </div>

  <div class="info-container">
    <h4>Vencimientos</h4>

    <router-link class="router" to="/expirations">
      <h3>Vencimientos <i class="bi bi-arrow-right"></i></h3>
    </router-link>
  </div>
</template>

<script>
import axios from "axios";
import numeral from "numeral";
export default {
  data() {
    return {
      totalBalance: 0,
      totalStock: 0,
      todaySales: 0,
    };
  },
  methods: {
    async getBalance() {
      const businessId= localStorage.getItem('businessId')

      const sales = await axios.get(
        `http://localhost:3000/business/salesTotal/${businessId}`
      );
      const data = sales.data;
      console.log(data);
      this.totalBalance = data;
    },
    async getTotalStock() {
      const businessId= localStorage.getItem('businessId')

      const products = await axios.get(
       `http://localhost:3000/business/products/${businessId}`
      );
      const data = products.data;
      this.totalStock = data.length;
    },
    async getSalesDay() {
      try {
      const businessId= localStorage.getItem('businessId')

        const sales = await axios.get(
          `http://localhost:3000/business/salesByDay/${businessId}`
        );
        const data = sales.data;
        const todayDate = new Date().toLocaleDateString();
        if (data.hasOwnProperty(todayDate)) {
          const todaySales = data[todayDate].length;
          this.todaySales = todaySales;
        } else {
          this.todaySales = "Sin ventas";
        }

        for (const date in data) {
          const salesArray = data[date];
        }
      } catch (error) {
        console.error("Error al obtener los datos de ventas:", error);
      }
    },

    formatPrice(price) {
      return numeral(price).format("$0,0.00");
    },
  },
  mounted() {
    this.getBalance(), this.getTotalStock(), this.getSalesDay();
  },
};
</script>

<style scoped>
.info-container {
  margin: 10px;
  transition: color 0.5s;
  box-shadow: 5px 5px 5px -5px rgba(0, 0, 0, 0.75);
  background-color: #ffffff;
  height: 150px;
}

.info-container h4 {
  background-color: #262042;
  padding: 10px;
  margin: 0 auto;
}

/* .info-container:hover {
  color: #5c39f5;
  background-color: #292a31 !important;
  border: 1px solid white;
} */

.info-container .router {
  color: black;
  padding: 10px;
  text-decoration: none;
}


.info-container h3 {
  padding: 10px;
  transition: color 0.5s ;
}

.info-container h3:hover{
  color: #5c39f5;
}

.info-container button {
  background-color: #5c39f5;
  border: none;
  border-radius: 15px;
  padding: 5px;
  font-size: 15px;
  margin-bottom: 10px;
}

.info-container a {
  text-decoration: underline;
  color: black;
}
</style>
