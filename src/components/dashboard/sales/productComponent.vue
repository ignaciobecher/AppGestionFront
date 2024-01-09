<template>
  <div class="product-container" v-for="(product,index) in carrito" :key="index">
    <p>{{ product.name }}</p>
    <div class="btn" >
      <button @click="decreaseQuantity">-</button>
      <p>{{ totalQuantity }}</p>
      <button @click="increaseQuantity">+</button>
    </div>
    <p>${{ product.sellPrice }}</p>
    <p>$1600</p>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      totalQuantity: 0,
      barcode:"",
      productsIds:[],
      carrito:[]
    };
  },
  methods: {
    async getProductBybarCode() {
      try {
        const response = await axios.get(
          `http://localhost:3000/products/barcode/4005900036759/search/65931333d7c90d26950f7332`
        );
        this.barcode = "";

        console.log(response.data);
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
    increaseQuantity() {
      this.totalQuantity += 1;
    },
    decreaseQuantity() {
      if (this.totalQuantity > 1) this.totalQuantity -= 1;
    },
  },
  mounted(){
    this.getProductBybarCode()
  }

};
</script>

<style scoped>
.product-container {
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
  background-color: #1a1a1a;
  padding: 5px;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.btn {
  display: flex;
  color: white;
}

.btn button {
  width: 25px;
  height: 25px;
  background-color: #292a31;
  border: none;
  border-radius: 4px;
}
</style>
