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

  </div>

  <div>
    <div class="inputsTitle">
      <p>Cliente:</p>
      <p>Vendedor:</p>
    </div>

    <div class="inputs">
      <select v-model="clientId" name="" id="">
        <option value="">General</option>
        <option
          v-for="(client, index) in clients"
          :key="index"
          :value="client._id"
        >
          {{ client.name }}
        </option>
      </select>

      <select v-model="employeeId" name="" id="">
        <option value="">General</option>
        <option
          v-for="(employee, index) in employees"
          :key="index"
          :value="employee._id"
        >
          {{ employee.name }}
        </option>
      </select>
    </div>

    <div class="productSale">
      <div>
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

      <div class="totalClass">
        <div class="total">
          <h2>Total:</h2>
          <h1>${{ total }}</h1>
        </div>
      </div>
      <div class="buttons">
        <button @click="cancelSale" class="btnCancel">Cancelar</button>
        <input
          class="btnConfirm"
          @click="createSale"
          type="submit"
          value="Vender"
        />
      </div>
    </div>
  </div>

  <div v-if="formStatus" class="register-component">
    <div class="expenses-form">
      <div class="form-group">
        <h3 style="text-align: center">Nuevo producto</h3>
        <input
          v-model="data.name"
          type="text"
          placeholder="Ingrese un producto"
        />

        <input
          v-model="data.sellPrice"
          type="text"
          placeholder="Ingrese un precio"
        />
        <input
          v-model="data.barCode"
          type="text"
          placeholder="Ingrese codigo de barras"
        />
        <!-- <input
            v-model="data.expirationDate"
            type="date"
            placeholder="Ingrese una fecha de vencimiento"
          /> -->
        <button @click="changeStatusOfForm" class="btn-cancel">Cancelar</button>
        <button @click="createNewProduct" class="btn-confirm">Confirmar</button>
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
import stockComponent from "../stock/stockComponent.vue";

export default {
  data() {
    return {
      totalQuantity: 1,
      barcode: "",
      productsIds: [],
      carrito: [],
      total: 0,
      succesMessageVisible: false,
      clients: [],
      employees: [],
      paymentMethod: "Efectivo",
      clientId: "",
      employeeId: "",
      formStatus: false,
      data: {
        name: "",
        sellPrice: "",
        barCode: "",
        expirationDate: new Date(),
      },
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
              existingProduct.sellQuantity += 1;
            } else {
              productoEncontrado.sellQuantity = 1;
              this.carrito.push(productoEncontrado);

              console.log("Producto agregado");
              this.productsIds.push(productoEncontrado._id);
            }
          } else {
            if (window.confirm("Producto no encontrado ¿Desea añadirlo?")) {
              this.data.barCode = barcode;
              this.changeStatusOfForm();
            }
          }
        } else {
          console.log("La respuesta no contiene datos válidos.");
        }
      } catch (error) {
        console.error("Error al obtener el producto:", error);
      }
    },
    async createNewProduct() {
      try {
        if (!this.data.name || !this.data.sellPrice) {
          window.alert("Los campos no deben estar vacíos");
        } else {
          const newProduct = await axios.post(
            "http://localhost:3000/products",
            {
              name: this.data.name,
              sellPrice: this.data.sellPrice,
              barCode: this.data.barCode,
              businessId: "65931333d7c90d26950f7332",
            }
          );
          newProduct.data.sellQuantity = 1;
          this.total += newProduct.data.sellPrice;
          this.carrito.push(newProduct.data);
          this.data.name = "";
          this.data.sellPrice = "";
          this.data.barCode = "";

          setTimeout(() => {
            this.changeStatusOfForm();
          }, 0);
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    },
    async createSale() {
      let arrayOfIds = [];
      for (const product of this.productsIds) {
        console.log("Producto agregado al array de productsIds");
        arrayOfIds.push(product);
      }

      const saleData = {
        total: this.total,
        businessId: "65931333d7c90d26950f7332",
        productIds: arrayOfIds,
        paymentMethod: this.paymentMethod,
      };

      if (this.clientId && this.clientId !== "General") {
        saleData.clientId = this.clientId;
      }

      if (this.employeeId && this.employeeId !== "General") {
        saleData.employeeId = this.employeeId;
      }

      try {
        const sale = await axios.post(
          "http://localhost:3000/sales",
          saleData
        );

        if (sale) {
          console.log("Venta exitosa", sale);
          this.carrito = [];
          this.arrayOfIds = [];
          this.total = 0;
          this.showSuccesMessage();
        } else {
          console.log("Error al realizar la venta");
        }
      } catch (error) {
        console.error("Error al realizar la venta:", error);
      }
    },
    async getBusinessData() {
      try {
        const res = await axios.get(
          "http://localhost:3000/business/65931333d7c90d26950f7332"
        );
        const business = res.data;
        this.clients = business.clients;
        this.employees = business.employees;
      } catch (error) {
        throw error;
      }
    },
    removeFromCart(index) {
      const removedProduct = this.carrito[index];
      this.total -= this.getTotalProductPrice(removedProduct);
      this.carrito.splice(index, 1);
    },
    showSuccesMessage() {
      this.succesMessageVisible = true;
      setTimeout(() => {
        this.succesMessageVisible = false;
      }, 500);
    },
    increaseQuantity(product) {
      product.sellQuantity += 1;
      this.total += product.sellPrice;
    },
    decreaseQuantity(product) {
      if (product.sellQuantity > 1) {
        product.sellQuantity -= 1;
        this.total -= product.sellPrice;
      }
    },
    cancelSale() {
      this.barcode = "";
      this.productsIds = [];
      this.carrito = [];
      this.total = 0;
      this.paymentMethod = "Efectivo";
      this.clientId = "";
      this.employeeId = "";
    },
    handleKeyDown(event) {
      if (event.key === "F4") {
        this.createSale();
      } else if (event.key === "Escape") {
        this.cancelSale();
      }
    },
    changeStatusOfForm() {
      this.formStatus = !this.formStatus;
    },
  },
  computed: {
    getTotalProductPrice() {
      return (product) => product.sellPrice * product.sellQuantity;
    },
  },
  mounted() {
    this.getBusinessData();
    window.addEventListener("keydown", this.handleKeyDown);
  },
  beforeDestroy() {
    window.removeEventListener("keydown", this.handleKeyDown);
  },
};
</script>


<style scoped>
.productSale {
  background-color: #1a1a1a;
  margin: 10px;
  width: 100%;
  height: 520px;
  display: grid;
  grid-template-rows: 10vh auto 20vh 15vh;
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

.inputs select {
  border-radius: 15px;
  padding: 5px;
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
.totalClass {
  grid-row: 3;
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
  grid-row: 4;
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

.expenses-form {
  width: 40%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 5px;
  padding: 5px;
  background-color: black;
  position: absolute;
  top: 10%;
  right: 30%;
}

.form-group {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.expenses-form {
  h3 {
    color: white;
  }
}

label {
  font-size: 18px;
}

input {
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 16px;
  margin-bottom: 5px;

  width: 100%;
}

.btn-cancel,
.btn-confirm {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.btn-cancel {
  background-color: #ccc;
  color: black;
  margin-bottom: 5px;
  background-color: #d02941;
  font-size: 20px;
  font-weight: bold;
}

.btn-confirm {
  background-color: #149c68;
  color: black;
  font-size: 20px;
  font-weight: bold;
}
</style>