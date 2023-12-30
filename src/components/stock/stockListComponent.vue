<template>
  <backBtn></backBtn>
  <div class="input-class">
    <input
      @input="checkInput"
      v-model="barcode"
      @keyup.enter="getProductBybarCode(barcode)"
      type="search"
      name=""
      id="searchInput"
      placeholder="Buscar producto"
    />
  </div>
  <div class="table-responsive">
    <table class="table table-hover table-nowrap">
      <thead class="thead-light">
        <tr>
          <th scope="col">Producto</th>
          <th scope="col">Descripcion</th>
          <th scope="col">Cantidad</th>
          <th scope="col">Precio</th>
          <th scope="col">Codigo de barras</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-if="foundProduct"
          v-for="(product, index) in products"
          :key="index"
        >
          <td>
            {{ product.name }}
          </td>
          <td>{{ product.description }}</td>
          <td>
            {{ product.quantity }}
          </td>
          <td>{{ product.sellPrice }}</td>
          <td>{{ product.barCode }}</td>
        </tr>
        <tr v-if="!foundProduct">
          <td>{{ selectedProduct.name }}</td>
          <td>{{ selectedProduct.description }}</td>
          <td>{{ selectedProduct.quantity }}</td>
          <td>{{ selectedProduct.sellPrice }}</td>
          <td>{{ selectedProduct.barCode }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import backBtn from "../../components/buttons/backBtnComponent.vue";
export default {
  components: {
    backBtn,
  },
  data() {
    return {
      products: [],
      barcode: "",
      selectedProduct: {},
      foundProduct: true,
    };
  },
  methods: {
    async getAllProducts() {
      const response = await axios.get(
        "http://localhost:3000/business/products/658d8588178988d3ebf2db86"
      );
      this.products = response.data;
    },
    async getProductBybarCode(barCode) {
      const response = await axios.get(
        `http://localhost:3000/products/barcode/${barCode}/search/658d8588178988d3ebf2db86`
      );
      const productoEncontrado=response.data

      if (productoEncontrado) {
        this.selectedProduct = productoEncontrado;
        this.foundProduct = false;
      } else {
        this.selectedProduct = {};
        this.foundProduct = false;
      }
    },
    checkInput() {
      if (this.barcode === "") {
        this.foundProduct = true;
      }
    },
  },
  created() {
    this.getAllProducts();
  },
};
</script>

<style scoped>
h1 {
  color: black;
  margin: 15px;
}

.styled-table {
  border-collapse: separate;
  border-spacing: 10px; /* Define el espacio entre las celdas */
}

/* Estilos adicionales para la tabla si es necesario */
.styled-table th {
  border: 1px solid #dddddd;
  padding: 8px;
  text-align: left;
}

.input-class {
  margin: 10px;
}
.highlight-row {
  background-color: #ffcc80; /* Puedes ajustar este color como desees */
}
</style>
