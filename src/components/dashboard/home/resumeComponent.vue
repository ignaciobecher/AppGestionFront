<template>
  <div style="background-color: #1a1a1a" class="info-container">
    <h1 style="color: white; font-size: 25px; font-weight: 400">
      <i style="color: green" class="bi bi-cash"></i> Movimientos del día
    </h1>
    <router-link class="router" to="/dayMovements">
      <h3>Ir a mis movimientos <i class="bi bi-arrow-right"></i></h3>
    </router-link>
  
  </div>

  <div style="background-color: #1a1a1a" class="info-container">
    <h1 style="color: white; font-size: 25px; font-weight: 400">
      <i style="color: blue" class="bi bi-boxes"></i> Faltantes
    </h1>
    <router-link class="router" to="/missingStock">
      <h3>Ir a faltantes <i class="bi bi-arrow-right"></i></h3>
    </router-link>
   
  </div>

  <div style="background-color: #1a1a1a" class="info-container">
    <h1 style="color: white; font-size: 25px; font-weight: 400">
      <i style="color: green" class="bi bi-bag"></i>Vencimientos
    </h1>
    <router-link class="router" to="/expirations">
      <h3>Ir a vencimientos <i class="bi bi-arrow-right"></i></h3>
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
      const sales = await axios.get(
        "https://api-gestion-ahil.onrender.com/business/salesTotal/65bfdff8a75ffb8fb6be8937"
      );
      const data = sales.data;
      console.log(data);
      this.totalBalance = data;
    },
    async getTotalStock() {
      const products = await axios.get(
        "https://api-gestion-ahil.onrender.com/business/products/65bfdff8a75ffb8fb6be8937"
      );
      const data = products.data;
      this.totalStock = data.length;
    },
    async getSalesDay() {
      try {
        const sales = await axios.get(
          "https://api-gestion-ahil.onrender.com/business/salesByDay/65bfdff8a75ffb8fb6be8937"
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
  border-radius: 15px;
  padding: 10px;
  margin: 10px;
  transition: color 0.5s;
}

.info-container:hover {
  color: #5c39f5;
  background-color: #292a31 !important;
  border: 1px solid white;
}

.info-container .router {
  color: white;
  text-decoration: none;
  transition: color 0.5s;
}

.info-container .router:hover {
  color: #5c39f5;
  background-color: #292a31 !important;
  border: 1px solid white;
}

.info-container h1 {
  color: black;
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
