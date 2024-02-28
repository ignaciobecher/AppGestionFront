<template>
  <div style="display: flex; background-color: #ffffff" class="backBtn">
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
    <h4 style="color: white; margin-top: 15px; color: black">
      Productos por acabarse
    </h4>
  </div>
  <div class="mainContainer">
    <div style="display: flex; margin-left: 10px">
      <!-- <h4 style="margin-top: 8px;">Ingrese cantidad mínima</h4>
      <input v-model="minimumStock" placeholder="Cantidad minima..." style="margin-left: 10px; border-radius: 15px; padding: 10px; font-size: 15px; font-weight: bold;" type="number" />
      <button @click="getMissingStock(minimumStock)" style="margin-left: 10px; border-radius: 15px; padding: 10px; font-size: 15px; font-weight: bold;" type="submit">Continuar</button> -->
    </div>

    <div class="table-responsive">
      <table class="table table-hover table-nowrap">
        <thead class="thead-light">
          <tr class="tableRow">
            <th scope="col">Producto</th>
            <th scope="col">Cantidad</th>
          </tr>
        </thead>
        <tbody v-if="missingProducts.length > 0" class="table-body">
          <tr v-for="product in missingProducts" class="tableRow">
            <td>
              <span>{{ product.name }}</span>
            </td>
            <td>
              <span>{{ product.quantity }}</span>
            </td>
          </tr>
        </tbody>
        <h4 style="color: black;" v-else>No hay productos faltantes</h4>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      missingProducts: [],
      minimumStock: null,
    };
  },
  methods: {
    async getMissingStock() {
      try {
        const businessId = localStorage.getItem("businessId");
        const res = await axios.get(
          `http://localhost:3000/products/missing/stock/${businessId}`
        );
        const stock = res.data;

        for (const product of stock) {
          this.missingProducts.push(product);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.getMissingStock();
  },
};
</script>

<style scoped>
.mainContainer {
  background-color: #f0e7f7;
  color: white;
  height: 100vh;
}

.table-responsive {
  margin: 10px;
  background-color: #ffffff;
  padding: 5px;
  border: 1px solid white;
  box-shadow: 5px 5px 5px -5px rgba(0, 0, 0, 0.75);
}

.tableRow th {
  background-color: #ffffff;
  color: black;
}

.tableRow td {
  background-color: #ffffff;
  color: black;
}
</style>
