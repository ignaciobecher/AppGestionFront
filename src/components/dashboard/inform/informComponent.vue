<template>
  <div class="informContainer">
    <div class="info-container">
      <h4><i class="bi bi-cash"></i> Balance actual</h4>
      <h3>{{ formatPrice(totalBalance) }}</h3>
     
    </div>

    <div class="info-container">
      <h4><i class="bi bi-box"></i> Stock actual</h4>
      <h3>{{ totalStock }} productos</h3>
     
    </div>

    <div class="info-container">
      <h4><i class="bi bi-bag"></i>Ventas de hoy</h4>
      <h3>{{ todaySales }} ventas</h3>
      
    </div>
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
      const businessId = localStorage.getItem("businessId");

      const sales = await axios.get(
        `https://api-gestion-ahil.onrender.com/business/salesTotal/${businessId}`
      );
      const data = sales.data;
      console.log("Total de ventas: ", data);
      this.totalBalance = data;
    },
    async getTotalStock() {
      const businessId = localStorage.getItem("businessId");

      const products = await axios.get(
        `https://api-gestion-ahil.onrender.com/business/products/${businessId}`
      );
      const data = products.data;
      this.totalStock = data.length;
    },
    async getSalesDay() {
      try {
        const businessId = localStorage.getItem("businessId");

        const sales = await axios.get(
          `https://api-gestion-ahil.onrender.com/business/salesByDay/${businessId}`
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
  color: white;
}



.info-container .router {
  color: black;
  padding: 10px;
  text-decoration: none;
}

.info-container h3 {
  padding: 10px;
  transition: color 0.5s;
}

.info-container h3:hover {
  color: #5c39f5;
}

.info-container button {
  background-color: #b28cc4;
  border: none;
  padding: 5px;
  font-size: 15px;
  box-shadow: 5px 5px 5px -5px rgba(0, 0, 0, 0.75);
  margin-left: 10px;
}

.info-container a {
  text-decoration: underline;
  color: black;
}

/* //RESPONSIVE PARA TELEFONO-****************************************************************** */
@media screen and (max-width: 768px){
  .informContainer{
    display: flex !important;
    flex-direction: column !important;
  }
}
</style>