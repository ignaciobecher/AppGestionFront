<template>
  <div style="display: flex; background-color: #292a31" class="backBtn">
    <router-link to="/">
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
    <h2 style="color: white; margin-top: 10px">Movimientos del dia</h2>
  </div>
  <div class="mainContainer">
    <h2 style="margin-left: 10px;">Productos proximos a quedarse sin stock</h2>
    <div style="display:flex; margin-left: 10px;">
      <h4 style="margin-top: 8px;">Ingrese cantidad mínima</h4>
      <input v-model="minimumStock" placeholder="Cantidad minima..." style="margin-left: 10px; border-radius: 15px; padding: 10px; font-size: 15px; font-weight: bold;" type="number" />
      <button @click="getMissingStock(minimumStock)" style="margin-left: 10px; border-radius: 15px; padding: 10px; font-size: 15px; font-weight: bold;" type="submit">Continuar</button>
    </div>
    <div class="table-responsive">
      <table class="table table-hover table-nowrap">
        <thead class="thead-light">
          <tr class="tableRow">
            <th scope="col">Producto</th>
            <th scope="col">Cantidad</th>
          </tr>
        </thead>
        <tbody class="table-body">
          <tr
            v-for="(count, product) in missingProducts"
            :key="product"
            class="tableRow"
          >
            <td>
              <span>{{ product }}</span>
            </td>
            <td>
              <span>{{ count }}</span>
            </td>
          </tr>
        </tbody>
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
      minimumStock:null
    };
  },
  methods: {
    async getMissingStock(minStock) {
      try {
    
        const res = await axios.get(
          `https://api-gestion-ahil.onrender.com/products/missing/stock/65bfdff8a75ffb8fb6be8937/${minStock}`
        );
        const stock = res.data;
        this.missingProducts = stock;
        
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.getMissingStock(20);
  },
};
</script>

<style scoped>
.mainContainer {
  background-color: #292a31;
  color: white;
  height: 100vh;
}

.table-responsive {
  margin: 10px;
  background-color: #1a1a1a;
  border-radius: 15px;
  padding: 5px;
  border: 1px solid white;
}

.tableRow th {
  background-color: #1a1a1a;
  color: white;
}

.tableRow td {
  background-color: #1a1a1a;
  color: white;
}
</style>
