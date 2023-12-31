<template>
  <div class="sales-container">
    <div class="left-container">
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
      <backBtn style="position: absolute; top: 40px"></backBtn>
      <productComponent v-for="(product, index) in carrito" :key="index">
        <template v-slot:name>{{ product.name }}</template>
        <template v-slot:quantity>{{ product.description }}</template>
        <template v-slot:price>{{ product.sellPrice }}</template>
      </productComponent>
      <methodsComponent></methodsComponent>

      <div class="total">
        <h3>Total:{{ total }}</h3>
        <h1>TOTAL con IVA: {{ total * 1.21 }}</h1>
      </div>

      <div class="saleBtn">
        <input
          @click="cancelSale"
          style="color: white; background-color: red"
          type="submit"
          value="Cancelar venta"
        />
        <input
          @click="createSale"
          style="color: white; background-color: green"
          type="submit"
          value="Finalizar venta"
        />
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
      total: 0,
    };
  },
  methods: {
    async getProductBybarCode(barCode) {
      try {
        const response = await axios.get(
          `http://localhost:3000/products/barcode/${barCode}/search/658d8588178988d3ebf2db86`
        );
        this.barcode = "";

        if (response && response.data) {
          const productoEncontrado = response.data;

          if (productoEncontrado) {
            this.carrito.push(productoEncontrado);

            if (productoEncontrado.sellPrice !== undefined) {
              this.total += productoEncontrado.sellPrice;
            }

            if (productoEncontrado._id !== undefined) {
              this.productsIds.push(productoEncontrado._id);
            }

            if (productoEncontrado === undefined) {
            }
          } else {
            console.log("El producto no fue encontrado.");
          }
        } else {
          console.log("La respuesta no contiene datos válidos.");
        }
      } catch (error) {
        console.error("Error al obtener el producto:", error);
      }
    },
    async createSale() {
      try {
        let arrayOfIds = [];
        for (const product of this.productsIds) {
          arrayOfIds.push(product);
        }
        if (this.carrito.length === 0) {
          console.log("Carrito vacio");

          return;
        }
        const sale = await axios.post("http://localhost:3000/sales", {
          total: this.total,
          businessId: "658d8588178988d3ebf2db86",
          productIds: arrayOfIds,
        });

        console.log(sale);
        if (sale) {
          console.log("Venta exitosa");
        }

        this.total=0
        this.productsIds=[]
        this.carrito=[]
      } catch (error) {
        console.log("Error:", error);
      }
    },
    cancelSale() {
      try {
        this.carrito = [];
        this.total = 0;
        this.productsIds = [];
        console.log("Venta cancelada");
      } catch (error) {
        console.log(error);
      }
    },
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

.saleBtn {
  margin: 15px;
}
.saleBtn input {
  border-radius: 15px;
  padding: 10px;
}
</style>
