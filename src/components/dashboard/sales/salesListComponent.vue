<template>
  <div class="stock-container">
    <div class="searchbar-container">
      <p>Buscar venta:</p>
    </div>
    <div class="datesDiv">
      <label for="startDate">Fecha de inicio:</label>
      <input type="date" id="startDate" v-model="startDate" />

      <label for="endDate">Fecha de fin:</label>
      <input type="date" id="endDate" v-model="endDate" />

      <button @click="getFilteredSales">Obtener ventas filtradas</button>
      <button
        style="background-color: #d02941; margin-right: 10px"
        @click="clearFilters"
      >
        Quitar filtros
      </button>
    </div>

    <div class="assistentComponent">
      <h4>Asistente virtual</h4>
      <input
        type="text"
        v-model="question"
        placeholder="Ingresa tu consulta sobre tus ventas..."
      />
      <button @click="askGpt">Consultar</button>
      <div
        v-if="loading === true"
        style="display: flex; justify-content: center; margin-top: 20px"
      >
        <spinner> </spinner>
      </div>
      <p v-if="loading === false" v-html="formattedResponse()"></p>
      <button v-if="showPrint === true" @click="printResponse">Imprimir</button>
    </div>

    <div v-if="showMessageBox" class="message-box">
      <div class="close-btn" @click="closeMessageBox">
        <i style="color: red" class="bi bi-x-circle-fill"></i>
      </div>
      <h4>Detalles de venta</h4>
      <div class="table-responsive">
        <table class="table table-hover table-nowrap">
          <thead class="thead-light">
            <tr class="tableRow">
              <th scope="col">Producto</th>
              <th scope="col">Cantidad</th>
              <th scope="col">Precio unitario</th>
              <th scope="col">Precio total</th>
            </tr>
          </thead>
          <tbody class="table-body">
            <!-- *****************************DETALLE DE VENTAS**************************************************** -->
            <template v-for="(sale, index) in salesDetailsArray.products">
              <tr @click="setId(sale._id)">
                <!-- Muestra el nombre del producto -->
                <td scope="col">{{ sale.name }}</td>

                <!-- Si hay una cantidad correspondiente en el array de cantidades, muéstrala -->
                <td
                  scope="col"
                  v-if="
                    salesDetailsArray.sale.productQuantity[index] !== undefined
                  "
                >
                  {{ salesDetailsArray.sale.productQuantity[index] }}
                </td>
                <!-- Si no hay una cantidad correspondiente, muestra un espacio en blanco -->
                <td scope="col" v-else></td>

                <td scope="col">{{ formatPrice(sale.sellPrice) }}</td>

                <td scope="col">
                  {{
                    formatPrice(
                      sale.sellPrice *
                        salesDetailsArray.sale.productQuantity[index]
                    )
                  }}
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>

    <div class="table-responsive">
      <table class="table table-hover table-nowrap">
        <thead class="thead-light">
          <tr class="tableRow">
            <th scope="col">Total</th>
            <th scope="col">Forma de pago</th>
            <th scope="col">Vendedor</th>
            <th scope="col">Fecha</th>
          </tr>
        </thead>
        <tbody class="table-body">
          <!-- *****************************VENTAS FILTRADAS**************************************************** -->
          <tr
            @click="setId(sale._id)"
            v-for="(sale, index2) in filteredSales"
            :key="index2"
            v-if="filteredSales.length > 0"
          >
            <td>
              <span v-if="!editorStatus">{{ formatPrice(sale.total) }}</span>
              <input name="name" v-else type="text" v-model="sale.total" />
            </td>

            <td>
              <span v-if="!editorStatus">{{ sale.paymentMethod }}</span>
              <input
                name="description"
                v-else
                type="text"
                v-model="sale.paymentMethod"
              />
            </td>
            <td>
              <span>{{ sale.cashier }}</span>
            </td>
            <td>
              <span>{{ formatDate(sale.createdAt) }}</span>
            </td>

            <!-- <td v-if="!editorStatus">
              <a @click="changeStatusOfEditor"><i class="bi bi-pencil"></i></a>
            </td>
            <td v-else>
              <a @click.prevent="updateProduct(sale, sale._id)" href="#">
                <i style="color: #149c68" class="bi bi-check-circle-fill"></i>
              </a>
              <a href="#" @click="changeStatusOfEditor">
                <i style="color: #d02941" class="bi bi-x-circle"></i>
              </a>
            </td> -->
            <td>
              <a @click.prevent="deleteProduct(sale._id)">
                <i class="bi bi-trash"></i>
              </a>
            </td>
            <td>
              <a @click.prevent="getSalesDetails" href="#">
                <i style="color: black" class="bi bi-search"></i>
              </a>
            </td>
          </tr>

          <!-- *****************************TODAS LA VENTAS**************************************************** -->
          <tr
            @click="setId(sale._id)"
            v-for="(sale, index) in salesArray"
            :key="index"
            v-else
          >
            <td>
              <span v-if="!editorStatus">{{ formatPrice(sale.total) }}</span>
              <input name="name" v-else type="text" v-model="sale.total" />
            </td>

            <td>
              <span v-if="!editorStatus">{{ sale.paymentMethod }}</span>
              <input
                name="description"
                v-else
                type="text"
                v-model="sale.paymentMethod"
              />
            </td>
            <td>
              <span>{{ sale.cashier }}</span>
            </td>
            <td>
              <span>{{ formatDate(sale.createdAt) }}</span>
            </td>

            <!-- <td v-if="!editorStatus">
              <a @click="changeStatusOfEditor"><i class="bi bi-pencil"></i></a>
            </td>
            <td v-else>
              <a @click.prevent="updateProduct(sale, sale._id)" href="#">
                <i style="color: #149c68" class="bi bi-check-circle-fill"></i>
              </a>
              <a href="#" @click="changeStatusOfEditor">
                <i style="color: #d02941" class="bi bi-x-circle"></i>
              </a>
            </td>-->
            <td>
              <a @click.prevent="deleteProduct(sale._id)">
                <i class="bi bi-trash"></i
              ></a>
            </td>
            <td>
              <a @click.prevent="getSalesDetails(sale._id)" href="#">
                <i style="color: black" class="bi bi-search"></i>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import numeral from "numeral";
