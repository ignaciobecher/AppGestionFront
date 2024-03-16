<template>
  <div class="buysContainer">
    <div
      style="display: flex; flex-direction: row; justify-content: space-between"
    >
      <button
        class="buttonCreate"
        style="margin-right: 10px; margin-left: 10px"
        @click="changeFormStatus"
      >
        Registrar factura
      </button>

      <button
        class="buttonCreate"
        style="margin-right: 10px"
        @click="changeSupplierFormStatus"
      >
        Registrar proveedor
      </button>

      <router-link to="/suppliers">
        <button class="buttonCreate" style="margin-right: 10px">
          Mis proveedores
        </button>
      </router-link>
    </div>
    <!-- MOSTRAR FACTURA -->
    <div v-if="mostrarFactura" class="receiptContainer">
      <!-- Contenido de la factura -->
      <div class="closeButton">
        <i @click="changeStatusOfFactura" class="bi bi-x-lg"></i>
      </div>
      <h4>Datos del Comprobante</h4>
      <p><strong>Fecha:</strong> {{ formatDate(singleBuyObject.createdAt) }}</p>
      <p><strong>Proveedor:</strong> {{ singleBuyObject.seller }}</p>
      <p><strong>Email:</strong> {{ singleBuyObject.email }}</p>
      <p>
        <strong>Numero factura:</strong> {{ singleBuyObject.receiptNumber }}
      </p>
      <p><strong>Descripcion:</strong> {{ singleBuyObject.description }}</p>
      <p>
        <strong>Monto Total:</strong> {{ formatPrice(singleBuyObject.total) }}
      </p>

      <h5>Productos:</h5>
      <div style="display: flex; flex-direction: row">
        <table class="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Código de barras</th>
              <th>Cantidad</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(product, index) in singleBuyObject.productsObj"
              :key="index"
            >
              <td>{{ product.name }}</td>
              <td>{{ formatPrice(product.price) }}</td>
              <td>{{ product.codebar }}</td>
              <td>{{ product.cantidad }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <button
        style="
          border: none;
          background-color: #574f7a;
          font-weight: 500;
          color: white;
          padding: 5px;
        "
        @click="openNewTab"
      >
        Generar factura
      </button>
    </div>

    <!-- CREAR NUEVA FACTURA -->
    <div v-if="crearFactura" class="receiptContainer">
      <div class="closeButton">
        <i @click="changeFactura" class="bi bi-x-lg"></i>
      </div>
      <h4>Datos del Comprobante</h4>
      <p><strong>Fecha:</strong> {{ formatDate(receiptObject.createdAt) }}</p>
      <p><strong>Proveedor:</strong> {{ receiptObject.seller }}</p>
      <p><strong>Email:</strong> {{ receiptObject.email }}</p>
      <p><strong>Numero factura:</strong> {{ receiptObject.receiptNumber }}</p>
      <p><strong>Descripcion:</strong> {{ receiptObject.description }}</p>
      <p><strong>Nro factura:</strong> {{ receiptObject.receiptNumber }}</p>
      <p><strong>Monto Total:</strong> {{ receiptObject.total }}</p>

      <h5>Productos:</h5>
      <table class="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Código de barras</th>
            <th>Cantidad</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in receiptObject.products" :key="index">
            <td>{{ product.name }}</td>
            <td>{{ product.price }}</td>
            <td>{{ product.codebar }}</td>
            <td>{{ product.cantidad }}</td>
          </tr>
        </tbody>
        <select v-model="providerId" name="" id="">
          <option
            v-for="(provider, index) in providersArray"
            :key="index"
            :value="provider._id"
          >
            {{ provider.name }}
          </option>
        </select>
        <button @click="createNewBuy">Crear</button>
      </table>
    </div>

    <!-- ASISTENTE VIRTUAL -->
    <div class="assistentComponent">
      <h4>Asistente virtual</h4>
      <input
        type="text"
        v-model="question"
        placeholder="Ingresa tu consulta sobre los ingresos..."
      />
      <button @click="askGpt">Consultar</button>
      <div
        v-if="loading === true"
        style="display: flex; justify-content: center; margin-top: 20px"
      >
        <spinner> </spinner>
      </div>
      <p v-if="loading === false" v-html="formattedResponse()"></p>
    </div>

    <!-- CARGAR FOTO -->
    <div class="ocr-container">
      <h4>Cargar factura con foto</h4>
      <input type="file" ref="fileInput" />
      <button @click="analizeFile">Subir factura</button>
      <a v-if="loadingOcr === false" style="font-size: 12px"
        >La imagen debe ser en formato .png o .jpg (no debe ser un pdf)</a
      >
      <a
        v-if="loadingOcr === true"
        style="font-size: 13px; text-align: center; margin-top: 20px"
        >La carga de facturas con inteligencia artificial puede llevar unos
        segundos...</a
      >
      <div
        v-if="loadingOcr === true"
        style="display: flex; margin-top: 20px; justify-content: center"
      >
        <spinner> </spinner>
      </div>
    </div>

    <!-- TABLA DE DATOS -->
    <div class="table-responsive">
      <table class="table table-hover table-nowrap">
        <thead class="thead-light">
          <tr class="tableRow">
            <th scope="col">Fecha de compra</th>
            <th scope="col">Proveedor</th>
            <th scope="col">Descripcion</th>
            <th scope="col">Monto</th>
            <th scope="col">Numero Factura</th>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody class="table-body">
          <tr
            @click="setId(buy._id)"
            v-for="(buy, index) in buysArray"
            :key="index"
            class="tableRow"
          >
            <td>
              <span>{{ formatDate(buy.createdAt) }}</span>
            </td>
            <td>
              <span v-if="!editStatus">{{ buy.providerId.name }}</span>
              <input v-else v-model="buy.providerId.name" />
            </td>

            <td>
              <span v-if="!editStatus">{{ buy.description }}</span>
              <input v-else v-model="buy.description" type="text" />
            </td>
            <!-- <td>
              <span v-if="!editStatus">{{ buy.quantity }}</span>
              <input v-else v-model="buy.quantity" type="text" />
            </td> -->
            <td>
              <span v-if="!editStatus">${{ buy.total }}</span>
              <input v-else v-model="buy.total" type="text" />
            </td>
            <td>
              <span v-if="!editStatus">{{ buy.receiptNumber }}</span>
              <input v-else v-model="buy.receiptNumber" type="text" />
            </td>
            <!-- <td>
              <span v-if="!editStatus">{{
                formatDate(buy.expirationDate)
              }}</span>
              <input v-else v-model="buy.expirationDate" type="date" />
            </td> -->
            <td v-if="!editStatus">
              <a @click="changeEditStatus()"><i class="bi bi-pencil"></i></a>
            </td>
            <td v-else>
              <a @click="updateBuy(buy, buy._id)" href="#">
                <i style="color: #149c68" class="bi bi-check-circle-fill"></i>
              </a>
              <a href="#">
                <i
                  style="color: #d02941"
                  @click="changeEditStatus"
                  class="bi bi-x-circle"
                ></i>
              </a>
            </td>
            <td>
              <a @click="deleteBuy(buy._id)"> <i class="bi bi-trash"></i></a>
            </td>
            <td @click="getOneBuy" class="searchIcon">
              <a>
                <i class="bi bi-search"></i>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- REGISTRAR COMPRA -->
    <div v-if="editFormStatus" class="register-component">
      <form action="" class="expenses-form">
        <div class="form-group">
          <h3 style="text-align: center">Nueva compra</h3>
          <p>Proveedor:</p>
          <select v-model="providerId" name="" id="">
            <option
              v-for="(provider, index) in providersArray"
              :key="index"
              :value="provider._id"
            >
              {{ provider.name }}
            </option>
          </select>

          <input
            v-model="data.description"
            type="text"
            placeholder="Decripcion... (opcional)"
          />

          <input
            v-model="data.receiptNumber"
            type="text"
            placeholder="Nro factura... (opcional)"
          />

          <input
            v-model="data.total"
            type="text"
            placeholder="Monto total..."
            @input="formatPriceInput"
          />

          <button @click.prevent="changeFormStatus" class="btn-cancel">
            Cancelar
          </button>
          <button @click.prevent="createManualBuy" class="btn-confirm">
            Confirmar
          </button>
        </div>
      </form>
    </div>

    <!-- REGISTRAR PROVEEDOR -->
    <div v-if="supplierForm" class="register-component">
      <form action="" class="expenses-form">
        <div class="form-group">
          <h3 style="text-align: center">Nuevo proveedor</h3>

       

          <input
            v-model="supplierData.name"
            type="text"
            placeholder="Nombre..."
          />
          

          <input
            v-model="supplierData.email"
            type="email"
            placeholder="Email..."
          />

          <input
            v-model="supplierData.phone"
            type="number"
            placeholder="Telefono..."
          />

          <button @click.prevent="changeSupplierFormStatus" class="btn-cancel">
            Cancelar
          </button>
          <button @click.prevent="createProvider" class="btn-confirm">
            Confirmar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import numeral from "numeral";
import spinner from "@/components/visuals/spinner.vue";

const businessId = localStorage.getItem("businessId");

export default {
  components: {
    spinner,
  },
  data() {
    return {
      buysArray: [],
      editStatus: false,
      editFormStatus: false,
      buy_id: null,
      data: {
        tittle: "",
        // product: "",
        description: "",
        // quantity: "",
        total: "",
        receiptNumber: null,
        // expirationDate: "",
      },
      providersArray: [],
      providerId: null,

      question: "",
      respuesta: "",
      information: [],
      visionDataArray: [],
      supplierForm: false,
      supplierData: {
        name: "",
        email: "",
        phone: "",
      },
      receiptObject: {},
      singleBuyObject: {},
      mostrarFactura: false,
      crearFactura: false,
      valorBase: null,
      porcentaje: null,
      loading: false,
      loadingOcr: false,
    };
  },
  methods: {
    // ********************************************LLAMADAS A LA API**************************************

    async getAllBuys() {
      try {
        const response = await axios.get(
          `http://localhost:3000/business/buys/${businessId}`
        );
        const buys = response.data;
        this.buysArray = buys;
      } catch (error) {
        console.log(error);
      }
    },
    async updateBuy(buy, id) {
      try {
        const formattedExpirationDate = moment
          .utc(buy.expirationDate)
          .add(1, "days")
          .format("YYYY-MM-DD");

        await axios.put(`http://localhost:3000/buys/${id}`, {
          name: buy.name,

          description: buy.description,
          // quantity: buy.quantity,
          total: buy.total,
          receiptNumber: buy.receiptNumber,
          // expirationDate: formattedExpirationDate,
        });

        this.getAllBuys();
        this.changeEditStatus();
      } catch (error) {
        console.log("Error al actualizar");
      }
    },
    async createNewBuy() {
      try {
        const formattedExpirationDate = moment
          .utc(this.data.expirationDate)
          .add(1, "days")
          .format("YYYY-MM-DD");

        const businessId = localStorage.getItem("businessId");
        const totalWhitoutFormat = numeral(this.receiptObject.total).value();

        const newSale = await axios.post("http://localhost:3000/buys", {
          buyer: this.receiptObject.buyer,
          seller: this.receiptObject.from,
          total: totalWhitoutFormat,
          title: this.receiptObject.title,
          description: this.receiptObject.description,
          email: this.receiptObject.email,
          receiptNumber: this.receiptObject.receiptNumber,
          paymentMethod: this.receiptObject.paymentMethod,
          businessId: businessId,
          providerId: this.providerId,
          productsObj: this.receiptObject.products,
        });
        if (newSale) {
          this.$refs.fileInput.value = null;
          this.changeFactura();
          this.getAllBuys();
          this.receiptObject = {};
          this.data.description = "";
          this.data.price = "";
          this.data.receiptNumber = "";
          this.providerId = "";
        } else {
          window.alert(
            "El servicio de inteligencia artificial fallo, sube tu foto nuevamente y reintentalo"
          );
          this.$refs.fileInput.value = null;
          this.changeFactura();
          this.getAllBuys();
          this.receiptObject = {};
          this.data.description = "";
          this.data.price = "";
          this.data.receiptNumber = "";
          this.providerId = "";
        }
      } catch (error) {
        console.log("Error desde el catch", error);
      }
    },
    async createManualBuy() {
      try {
        if(!this.providerId || !this.data.description || !this.data.receiptNumber || !this.data.total){
          window.alert('Todos los campos son obligatorios')
          return
        }
        const response = await axios.post(`http://localhost:3000/buys`, {
          providerId: this.providerId,
          businessId: businessId,
          description: this.data.description,
          receiptNumber: this.data.receiptNumber,
          total: this.data.total,
        });
        if (response.data) {
          window.alert("Factura cargada");
          this.providerId=''
          this.description=''
          this.receiptNumber=null
          this.total=null
          this.getAllBuys();
          this.changeFormStatus();
        }
      } catch (error) {
        window.alert("Error al crear factura");
      }
    },
    async deleteBuy(id) {
      try {
        if (
          window.confirm("¿Estás seguro de que deseas realizar esta acción?")
        ) {
          await axios.delete(`http://localhost:3000/buys/${id}`);
          window.alert("Compra eliminada");
          this.getAllBuys();
        } else {
          window.alert("Accion cancelada");
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getAllProviders() {
      try {
        const response = await axios.get(
          `http://localhost:3000/providers/business/${businessId}`
        );
        const providers = response.data;

        for (const provider of providers) {
          for (const iterator of provider.providers) {
            this.providersArray.push(iterator);
          }
        }
      } catch (error) {
        throw error;
      }
    },
    async createProvider() {
      try {
        const provider = await axios.post("http://localhost:3000/providers", {
          name: this.supplierData.name,
          telephone: this.supplierData.phone,
          email: this.supplierData.email,
          businessId: businessId,
        });
        this.changeSupplierFormStatus();
        this.supplierData.name = "";
        this.supplierData.email = "";
        this.supplierData.phone = "";
      } catch (error) {
        throw error;
      }
    },
    async askGpt() {
      try {
        if(this.question === ''){
          window.alert('Tu pregunta no puede estar vacia')
          return
        }
        this.loading = true;
        this.information = this.buysArray;
        const response = await axios.post(`http://localhost:3000/chat-gpt`, {
          message: this.question,
          info: this.information,
        });
        const data = response.data;

        this.respuesta = data;
        this.loading = false;
      } catch (error) {
        throw error;
      }
    },
    async analizeFile() {
      try {
        const file = this.$refs.fileInput.files[0];
        const formData = new FormData();
        formData.append("file", file);

        if (!file) {
          window.alert("No hay archivo cargado");
          return;
        }
        this.loadingOcr = true;

        const response = await axios.post(
          `http://localhost:3000/chat-gpt/google/ocr`,
          formData
        );

        

        const prompt =
          "Formatealo en JSON y devuelvelo formateado en clave valor como description,date,total,tittle,buyer,seller,email,paymentMethod,from,to,receiptNumbera,products(en products debes poner los productos/servicios por los que se haya pagado, el products debe ser un objeto que contenga cada producto con su 'name','price' 'codebar' y 'cantidad') y lo que consideres relevante crear(si ese campo no tiene elementos, omitelo), siempre devuelvelo sin caracteres especiales, debe volver listo para ser consumido en el front.Devuelve la respuesta como un JSON listo para ser enviado al front end, sin caracteres especiales. No debe tener caracteres especiales, debe ser devuelto listo para ser consumido en el frontend.Siempre devuelve el JSON listo para ser consumido, nunca te olvides de formatearlo, que no tenga caracteres especiales. El json debe estar en el siguiente formato:{'clave':'valor'}.NUNCA LO DEVUELVA AL JSON ENVUELTO EN TEMPLATE STRINGS ";

        const promptExtension =
          "el total debe ser formateado sin decimales, devuelveme el numero redondeado y sin decimales ni signos de dinero.Todos los campos deben estar compuestos de solamente un valor, excepto el products, que si puede tener varios.El title debe ser algo alusivo e identificatorio sobre la factura.El email debe ser el email del vendedor.Si la factura no tiene productos, deja el campo productos vacio.Seller sera el negocio que emite el comprobante, en seller solo debe ir el nombre del negocio que emite.El receipt number debe ser solamente un numero, sin espacios ni caracteres especiales. Dentro de productos, el codigo de barras y la cantidad siempre deben ser numeros enteros, en caso de no serlo, asignalo igual a 0.ES DE SUMA IMPORTANCIA QUE HAGAS TODO COMO SE TE INDICA.";
        const formatTest = await axios.post(
          `http://localhost:3000/chat-gpt/vision/format`,
          {
            message: prompt + promptExtension,
            information: response.data,
          }
        );

        const data = formatTest.data;
        this.receiptObject = data;

        if (!data ) {
          window.alert("Error al analizar factura, intente nuevamente");
          return
        }

        this.loadingOcr = false;

        this.crearFactura = true;
      } catch (error) {
        window.alert('Tuvimos problemas cargando tu factura, prueba de nuevo')
      }
    },
    async getOneBuy() {
      try {
        this.singleBuyObject = {};
        await new Promise((resolve) => setTimeout(resolve, 500));
        const response = await axios.get(
          `http://localhost:3000/buys/${this.buy_id}`
        );
        const data = response.data;
        this.singleBuyObject = data;
        this.buy_id = "";

        // Abre una nueva pestaña y muestra la factura

        this.changeStatusOfFactura();
      } catch (error) {
        throw error;
      }
    },

    // ********************************************----------------**************************************
    formattedResponse() {
      return this.respuesta.split("*").join("*<br/><br/>");
    },
    changeStatusOfFactura() {
      this.mostrarFactura = !this.mostrarFactura;
    },
    changeFactura() {
      this.crearFactura = !this.crearFactura;
    },
    setId(id) {
      this.buy_id = id;
      console.log(this.buy_id);
    },
    formatDate(date) {
      return moment(date).format("DD/MM/YYYY");
    },
    formatPrice(price) {
      return numeral(price).format("$0,0.00");
    },
    formatPriceInput() {
      // Formatear el precio mientras se escribe
      this.data.price = numeral(this.data.price).format("$0,0");
    },
    changeEditStatus() {
      this.editStatus = !this.editStatus;
    },
    changeFormStatus() {
      this.editFormStatus = !this.editFormStatus;
    },
    changeSupplierFormStatus() {
      this.supplierForm = !this.supplierForm;
    },
    openNewTab() {
      const facturaHTML = `
      <div class="receiptContainer">
        <!-- Contenido de la factura -->
        <h4>Datos del Comprobante</h4>
        <p><strong>Fecha:</strong> ${this.formatDate(
          this.singleBuyObject.createdAt
        )}</p>
        <p><strong>Proveedor:</strong> ${this.singleBuyObject.seller}</p>
        <p><strong>Email:</strong> ${this.singleBuyObject.email}</p>
        <p><strong>Numero factura:</strong> ${
          this.singleBuyObject.receiptNumber
        }</p>
        <p><strong>Descripcion:</strong> ${this.singleBuyObject.description}</p>
        <p><strong>Monto Total:</strong> ${this.formatPrice(
          this.singleBuyObject.total
        )}</p>
        <h5>Productos:</h5>
        <table class="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Código de barras</th>
              <th>Cantidad</th>
            </tr>
          </thead>
          <tbody>
            ${this.singleBuyObject.productsObj
              .map(
                (product) => `
              <tr>
                <td>${product.name}</td>
                <td>${this.formatPrice(product.price)}</td>
                <td>${product.codebar}</td>
                <td>${product.cantidad}</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>

      </div>
    `;
      const newTab = window.open();
      newTab.document.write(facturaHTML);
    },
  },
  created() {
    this.getAllBuys(), this.getAllProviders();
  },
  computed: {
    calcularPorcentaje() {
      return this.valorBase * (this.porcentaje / 100);
    },
  },
};
</script>
<style scoped>
.calculadora {
  width: 15%;
}
.searchIcon {
  color: black;
  transition: transform 0.3s ease, background-color 0.3s ease;
}

.searchIcon:hover {
  transform: scale(1.1);
  color: #574f7a;
}

.receiptContainer {
  background-color: white;
  box-shadow: 4px 4px 5px -4px rgba(0, 0, 0, 0.75);
  max-height: 300px;
  width: 80%;
  overflow-y: auto;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid black;
  padding: 10px;
}

.closeButton {
  position: absolute;
  top: 0;
  right: 0;
  padding: 2px;
  cursor: pointer;
  color: white;
  background-color: red;
}
.ocr-container {
  background-color: #ffffff;
  box-shadow: 4px 4px 5px -4px rgba(0, 0, 0, 0.75);
  margin-left: 10px;
  margin-top: 10px;
  margin-right: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
}

.ocr-container button {
  width: 100%;
  border: none;
  border-radius: 0%;
  background-color: #574f7a;
  font-size: 20px;
  font-weight: 500;
  color: white;
}

.buttonCreate {
  width: 20vw;
  border: none;
  border-radius: 0%;
  background-color: #574f7a;
  font-size: 20px;
  font-weight: 500;
  color: white;
}

.table-body input {
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

.top-container {
  margin: 10px;
}

.top-container button {
  border: none;
  background-color: #149c68;
  color: white;
  font-weight: bold;
  transition: transform 0.3s ease;
}

.top-container button:hover {
  transform: scale(1.1); /* Agrandar el botón al 110% de su tamaño original */
}

.table-responsive {
  margin: 10px;
  /* background-color: #1a1a1a; */
  background-color: #ffffff;
  box-shadow: 4px 4px 5px -4px rgba(0, 0, 0, 0.75);
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
  background-color: #ffffff;
  position: absolute;
  top: 10%;
  right: 30%;
  color: black;
}

.form-group {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.expenses-form {
  h3 {
    color: black;
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
    margin: 0;
  }

  .datesDiv input {
    width: 95vw;
  }

  .datesDiv button {
    width: 95vw;
    margin-top: 10px;
  }
  .searchbar-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }

  .searchbar-container input {
    width: 95vw;
    margin-left: 10px;
    border-radius: 0%;
  }

  .searchbar-container button {
    width: 95vw;
    border-radius: 0%;
  }

  .date button {
    margin-left: 10px;
  }
  .expenses-form {
    width: 80%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5px;
    background-color: white;
    position: absolute;
    top: 10%;
    right: 10%;
    color: black;
  }

  .form-group {
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .expenses-form {
    h3 {
      color: black;
    }
  }

  .btn-cancel,
  .btn-confirm {
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    font-size: 16px;
    border-radius: 0%;
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
}
</style>
