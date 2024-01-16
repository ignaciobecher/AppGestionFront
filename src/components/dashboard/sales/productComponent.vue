<template>
  <div class="searchbar-container">
    <p>Buscar producto:</p>
    <input
      v-model="barcode"
      type="search"
      @keyup.enter="getProductBybarCode(barcode)"
      name=""
      placeholder="Buscar por codigo"
      id=""
    />
    <div class="sales-btn">
      <button class="salesBtn">{{ turnBtn }}</button>
    </div>
  </div>

  <div v-if="!salesTable">
    <div class="inputsTitle">
      <p>Cliente:</p>
      <p>Vendedor:</p>
      <p>Fecha de emision:</p>
    </div>

    <div class="inputs">
      <select name="" id="">
        <option value="General">General</option>
        <option value="Pedro Gomez">Pedro Gomez</option>
        <option value="Julio Lopez">Julio Lopez</option>
      </select>

      <select name="" id="">
        <option value="Ninguno">Ninguno</option>
        <option value="Julian">Julian</option>
        <option value="Carla">Carla</option>
      </select>

      <input type="date" name="" id="" />
    </div>

    <div class="productSale">
      <div v-if="carrito.length > 0">
        <div class="products-titles">
          <p>Productos</p>
          <p>Cantidad</p>
          <p>Precio unitario</p>
          <p>Precio total</p>
        </div>
        <div
          class="product-container"
          v-for="(product, index) in carrito"
          :key="index"
        >
          <p>{{ product.name }}</p>
          <div class="btn">
            <button @click="decreaseQuantity(product)">-</button>
            <p>{{ product.sellQuantity }}</p>
            <button @click="increaseQuantity(product)">+</button>
          </div>
          <p>${{ product.sellPrice }}</p>
          <p>${{ getTotalProductPrice(product) }}</p>
          <p>
            <i @click="removeFromCart(index)" class="bi bi-x-circle-fill"></i>
          </p>
        </div>
      </div>

      <div v-if="carrito.length > 0" class="total">
        <h2>Total:</h2>
        <h1>${{ total }}</h1>
      </div>

      <div v-if="carrito.length > 0" class="buttons">
        <button class="btnCancel">Cancelar</button>
        <input
          class="btnConfirm"
          @click="createSale"
          type="submit"
          value="Vender"
        />
      </div>
    </div>
  </div>

 

  <div v-if="succesMessageVisible" class="alert alert-success" role="alert">
    <h4 class="alert-heading">
      VENTA EXITOSA <i class="bi bi-check-circle-fill"></i>
    </h4>
    <p>Hiciste una venta, podes ver sus estadisticas en el sitio de resumen</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      totalQuantity: 1,
      barcode: "",
      productsIds: [],
      carrito: [],
      total: 0,
      succesMessageVisible: false,
      turnBtn:'Iniciar turno'
    };
  },
  methods: {
    async getProductBybarCode(barcode) {
      try {
        const response = await axios.get(
          `http://localhost:3000/products/barcode/${barcode}/search/65931333d7c90d26950f7332`
        );
        this.barcode = "";

        if (response && response.data) {
          const productoEncontrado = response.data;

          if (
            productoEncontrado &&
            productoEncontrado.sellPrice !== undefined
          ) {
            this.total += productoEncontrado.sellPrice;
            const existingProduct = this.carrito.find(
              (product) => product._id === productoEncontrado._id
            );

            if (existingProduct) {
              existingProduct.sellQuantity += 1; // Aumentar la cantidad si el producto ya está en el carrito
            } else {
              productoEncontrado.sellQuantity = 1; // Establecer la cantidad en 1 para un nuevo producto
              this.carrito.push(productoEncontrado); // Agregar el nuevo producto al carrito
              this.productsIds.push(productoEncontrado._id);
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
      if (this.carrito.length === 0) {
        window.alert("No se puede registrar una venta vacia");
        return;
      }
      let arrayOfIds = [];
      for (const product of this.productsIds) {
        arrayOfIds.push(product);
      }

      const sale = await axios.post("http://localhost:3000/sales", {
        total: this.total,
        businessId: "65931333d7c90d26950f7332",
        productIds: arrayOfIds,
        paymentMethod: this.paymentMethod,
      });

      if (sale) {
        console.log("Venta exitosa", sale);
        this.carrito = [];
        this.arrayOfIds = [];
        this.total = 0;
        this.showSuccesMessage();
      } else {
        console.log("Error al realizar la venta");
      }
    },
    removeFromCart(index) {
      const removedProduct = this.carrito[index];
      this.total -= this.getTotalProductPrice(removedProduct); // Restar el precio total del producto eliminado del total
      this.carrito.splice(index, 1); // Eliminar el producto del carrito por su índice
    },
    showSuccesMessage() {
      this.succesMessageVisible = true;
      setTimeout(() => {
        this.succesMessageVisible = false;
      }, 1000);
    },

    increaseQuantity(product) {
      product.sellQuantity += 1;
      this.total += product.sellPrice; // Incrementar la cantidad de un producto específico
    },

    decreaseQuantity(product) {
      if (product.sellQuantity > 1) {
        product.sellQuantity -= 1;
        this.total -= product.sellPrice;
      } // Decrementar la cantidad de un producto específico
    },
   
  },
  computed: {
    getTotalProductPrice() {
      return (product) => product.sellPrice * product.sellQuantity; // Calcular el precio total del producto
    },
  },
};
</script>

<style scoped>
.productSale {
  background-color: #1a1a1a;
  margin: 10px;
  width: 70%;
}
.inputsTitle {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 20px;
  margin: 10px;
}
.inputs {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 20px;
  margin: 10px;
}
.alert {
  width: 50%;
  position: absolute;
  top: 30%;
  right: 20%;
}
.total {
  margin-left: 10px;
  margin-top: 30px;
  display: grid;
  grid-template-columns: 20% 80%;
}

.products-titles {
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
  display: flex;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
}
.product-container {
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
  background-color: #1a1a1a;
  padding: 5px;
  border-radius: 5px;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
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

.searchbar-container {
  display: flex;
  align-items: center; /* Alinear verticalmente los elementos */
}

.searchbar-container p {
  margin-right: 10px; /* Ajustar márgenes si es necesario */
  margin-top: 10px;
  font-size: 20px;
  padding: 10px;
  font-weight: bolder;
}

.searchbar-container input {
  margin-left: 20px; /* Ajustar márgenes si es necesario */
  width: 50%;
  border-radius: 15px;
  border: 1px solid #574f7a;
  padding: 10px;
}

.salesBtn {
  margin-left: 190px; /* Ajustar márgenes si es necesario */
  color: white;
  font-size: 15px;
  font-weight: bold;
  border-radius: 15px;
  border: 1px solid white;
  padding: 10px;
  background-color: #574f7a;
  transition: transform 0.3s ease;
}

.salesBtn:hover {
  transform: scale(1.1); /* Agrandar el botón al 110% de su tamaño original */
}
.buttons {
  margin: 10px;
  width: 100%;
  display: flex;
}

.btnCancel {
  border-radius: 15px;
  background-color: #d02941;
  border: none;
  margin: 5px;
  padding: 5px;
  font-size: 20px;
  font-weight: bold;
  transition: transform 0.3s ease;
  width: 100%;
}

.btnConfirm {
  width: 100%;
  border-radius: 15px;
  background-color: #149c68;
  border: none;
  margin: 5px;
  padding: 5px;
  font-size: 20px;
  font-weight: bold;
  transition: transform 0.3s ease;
}

.btnCancel:hover,
.btnConfirm:hover {
  transform: scale(1.1); /* Agrandar el botón al 110% de su tamaño original */
}
</style>
