<template>
  <div class="mainContainer">
    <!-- BUSCADOR POR CODIGO DE BARRAS -->
    <div class="searchbar-container">
      <p>Buscar producto:</p>
      <input
        v-if="searchByCodeState"
        v-model="barcode"
        type="search"
        @keyup.enter="getProductBybarCode(barcode)"
        name=""
        placeholder="Buscar por codigo"
        id=""
      />
      <input
        v-if="searchByNameState"
        v-model="productName"
        type="search"
        @keyup.enter="getProductByName()"
        name=""
        placeholder="Buscar por nombre"
        id=""
      />

      <button @click="changeStateOfSearch" class="salesBtn">
        <i class="bi bi-arrow-left-right"></i>
      </button>
      <a style="margin-left: 10px; font-size: 12px"
        >Alternar entre buscador <br />
        por código/nombre</a
      >
    </div>
    <div class="listOfProductSearched">
      <ul
        @click="addFromList(product)"
        v-for="(product, index) in multipleProductsArray"
        :key="index"
      >
        <li>{{ product.name }}</li>
        <li>{{ product.barCode }}</li>
        <li>{{ product.sellPrice }}</li>
      </ul>
    </div>
    <!-- INSTRUCTIVO -->
    <div>
      <p style="color: black; margin-left: 10px; font-weight: bold">
        Para realizar una <span style="color: green">venta</span> presiona
        <span
          style="
            background-color: green;
            padding: 2px;
            border-radius: 5px;
            color: white;
          "
          >F4</span
        >. Para <span style="color: red">Cancelar</span>, presiona
        <span
          style="
            background-color: red;
            padding: 2px;
            border-radius: 5px;
            color: white;
          "
          >Escape</span
        >
      </p>
    </div>

    <!-- CONTENEDOR DE VENTAS -->
    <div>
      <div class="inputsTitle">
        <p>Cliente:</p>
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

        <!-- <select v-model="employeeId" name="" id="">
          <option value="">General</option>
          <option
            v-for="(employee, index) in employees"
            :key="index"
            :value="employee._id"
          >
            {{ employee.name }}
          </option>
        </select> -->

        <select v-model="paymentMethod" name="" id="">
          <option value="Efectivo">Efectivo</option>
          <option value="Transferencia">Transferencia</option>
          <option value="Credito">Credito</option>
          <option value="Cuenta_corriente">Cuenta corriente</option>
        </select>
      </div>

      <div  class="productSale">
        <div>
          <div class="products-titles">
            <p>Productos</p>
            <p>Cantidad</p>
            <p>Precio unitario</p>
            <p>Precio total</p>
          </div>
          <div  class="product-container-wrapper">
            <div
              class="product-container"
              v-for="(product, index) in carrito"
              :key="index"
            >
              <p>{{ product.name }}</p>
              <div v-if="editQuantityStatus" class="btn">
                <i
                  @click="changeStatusOfQuantity"
                  style="margin-left: 10px; color: black"
                  class="bi bi-pencil"
                ></i>
                <button @click="decreaseQuantity(product)">-</button>
                <p>{{ product.sellQuantity }}</p>
                <button @click="increaseQuantity(product)">+</button>
              </div>

              <div class="inputQuantity" v-else>
                <input v-model="product.sellQuantity" type="number" />
                <i @click="changeStatusOfQuantity" class="bi bi-x-circle"></i>
              </div>
              <p>${{ product.sellPrice }}</p>
              <p>${{ getTotalProductPrice(product) }}</p>
              <p>
                <i
                  @click="removeFromCart(index)"
                  class="bi bi-x-circle-fill"
                ></i>
              </p>
            </div>
          </div>
        </div>
      </div>
      <button
        @click="printReceipt"
        style="
          margin-left: 10px;
          border: none;
          background-color: #574f7a;
          color: white;
          font-weight: 600;
          padding: 8px;
        "
      >
        Imprimir comprobante
      </button>

      <div class="totalClass">
        <div class="total">
          <h2>Total:</h2>
          <h1>${{ total }}</h1>
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
      <div style="display: flex" class="btn-and-change-container">
        <div class="change-container">
          <h5>Cambio</h5>
          <input
            @keyup.enter="changeTotal"
            v-model="pay"
            type="number"
            placeholder="Paga con..."
          />
          <input
            @keyup.enter="changeTotal"
            type="text"
            v-model="total"
            placeholder="Total venta"
          />
          <label for="">Vuelto: ${{ change }}</label>
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
            @input="formatPriceInput"
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
          <button @click="changeStatusOfForm" class="btn-cancel">
            Cancelar
          </button>
          <button @click="createNewProduct" class="btn-confirm">
            Confirmar
          </button>
        </div>
      </div>
    </div>

    <div v-if="succesMessageVisible" class="alert alert-success" role="alert">
      <h4 class="alert-heading">
        VENTA EXITOSA <i class="bi bi-check-circle-fill"></i>
      </h4>
      <p>
        Hiciste una venta, podes ver sus estadisticas en el sitio de resumen
      </p>
    </div>
    <div v-if="loading" class="spinner-overlay">
      <spinner class="spinner"></spinner>
    </div>

  </div>
