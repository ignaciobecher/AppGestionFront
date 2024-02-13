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
      <p>Forma de pago:</p>
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

      <select v-model="paymentMethod" name="" id="">
        <option value="Efectivo">Efectivo</option>
        <option value="Cheque">Cheque</option>
        <option value="Transferencia">Transferencia</option>
        <option value="Credito">Credito</option>
        <option value="Cuenta_corriente">Cuenta corriente</option>
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
        <select v-model="selectedCategoryId">
          <option
            v-for="(ids, index) in categoriesIds"
            :value="ids._id"
            :key="ids._id"
          >
            {{ ids.name }}
          </option>
        </select>
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

export default {
  data() {
    return {
      totalQuantity: 1,
      barcode: "",
      productsIds: [],
      carrito: [],
      total: 0,
      quantity: 0,
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
      categoriesIds: [],
      selectedCategoryId: null,
    };
  },
  methods: {
    async getProductBybarCode(barcode) {
      try {
        const response = await axios.get(
          `http://localhost:3000/products/cate/65bfdff8a75ffb8fb6be8937/${barcode}`
        );
        this.barcode = "";

        if (response && response.data && response.data.product) {
          const productoEncontrado = response.data.product;
          console.log("El producto encontrado es: ", productoEncontrado);

          if (productoEncontrado.sellPrice !== undefined) {
            this.total += productoEncontrado.sellPrice;
            const existingProduct = this.carrito.find(
              (product) => product._id === productoEncontrado._id
            );

            if (existingProduct) {
              existingProduct.sellQuantity += 1;
            } else {
              productoEncontrado.sellQuantity = 1;
              this.carrito.push(productoEncontrado);
              this.productsIds.push(productoEncontrado._id);
              console.log("Carrito: ", this.carrito);
              console.log("ProductID´s: ", this.productsIds);
            }
          }
        } else {
          if (window.confirm("Producto no encontrado ¿Desea añadirlo?")) {
            this.data.barCode = barcode;
            this.changeStatusOfForm();
          }
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
            `http://localhost:3000/products/${this.selectedCategoryId}`,
            {
              name: this.data.name,
              sellPrice: this.data.sellPrice,
              barCode: this.data.barCode,
              expirationDate: new Date(),
              businessId: "65bfdff8a75ffb8fb6be8937",
            }
          );
          console.log(newProduct);
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
        arrayOfIds.push(product);
      }
      const saleData = {
        total: this.total,
        businessId: "65bfdff8a75ffb8fb6be8937",
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
        const sale = await axios.post("http://localhost:3000/sales", saleData);

        if (sale) {
          if (this.clientId && this.clientId !== "General") {
            const client =await axios.get(`http://localhost:3000/clients/searcher/${this.clientId}`)
            const debtOfClient=client.data.debt
            const newDebt = debtOfClient + this.total;
            console.log('Deuda del cliente',debtOfClient);
            await axios.put(`http://localhost:3000/clients/${this.clientId}`,{
              debt:newDebt
            })
          }
          for (const product of this.carrito) {
            await axios.patch(`http://localhost:3000/products/${product._id}`, {
              quantity: product.quantity - product.sellQuantity, 
            });
          }

          this.carrito = [];
          this.arrayOfIds = [];
          this.total = 0;
          this.paymentMethod = "Efectivo";
          this.clientId="General"
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
          "http://localhost:3000/business/65bfdff8a75ffb8fb6be8937"
        );
        const business = res.data;
        this.clients = business.clients;
        this.employees = business.employees;
      } catch (error) {
        throw error;
      }
    },
    async getCategoryesIds() {
      try {
        const res = await axios.get(
          "http://localhost:3000/categoryes/get/categoriyesIds/65bfdff8a75ffb8fb6be8937"
        );

        const cateIds = res.data;
        this.categoriesIds = cateIds;
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
      if (event.key === "F8") {
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
    window.addEventListener("keydown", this.handleKeyDown),
      this.getCategoryesIds();
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

input,
select {
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
