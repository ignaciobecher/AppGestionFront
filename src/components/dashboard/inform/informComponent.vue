<template>
  <div class="informContainer">
    <div style="background-color: #1a1a1a" class="info-container">
      <h1 style="color: white; font-size: 25px; font-weight: 400">
        <i style="color: green" class="bi bi-cash"></i> Balance actual
      </h1>
      <h1 style="color: white">{{formatPrice(totalBalance)  }}</h1>
      <div class="button-container">
        <button>Asistente virtual</button>
        <br />
      </div>
    </div>

    <div style="background-color: #1a1a1a" class="info-container">
      <h1 style="color: white; font-size: 25px; font-weight: 400">
        <i style="color: blue" class="bi bi-boxes"></i> Stock actual
      </h1>
      <h1 style="color: white">{{ totalStock }}</h1>
      <div class="button-container">
        <button>Asistente virtual</button>
        <br />
      </div>
    </div>

    <div style="background-color: #1a1a1a" class="info-container">
      <h1 style="color: white; font-size: 25px; font-weight: 400">
        <i style="color: green" class="bi bi-bag"></i>Ventas de hoy
      </h1>
      <h1 style="color: white">{{ todaySales }}</h1>
      <div class="button-container">
        <button>Asistente virtual</button>
        <br />
      </div>
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
      const sales = await axios.get(
        "http://localhost:3000/business/salesTotal/65bfdff8a75ffb8fb6be8937"
      );
      const data = sales.data;
      console.log('Total de ventas: ',data);
      this.totalBalance = data;
    },
    async getTotalStock() {
      const products = await axios.get(
        "http://localhost:3000/business/products/65bfdff8a75ffb8fb6be8937"
      );
      const data = products.data;
      this.totalStock = data.length;
    },
    async getSalesDay() {
      try {
        const sales = await axios.get(
          "http://localhost:3000/business/salesByDay/65bfdff8a75ffb8fb6be8937"
        );
        const data = sales.data;
        const todayDate = new Date().toLocaleDateString(); 
        if (data.hasOwnProperty(todayDate)) {
          const todaySales = data[todayDate].length; 
          this.todaySales = todaySales; 
        } else {
          this.todaySales='Sin ventas'
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
.informContainer {
  margin: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

.info-container {
  border-radius: 15px;
  padding: 10px;
  margin: 10px;
  transition: color 0.5s, font-size 0.5s;
}

.info-container:hover {
  color: #5c39f5;
  background-color: #292a31 !important;
  border: 1px solid white;
  font-size: 30px;
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