</template>

<script>
import axios from "axios";
import numeral from "numeral";
import spinner from "@/components/visuals/spinner.vue";
const businessId = localStorage.getItem("businessId");

export default {
  components:{
    spinner
  },
  data() {
    return {
      totalQuantity: 1,
      barcode: "",
      productName: "",
      productsIds: [],
      carrito: [],
      total: 0,
      quantity: 0,
      manualQuantity: 0,
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
      instructionsState: false,
      instructions: "",
      searchByNameState: false,
      searchByCodeState: true,
      change: "",
      pay: "",
      totalForChange: 0,
      multipleProductsArray: [],
      editQuantityStatus: true,
      businessData: [],
      cashierUsername: "",
      loading:false,
    };
  },
  methods: {
    async getProductBybarCode(barcode) {
      try {
        const businessId = localStorage.getItem("businessId");

        const response = await axios.get(
          `http://localhost:3000/products/cate/${businessId}/${barcode}`
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
            }
          }
        } else {
          if (window.confirm("Producto no encontrado ¿Desea añadirlo?")) {
            const productFromDB = this.getProductFromDB(barcode);
            if (!productFromDB || !productFromDB.name) {
             const productFromUPC= this.getProductFromGoUpc(barcode);
            }else if(!productFromUPC || !productFromUPC.name){
              this.data.barCode=barcode
            this.changeStatusOfForm();

            }
            this.data.barCode = barcode;
            this.changeStatusOfForm();
          }
        }
      } catch (error) {
        console.error("Error al obtener el producto:", error);
      }
    },
    async getProductByName() {
      try {
        const businessId = localStorage.getItem("businessId");

        const response = await axios.get(
          `http://localhost:3000/products/${businessId}/search/${this.productName}`
        );
        this.multipleProductsArray = [];
        this.productName = "";
        console.log(response.data[0]);
        if (response && response.data.length === 1) {
          const productoEncontrado = response.data[0];
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
            }
          }
        } else if (response && response.data.length > 1) {
          for (const product of response.data) {
            this.multipleProductsArray.push(product);
          }
        } else {
          if (window.confirm("Producto no encontrado ¿Desea añadirlo?")) {
            this.changeStatusOfForm();
          }
        }
      } catch (error) {
        console.error("Error al obtener el producto:", error);
      }
    },
    async getProductFromDB(barcode) {
      try {
        this.data.name = "";
        this.data.sellPrice = null;
        const response = await axios.get(
          `http://localhost:3000/products/searchIn/${barcode}`
        );
        const product = response.data;
        console.log("Producto desde BBDD: ", product);
        if (product.length !== 0) {
          this.data.name = product.name;
          this.data.sellPrice = product.sellPrice;
        }
        return product;
      } catch (error) {
        throw error;
      }
    },
    async createNewProduct() {
      try {
        if (!this.data.name || !this.data.sellPrice) {
          window.alert("Los campos no deben estar vacíos");
        } else {
          const businessId = localStorage.getItem("businessId");

          const sellPriceFormated = numeral(this.data.sellPrice).value();
          const newProduct = await axios.post(
            `http://localhost:3000/products/${this.selectedCategoryId}`,
            {
              name: this.data.name,
              sellPrice: sellPriceFormated,
              barCode: this.data.barCode,
              expirationDate: new Date(),
              businessId: businessId,
              quantity: 10,
            }
          );

          const searchInDb = await axios.get(
            `http://localhost:3000/products/searchIn/${this.data.barCode}`
          );
          if (!searchInDb.data || this.data.barCode.length > 6) {
            await axios.post(
              `http://localhost:3000/products/create/product/sendToDb`,
              {
                name: this.data.name,
                sellPrice: sellPriceFormated,
                barCode: this.data.barCode,
                expirationDate: new Date(),
                businessId: businessId,
                quantity: 10,
              }
            );
          }

          newProduct.data.sellQuantity = 1;
          this.productsIds.push(newProduct.data._id);
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
      this.loading=true
      let arrayOfIds = [];
      let arrayOfProductsQuantities = [];
      for (const product of this.productsIds) {
        arrayOfIds.push(product);
      }

      for (const item of this.carrito) {
        arrayOfProductsQuantities.push(item.sellQuantity);
      }
      const businessId = localStorage.getItem("businessId");

      const saleData = {
        total: this.total,
        businessId: businessId,
        productIds: arrayOfIds,
        paymentMethod: this.paymentMethod,
        productQuantity: arrayOfProductsQuantities,
        cashier: this.cashierUsername,
      };

      if (this.clientId && this.clientId !== "General") {
        saleData.clientId = this.clientId;
      }

      if (this.employeeId && this.employeeId !== "General") {
        saleData.employeeId = this.employeeId;
      }

      try {
        const sale = await axios.post("http://localhost:3000/sales", saleData);
        console.log(sale);
        this.totalForChange = this.total;

        if (sale) {
          if (this.clientId && this.clientId !== "General") {
            const client = await axios.get(
              `http://localhost:3000/clients/searcher/${this.clientId}`
            );
            const debtOfClient = client.data.debt;
            const newDebt = debtOfClient + this.total;
            await axios.put(`http://localhost:3000/clients/${this.clientId}`, {
              debt: newDebt,
            });
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
          this.clientId = "General";
          this.multipleProductsArray = [];
          this.pay = "";
          this.change = "";
          this.loading=false
          this.showSuccesMessage();
          console.log("Cambio despues : ", this.totalForChange);
        } else {
          console.log("Error al realizar la venta");
        }
      } catch (error) {
        window.alert("Error al realizar la venta:");
        console.log(error);
      }
    },
    async getBusinessData() {
      try {
        const businessId = localStorage.getItem("businessId");

        const res = await axios.get(
          `http://localhost:3000/business/${businessId}`
        );
        const business = res.data;
        this.clients = business.clients;
        console.log("Clientes:", this.clients);
        this.employees = business.employees;
      } catch (error) {
        throw error;
      }
    },
    async getCategoryesIds() {
      try {
        const businessId = localStorage.getItem("businessId");

        const res = await axios.get(
          `http://localhost:3000/categoryes/get/categoriyesIds/${businessId}`
        );

        const cateIds = res.data;
        this.categoriesIds = cateIds;
      } catch (error) {
        throw error;
      }
    },
    async getProductFromGoUpc(barcode) {
      try {
        console.log("El barcode es: ", barcode);

        const result = await axios.get(
          `http://localhost:3000/globalproducts/${barcode}`
        );
        console.log("Producto desde UPC:", result.data.product);
        const product=result.data
        const productData = {
          name: result.data.product.name,
          description: result.data.product.description,
          category: result.data.product.category,
        };
        return product
        this.data.name = productData.name;
      } catch (error) {
        throw error;
      }
    },
    async getUserData() {
      try {
        const userId = localStorage.getItem("userId");
        const response = await axios.get(
          `http://localhost:3000/auth/${userId}`
        );
        const user = response.data;
        this.cashierUsername = user.username;
      } catch (error) {
        throw error;
      }
    },
    // **********************LLAMADAS A LA API******************************************************************
    changeStatusOfQuantity() {
      this.editQuantityStatus = !this.editQuantityStatus;
    },
    changeTotal() {
      try {
        this.change = this.total - this.pay;
        this.change = this.change * -1;
      } catch (error) {
        throw error;
      }
    },
    removeFromCart(index) {
      const removedProduct = this.carrito[index];
      this.total -= this.getTotalProductPrice(removedProduct);
      this.carrito.splice(index, 1);
    },

    formatPriceInput() {
      // Formatear el precio mientras se escribe
      this.data.sellPrice = numeral(this.data.sellPrice).format("$0,0");
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
      this.multipleProductsArray = [];
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

    generateReceiptContent() {
      const currentDate = new Date();
      const day = currentDate.getDate().toString().padStart(2, "0");
      const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
      const year = currentDate.getFullYear();
      const hours = currentDate.getHours().toString().padStart(2, "0");
      const minutes = currentDate.getMinutes().toString().padStart(2, "0");
      const formattedDate = `${day}/${month}/${year}`;
      const formattedTime = `${hours}:${minutes}`;

      let receiptHTML = `
    <div style="font-family: monospace; max-width: 300px; margin: 0 auto;">
      <div style="text-align: center; margin-bottom: 10px;">
        <h1 style="font-size: 80px; margin: 0;">X</h1>
        <h5 style="font-size: 24px; margin: 0;">No valido como factura</h5>
        <h1 style="font-size: 24px; margin: 0;">Ticket de Venta</h1>
        <p style="font-size: 14px; margin: 5px 0;">Fecha: ${formattedDate} - Hora: ${formattedTime}</p>
        <p style="font-size: 14px; margin: 5px 0;">Nombre del Negocio: </p>
        <p style="font-size: 14px; margin: 5px 0;">CUIT: 12345678901</p>
        <p style="font-size: 14px; margin: 10px 0;">Cliente: ${
          this.clientId || "General"
        }</p>
      </div>
      <ul style="list-style-type: none; padding: 0; margin: 0;">
  `;

      this.carrito.forEach((product) => {
        receiptHTML += `
      <li style="font-size: 14px; margin-bottom: 5px;text-align:center;">
        ${product.name} - Cant: ${
          product.sellQuantity
        } - Precio: $${product.sellPrice.toFixed(2)} - Total: $${(
          product.sellQuantity * product.sellPrice
        ).toFixed(2)}
      </li>
    `;
      });

      receiptHTML += `
      </ul>
      <div style="text-align: center; font-size: 18px; margin-top: 10px;">
        <p style="font-weight: bold;">Total: $${this.total.toFixed(2)}</p>
      </div>
    </div>
  `;

      return receiptHTML;
    },
    printReceipt() {
      const receiptContent = this.generateReceiptContent();

      // Abrir el diálogo de impresión del navegador
      const printWindow = window.open("", "_blank");
      printWindow.document.write(receiptContent);
      printWindow.document.close();
      printWindow.print();
    },
    changeStateOfSearch() {
      if (this.searchByCodeState === true) {
        this.searchByNameState = true;
        this.searchByCodeState = false;
      } else {
        this.searchByNameState = false;
        this.searchByCodeState = true;
      }
    },
    addFromList(product) {
      // Buscar si el producto ya está en el carrito
      const existingProduct = this.carrito.find((p) => p._id === product._id);

      if (existingProduct) {
        // Si el producto ya está en el carrito, incrementar la cantidad y actualizar el total
        existingProduct.sellQuantity++;
        this.total += existingProduct.sellPrice;
      } else {
        // Si el producto no está en el carrito, agregarlo al carrito con una cantidad inicial de 1 y actualizar el total
        product.sellQuantity = 1;
        this.carrito.push(product);
        this.productsIds.push(product._id);
        this.total += product.sellPrice;
      }
    },
  },
  watch: {
    // Observador para cambios en la propiedad sellQuantity de los productos en el carrito
    carrito: {
      deep: true,
      handler(newCarrito, oldCarrito) {
        // Calcula el nuevo total de la venta cuando cambia la cantidad de un producto
        let newTotal = 0;
        newCarrito.forEach((product) => {
          newTotal += product.sellPrice * product.sellQuantity;
        });
        this.total = newTotal;
      },
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
      this.getCategoryesIds(),
      this.getBusinessData(),
      this.getUserData();
  },
  beforeDestroy() {
    window.removeEventListener("keydown", this.handleKeyDown);
  },
};
</script>

<style scoped>
.spinner-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* Asegura que esté por encima de otros elementos */
}

.spinner{
  width: 50px;
  height: 50px
}

.inputQuantity {
  display: flex;
  flex-direction: row;
  width: 50%;
}

.listOfProductSearched {
  margin-left: 10px;
  margin-right: 10px;
  background-color: white;
}
.listOfProductSearched ul {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  list-style: none;
  background-color: white;
  padding: 2px;
}

.listOfProductSearched ul:hover {
  background-color: #574f7a;
  color: white;
}

.listOfProductSearched li {
  border-bottom: 1px solid black;
}

.btn-and-change-container {
  display: flex;
  justify-content: flex-end; /* Alinea los elementos a los extremos */
}
.change-container {
  width: 200px;
  background-color: white;
  padding: 5px;
  display: flex;
  flex-direction: column;
  align-self: center;
  margin-top: -140px;
}
.searchSwitch button {
  margin: 10px;
  border-radius: 15px;
  padding: 10px;
  border: none;
  background-color: #149c68;
  color: white;
  font-size: 18px;
  font-weight: bold;
  transition: transform 0.3s ease;
}
.productSale {
  background-color: #ffffff;
  height: 400px;
  margin: 10px;
  display: grid;
  grid-template-rows: 10vh auto 20vh 15vh;
  box-shadow: 5px 5px 5px -5px rgba(0, 0, 0, 0.75);
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
.totalClass {
  display: flex;
  justify-content: flex-start;
  margin-top: 30px;
}
.total {
  display: flex;
  flex-direction: row;
  column-gap: 50px;
  align-self: center;
  align-items: center;
}

.products-titles {
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
  display: flex;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  font-weight: bold;
}
.product-container {
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
  background-color: #ffffff;
  padding: 5px;
  border-radius: 5px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  font-weight: bold;
  border-bottom: 1px solid #ccc;
}

.product-container > * {
  border-right: 1px solid #ccc; /* Añade una línea divisoria a la derecha de cada elemento hijo */
  padding-right: 5px;
  padding-left: 5px;
}

.product-container-wrapper {
  max-height: 300px;
  overflow-y: auto;
}

.btn {
  display: flex;
  color: white;
}

.btn button {
  width: 25px;
  height: 25px;
  background-color: #ffffff;
  color: black;
  border: none;
  border-radius: 4px;
  font-weight: bold;
}
.btn p {
  color: black;
  font-weight: bold;
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
  margin-left: 10px; /* Ajustar márgenes si es necesario */
  margin-right: 10px;
  width: 50%;
  padding: 10px;
}

.salesBtn {
  color: white;
  font-size: 15px;
  font-weight: bold;
  border: 1px solid white;
  padding: 10px;
  background-color: #574f7a;
}

.salesBtn:hover {
  transform: scale(1.1); /* Agrandar el botón al 110% de su tamaño original */
}
.buttons {
  margin: 10px;
  width: 40%;
  display: flex;
  flex-direction: row;
  grid-row: 4;
  margin-left: 30px;
}

.btnCancel {
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
  background-color: #149c68;
  border: none;
  margin: 5px;
  padding: 5px;
  font-size: 20px;
  font-weight: bold;
  transition: transform 0.3s ease;
  border-radius: 0%;
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

/* //RESPONSIVE PARA TELEFONO-****************************************************************** */
@media screen and (max-width: 768px) {
  .searchbar-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .searchbar-container input {
    width: 95vw;
  }

  .searchbar-container .salesBtn {
    width: 95vw;
    padding-left: 0;
    margin-left: 10px;
  }

  .btn-and-change-container {
    display: flex;
    flex-direction: column;
  }

  .change-container {
    display: flex;
    margin-top: 20px;
    align-items: flex-start;
    width: 100vw;
  }
  .btn-and-change-container button {
    border-radius: 0%;
    width: 95vw;
  }

  .btn-and-change-container input {
    width: 95vw;
    border-radius: 0%;
  }
}
</style>
