
<template>
  <div
    style="
      display: flex;
      background-color: #ffffff;
      box-shadow: 5px 5px 5px -5px rgba(0, 0, 0, 0.75);
    "
    class="backBtn"
  >
    <router-link to="/home">
      <button
        style="
          margin: 10px;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          background-color: rgb(109, 169, 62);
          border: none;
        "
      >
        <i
          style="color: white; font-weight: bold; font-size: 20px"
          class="bi bi-arrow-return-left"
        ></i>
      </button>
    </router-link>

    <h4 style="color: black; margin-top: 15px">Movimientos del dia</h4>
  </div>
  <div class="mainContainer">
    <div class="secondContainer">
      <h1>Ventas</h1>

      <ul v-for="(sale, index) in movements.sales" :key="index">
        <li>Total: {{ formatPrice(sale.total) }}</li>
        <li>Método de pago: {{ sale.paymentMethod }}</li>
      </ul>
    </div>

    <div class="secondContainer">
      <h1>Compras</h1>

      <ul v-for="(buy, index) in movements.buys" :key="index">
        <li>Descripción: {{ buy.description }}</li>
        <li>Descripción: {{ buy.seller }}</li>
        <li>Precio: {{ formatPrice(buy.total) }}</li>
      </ul>
    </div>

    <div class="secondContainer">
      <h1>Clientes</h1>

      <ul v-for="(client, index) in movements.clients" :key="index">
        <li>Nombre: {{ client.name }}</li>
        <li>Direccion: {{ client.address }}</li>
        <li>Mail: {{ client.email }}</li>
        <li>Deuda: {{ formatPrice(client.debt) }}</li>
      </ul>
    </div>

    <!-- <div class="secondContainer">
      <h1>Empleados</h1>

      <ul v-for="(employee, index) in movements.employees" :key="index">
        <li>Nombre: {{ employee.name }}</li>
        <li>Puesto: {{ employee.position }}</li>
        <li>Mail: {{ employee.email }}</li>
        <li>Sueldo: ${{ employee.wage }}</li>
      </ul>
    </div> -->

    <div class="secondContainer">
      <h1>Ingresos</h1>

      <ul v-for="(input, index) in movements.inputs" :key="index">
        <li>Referencia: {{ input.name }}</li>
        <li>Descripcion: {{ input.description }}</li>
        <li>Monto: {{ formatPrice(input.value) }}</li>
        <li>Cantidad: {{ input.quantity }}</li>
      </ul>
    </div>

    <div class="secondContainer">
      <h1>Egresos</h1>

      <ul v-for="(output, index) in movements.outputs" :key="index">
        <li>Referencia: {{ output.name }}</li>
        <li>Descripcion: {{ output.description }}</li>
        <li>Monto: {{ formatPrice(output.value) }}</li>
        <li>Cantidad: {{ output.quantity }}</li>
      </ul>
    </div>

    <div class="secondContainer">
      <h1>Productos</h1>

      <ul v-for="(product, index) in productsArray" :key="index">
        <li>Referencia: {{ product.name }}</li>
        <li>Descripcion: {{ product.description }}</li>
        <li>Precio:  {{formatPrice(product.sellPrice)  }}</li>
        <li>Cantidad: {{ product.quantity }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import numeral from "numeral";
import axios, { all } from "axios";
export default {
  data() {
    return {
      movements: {
        sales: [],
        buys: [],
        clients: [],
        employees: [],
        inputs: [],
        outputs: [],
        productsArray: [],
      },
    };
  },
  methods: {
    async getAllMovements() {
      const businessId = localStorage.getItem("businessId");

      const result = await axios.get(
        `https://api-gestion-ahil.onrender.com/business/${businessId}/transactions/today`
      );
      const allMovements = result.data;
      this.movements = allMovements;
    },

    async getProducts() {
      try {
        const businessId = localStorage.getItem("businessId");
        const res = await axios.get(
          `https://api-gestion-ahil.onrender.com/business/products/movements/${businessId}`
        );
        const products = res.data;
        this.productsArray = products;
        console.log(this.productsArray);
      } catch (error) {
        throw error;
      }
    },
    formatPrice(price) {
      return numeral(price).format("$0,0.00");
    },
    noMovements(movementArray) {
      return movementArray.length === 0;
    },
  },
  mounted() {
    this.getAllMovements(), this.getProducts();
  },
};
</script>

<style scoped>
.mainContainer {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto auto;
  height: 100vh;
  background-color: #f0e7f7;
}

.secondContainer {
  background-color: #ffffff;
  padding: 10px;
  margin: 10px;
  color: black;
  transition: color 0.5s, font-size 0.5s;
  box-shadow: 5px 5px 5px -5px rgba(0, 0, 0, 0.75);
  overflow-y: auto;
}

.secondContainer:hover {
  color: #5c39f5;
  border: 1px solid #262042;
}

.secondContainer ul {
  background-color: #f0e7f7;
  color: black;
  font-weight: bold;
  box-shadow: 5px 5px 5px -5px rgba(0, 0, 0, 0.75);
}

.secondContainer li {
  list-style: none;
}
</style>