import axios from "axios";
import spinner from "@/components/visuals/spinner.vue";
const businessId = localStorage.getItem("businessId");

export default {
  components: {
    spinner,
  },
  data() {
    return {
      salesArray: [],
      product_id: null,
      editorStatus: false,
      formStatus: false,
      data: {
        name: "",
        description: "",
        sellPrice: "",
        quantity: "",
        barCode: "",
        expirationDate: new Date(),
      },
      productName: "",
      selectedProduct: {},
      foundProduct: true,
      searchedProducts: [],
      startDate: "",
      endDate: "",
      filteredSales: [],
      salesDetailsArray: [],
      showMessageBox: false,
      message: "",
      question: "",
      respuesta: "",
      information: [],
      loading: false,
      showPrint: false,
    };
  },

  methods: {
    // *****************************************LLAMADAS A LA API*******************************
    async getAllProducts() {
      try {
        const businessId = localStorage.getItem("businessId");

        const result = await axios.get(
          `http://localhost:3000/business/sales/${businessId}`
        );
        const sales = result.data;
        this.salesArray = sales;
      } catch (error) {
        console.log(error);
      }
    },
    async updateProduct(product, id) {
      try {
        // const formattedExpirationDate = moment
        //   .utc(buy.expirationDate)
        //   .add(1, "days")
        //   .format("YYYY-MM-DD");

        await axios.put(`http://localhost:3000/sales/${id}`, {
          total: product.name,
          paymentMethod: product.description,
        });

        this.getAllProducts();
        this.changeStatusOfEditor();
      } catch (error) {
        console.log("Error al actualizar");
      }
    },
    async deleteProduct(id) {
      try {
        if (
          window.confirm("¿Estás seguro de que deseas realizar esta acción?")
        ) {
          const deleteProduct = await axios.delete(
            `http://localhost:3000/sales/${id}`
          );

          window.alert("Venta eliminado");
          this.getAllProducts();
        } else {
          window.alert("Accion cancelada");
        }
      } catch (error) {
        console.log(error);
      }
    },
    async createNewProduct() {
      try {
        if (
          !this.data.name ||
          !this.data.description ||
          !this.data.sellPrice ||
          !this.data.quantity
        ) {
          window.alert("Los campos no deben estar vacíos");
        } else {
          const businessId = localStorage.getItem("businessId");

          const newProduct = await axios.post(
            "http://localhost:3000/products",
            {
              name: this.data.name,
              description: this.data.description,
              sellPrice: this.data.sellPrice,
              quantity: this.data.quantity,
              barCode: this.data.barCode,
              businessId: businessId,
            }
          );
          this.data.name = "";
          this.data.description = "";
          this.data.sellPrice = "";
          this.data.quantity = "";
          this.data.barCode = "";
          this.getAllProducts();

          setTimeout(() => {
            this.changeStatusOfForm();
          }, 0);
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    },
    async searchProduct(productName) {
      try {
        const businessId = localStorage.getItem("businessId");

        const product = await axios.get(
          `http://localhost:3000/products/${businessId}/search/${productName}`
        );
        const productoEncontrado = product.data;

        this.searchedProducts = productoEncontrado;
        console.log("Producto encontrado", this.searchedProducts);

        if (productoEncontrado) {
          this.searchedProducts = productoEncontrado;
          this.foundProduct = false;
          console.log("Un solo producto: ", this.foundProduct);
        } else {
          this.searchedProducts = [];
          this.foundProduct = false;
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    },
    async getFilteredSales(startDate, endDate) {
      const businessId = localStorage.getItem("businessId");

      try {
        if (this.startDate === this.endDate) {
          window.alert("Las fechas no deben ser iguales");
          return;
        }
        this.filteredSales = [];
        const response = await axios.get(
          `http://localhost:3000/sales/getSales/business/${businessId}/${this.startDate}/${this.endDate}`
        );
        console.log(response.data);
        if (response.data.length === 0) {
          window.alert("No hay ventas para esas fechas");
          return;
        }
        const salesData = response.data;
        this.filteredSales = salesData;
        for (const sale of this.filteredSales) {
          console.log(sale);
        }
      } catch (error) {
        console.error("Error al obtener las ventas filtradas:", error);
        // Manejar el error si es necesario
        throw error;
      }
    },
    async getSalesDetails(id) {
      try {
        this.salesDetailsArray = [];
        const res = await axios.get(`http://localhost:3000/sales/${id}`);
        const sale = res.data;
        this.salesDetailsArray = sale;
        this.showMessageBox = true;
      } catch (error) {
        throw error;
      }
    },
    async askGpt() {
      try {
        if (this.question === "") {
          window.alert("Tu pregunta no puede estar vacia");
          return;
        }
        this.loading = true;
        const sales = await axios.get(
          `http://localhost:3000/sales/products/sales/details/${businessId}`
        );
        const products = sales.data;
        this.information = products;

        console.log("Pregunta: ", this.question);
        console.log("Informacion: ", this.information);
        const response = await axios.post(`http://localhost:3000/chat-gpt`, {
          message: this.question,
          info: this.information,
        });
        const data = response.data;

        this.respuesta = data;
        this.loading = false;
        this.showPrint = true;
      } catch (error) {
        throw error;
      }
    },

    // *****************************************************************************************
    formattedResponse() {
      return this.respuesta.split("*").join("*<br/><br/>");
    },
    formatPrice(price) {
      return numeral(price).format("$0,0.00");
    },
    formatDate(date) {
      return moment(date).format("DD/MM/YYYY");
    },
    checkInput() {
      if (this.productName === "") {
        this.foundProduct = true;
      }
    },
    setId(id) {
      this.product_id = id;
      console.log(this.product_id);
    },
    changeStatusOfEditor() {
      this.editorStatus = !this.editorStatus;
    },
    changeStatusOfForm() {
      this.formStatus = !this.formStatus;
      console.log("Formulario abierto/cerrado");
    },
    clearFilters() {
      this.startDate = "";
      this.endDate = "";
      this.filteredSales.length = 0;
      this.getAllProducts();
    },
    openMessageBox() {
      this.showMessageBox = true;
    },
    closeMessageBox() {
      this.showMessageBox = false;
      this.salesDetailsArray = [];
    },
    generateResponseContent() {
      const currentDate = new Date();
      const day = currentDate.getDate().toString().padStart(2, "0");
      const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
      const year = currentDate.getFullYear();
      const formattedDate = `${day}/${month}/${year}`;
      let contentHTML = `
    <h2>Consulta al asistente</h2>
    <h5>Fecha: ${formattedDate}</h5>

  `;
      const responseContent = this.respuesta;
      contentHTML += responseContent;
      return contentHTML;
    },
    printResponse() {
      const responseContent = this.generateResponseContent();

      const printWindow = window.open("", "_blank");
      printWindow.document.write(responseContent);
      printWindow.document.close();
      printWindow.print();
    },
  },
  mounted() {
    this.getAllProducts();
  },
};
</script>

<style scoped>
.message-box {
  position: fixed;
  top: 50%;
  left: 60%;
  transform: translate(-50%, -50%);
  background-color: #f0f0f0;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 800px;
  height: 400px;
  overflow-y: auto;
}

.message-content {
  text-align: center;
}

.close-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
}
.datesDiv {
  display: flex;
  margin-left: 10px;
}

.datesDiv label {
  align-self: center;
}
.datesDiv input {
  width: 20%;
  height: auto;
  margin-left: 10px;
  margin-bottom: 0;
}
.datesDiv button {
  width: 20%;
  margin-left: 10px;
  border: none;
  background-color: #574f7a;
  color: white;
}
.top-container button {
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

.top-container button:hover {
  transform: scale(1.1); /* Agrandar el botón al 110% de su tamaño original */
}
input {
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 16px;
  margin-bottom: 5px;

  width: 100%;
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

.table-responsive {
  margin: 10px;
  /* background-color: #1a1a1a; */
  background-color: #ffffff;

  border-radius: 15px;
  padding: 5px;
}

.tableRow th {
  background-color: #ffffff;

  color: black;
}

.tableRow td {
  background-color: #ffffff;

  color: black;
}

.table-body td {
  background-color: #ffffff;

  color: black;
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
.assistentComponent {
  background-color: #ffffff;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 10px;
  padding: 10px;
  box-shadow: 4px 4px 5px -4px rgba(0, 0, 0, 0.75);
  overflow-y: auto;
  max-height: 212px;
}

.assistentComponent button {
  width: 100%;
  border: none;
  border-radius: 0%;
  background-color: #574f7a;
  font-size: 20px;
  font-weight: 500;
  color: white;
}

/* //RESPONSIVE PARA TELEFONO-****************************************************************** */
@media screen and (max-width: 768px) {
  .datesDiv {
    display: flex;
    flex-direction: column;
  }

  .datesDiv input {
    width: 95vw;
  }

  .datesDiv button {
    width: 95vw;
    margin-top: 10px;
  }
}
</style>
