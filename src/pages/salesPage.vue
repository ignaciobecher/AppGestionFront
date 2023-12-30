<template>
  <div class="sales-container">
    <div class="left-container">
      <backBtn style="position: absolute; top: 40px"></backBtn>
       <productComponent v-for="(product, index) in carrito" :key="index">
        <template v-slot:name>{{ product.name }}</template>
        <template v-slot:quantity>{{ product.description }}</template>
        <template v-slot:price>{{ product._id }}</template>
      </productComponent> 
      <methodsComponent></methodsComponent>
      <div class="inputClass">
        <input
          v-model="barcode"
          type="search"
          @keyup.enter="getProductBybarCode(barcode)"
          name=""
          placeholder="Buscar por codigo"
          id=""
        />
      </div>
      <div class="total">
        <h3>Total: $3750</h3>
        <h1>TOTAL con IVA: $4537</h1>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import backBtn from "../components/buttons/backBtnComponent.vue";
import productComponent from "../components/salesComponents/productComponent.vue";
import methodsComponent from "../components/selects/methodsComponent.vue";

export default {
  components: {
    backBtn,
    productComponent,
    methodsComponent,
  },
  data() {
    return {
      productsIds: [],
      barcode: "",
      carrito: [],
    };
  },
  methods: {
    async getProductBybarCode(barCode) {
      const response = await axios.get(
        `http://localhost:3000/products/barcode/${barCode}/search/658d8588178988d3ebf2db86`
      );
      const productoEncontrado=response.data
      this.carrito.push(productoEncontrado)
      console.log(this.carrito);
      this.barcode=''
    }
  },
};
</script>

<style scoped>
.sales-container {
  background-color: #948eac;
}

.total {
  color: black;
  padding: 15px;
  width: 100%;
}

.inputClass {
  margin: 15px;
}

.inputClass input {
  border-radius: 15px;
  padding: 10px;
  width: 80%;
}
</style>
