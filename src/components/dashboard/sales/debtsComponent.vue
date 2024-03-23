<template>
  <div class="stock-container">
    <!-- BARRA DE BUSQUEDA -->
    <div class="searchbar-container">
      <p>Buscar cliente:</p>
      <input
        @input="checkInput"
        v-model="clientName"
        type="search"
        @keyup.enter="searchClient(clientName)"
        name=""
        placeholder="Buscar cliente..."
        id=""
      />
      <div class="top-container">
        <button @click.prevent="changeStatusOfForm">
          Registrar nuevo cliente
        </button>
      </div>
    </div>

    <!-- ASISTENTE VIRTUAL -->
    <div class="assistentComponent">
      <h4>Asistente virtual</h4>
      <input
        type="text"
        v-model="question"
        placeholder="Ingresa tu consulta sobre tus cuentas corrientes..."
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

    <!-- TABLA DE DATOS -->
    <div class="table-responsive">
      <table class="table table-hover table-nowrap">
        <thead class="thead-light">
          <tr class="tableRow">
            <th scope="col">Nombre</th>
            <th scope="col">Dirección</th>
            <th scope="col">Email</th>
            <th scope="col">Teléfono</th>
            <th scope="col">Deuda</th>
            <th scope="col">
              <button @click="changeStatusOfPayment" class="registerBtn">
                Registrar pago
              </button>
            </th>
          </tr>
        </thead>
        <tbody class="table-body">
          <!-- *************************SI SE BUSCA UN CLIENTE****************************** -->
          <tr
            v-if="!foundClient"
            v-for="(client, index) in searchedClients"
            :key="index"
          >
            <td>
              <span>{{ client.name }}</span>
            </td>

            <td>
              <span>{{ client.address }}</span>
            </td>
            <td>
              <span>{{ client.email }}</span>
            </td>

            <td>
              <span>
                <a
                  :href="
                    'https://api.whatsapp.com/send?phone=' +
                    encodeURIComponent(client.phoneNumber) +
                    '&text=Hola!'
                  "
                  target="_blank"
                  >{{ client.phoneNumber }}</a
                ></span
              >
            </td>
            <td>
              <span>{{ formatPrice(client.debt) }}</span>
            </td>
            <td>
              <a @click="changeStatusOfEditor"><i class="bi bi-pencil"></i></a>
              <a
                style="margin-left: 20px"
                @click.prevent="deleteClient(client._id)"
              >
                <i class="bi bi-trash"></i
              ></a>
              <a style="margin-left: 20px">
                <i class="bi bi-search" @click="getClientById(client._id)"></i
              ></a>
            </td>
          </tr>

          <!--****************************** TODOS LOS CLIENTES************************************ -->
          <tr
            @click="setId(client._id)"
            v-for="(client, index) in clientsArray"
            :key="index"
            v-if="foundClient"
          >
            <td>
              <span>{{ client.name }}</span>
            </td>

            <td>
              <span>{{ client.address }}</span>
            </td>
            <td>
              <span>{{ client.email }}</span>
            </td>

            <td>
              <span
                ><td>
                  <a
                    :href="
                      'https://api.whatsapp.com/send?phone=' +
                      encodeURIComponent(client.phoneNumber) +
                      '&text=Hola!'
                    "
                    target="_blank"
                    >{{ client.phoneNumber }}</a
                  >
                </td>
              </span>
            </td>
            <td>
              <span>{{ formatPrice(client.debt) }}</span>
            </td>

            <td>
              <a @click="getDataToUpdate(client._id)"
                ><i class="bi bi-pencil"></i
              ></a>
              <a
                style="margin-left: 20px"
                @click.prevent="deleteClient(client._id)"
              >
                <i class="bi bi-trash"></i
              ></a>
              <a style="margin-left: 20px">
                <i class="bi bi-search" @click="getClientById(client._id)"></i
              ></a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- REGISTRAR NUEVO CLIENTE -->
    <div v-if="formStatus" class="register-component">
      <div class="expenses-form">
        <div class="form-group">
          <h3 style="text-align: center">Nuevo cliente</h3>
          <input v-model="data.name" type="text" placeholder="Nombre..." />

          <input
            v-model="data.address"
            type="text"
            placeholder="Direccion..."
          />

          <input v-model="data.email" type="text" placeholder="Email..." />

          <input
            v-model="data.phoneNumber"
            type="text"
            placeholder="Telefono..."
          />

          <input
            v-model="data.debt"
            type="text"
            placeholder="Deuda... (opcional)"
            @input="formatPriceInput"
          />
          <button @click="changeStatusOfForm" class="btn-cancel">
            Cancelar
          </button>
          <button @click="createNewClient" class="btn-confirm">
            Confirmar
          </button>
        </div>
      </div>
    </div>

    <!-- ACTUALIZAR CLIENTE  -->
    <div v-if="editFormStatus" class="register-component">
      <div class="expenses-form">
        <div class="form-group">
          <h3 style="text-align: center">Actualizar cliente</h3>
          <input v-model="data.name" type="text" placeholder="Nombre..." />

          <input
            v-model="data.address"
            type="text"
            placeholder="Direccion..."
          />

          <input v-model="data.email" type="text" placeholder="Email..." />

          <input
            v-model="data.phoneNumber"
            type="text"
            placeholder="Telefono..."
          />

          <input
            v-model="data.debt"
            type="text"
            placeholder="Deuda... (opcional)"
            @input="formatPriceInput"
          />
          <button @click="changeEditFormStatus" class="btn-cancel">
            Cancelar
          </button>
          <button @click="updateClient(this.client_id)" class="btn-confirm">
            Confirmar
          </button>
        </div>
      </div>
    </div>

    <!-- REGISTRAR NUEVO PAGO -->
    <div v-if="paymentStatus" class="register-component">
      <div class="expenses-form">
        <div class="form-group">
          <h3 style="text-align: center">Registrar pago</h3>
          <select v-model="clientId">
            <option>Seleccionar cliente</option>
            <option
              v-for="(client, index) in clientsArray"
              :key="index"
              :value="client._id"
            >
              {{ client.name }}
            </option>
          </select>

          <input
            v-model="paymentsData.paymentsDescription"
            type="text"
            placeholder="Descripcion..."
          />

          <input
            v-model="paymentsData.payments"
            type="number"
            placeholder="Monto..."
          />

          <button @click="changeStatusOfPayment" class="btn-cancel">
            Cancelar
          </button>
          <button @click="registerPayment()" class="btn-confirm">
            Confirmar
          </button>
        </div>
      </div>
    </div>

    <!-- *****************************DETALLE DE PAGOS**************************************************** -->

    <div v-if="showMessageBox" class="message-box">
      <div class="close-btn">
        <i
          style="color: red"
          class="bi bi-x-circle-fill"
          @click="changeStatusOfDetails"
        ></i>
      </div>
      <h4>Pagos del cliente</h4>
      <div class="table-responsive">
        <table class="table table-hover table-nowrap">
          <thead class="thead-light">
            <tr class="tableRow">
              <th scope="col">Referencia</th>
              <th scope="col">Monto</th>
            </tr>
          </thead>
          <tbody>
            <!-- <tr
              v-for="(payment, index) in globalPaymentsArray.payments"
              :key="index"
              class="table-body"
            >
              <td scope="col">${{ payment === null ? 'No se cargo monto' : payment }}</td>
              <td scope="col">
                {{ globalPaymentsArray.paymentsDescription[index] ==='' ? 'No hay datos' :globalPaymentsArray.paymentsDescription[index] }}
              </td>
            </tr> -->
            <tr
              class="table-body"
              v-for="(payment, index) in paymentsIndArray.payments"
              :key="index"
            >
              <td scope="col">
                {{ paymentsIndArray.paymentsDescription[index] }}
              </td>
              <td scope="col">{{ formatPrice(payment) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
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
      clientsArray: [],
      client_id: null,
      editorStatus: false,
      formStatus: false,
      editFormStatus: false,
      data: {
        name: "",
        address: "",
        email: "",
        phoneNumber: "",
        debt: "",
      },
      clientName: "",
      selectedClient: {},
      foundClient: true,
      searchedClients: [],
      question: "",
      respuesta: "",
      information: [],
      paymentStatus: false,
      paymentsData: {
        payments: null,
        paymentsDescription: "",
      },
      clientId: null,
      showMessageBox: false,
      globalPaymentsArray: [],
      globalDescriptionsArray: {},
      loading: false,
      paymentsIndArray: [],
      showPrint: false,
    };
  },
  methods: {
    // *****************************************LLAMADAS A LA API*******************************
    async getAllClients() {
      try {
        const businessId = localStorage.getItem("businessId");

        const result = await axios.get(
          `https://api-gestion-ahil.onrender.com/business/clients/${businessId}`
        );
        const sales = result.data;
        this.clientsArray = sales;

        const paymentsArray = [];
        for (const client of this.clientsArray) {
          for (const item of client.payments) {
            paymentsArray.push(item);
          }
        }

        const workingDescriptions = [];
        for (const client of this.clientsArray) {
          for (const item of client.paymentsDescription) {
            workingDescriptions.push(item);
          }
        }
        this.globalPaymentsArray.payments = paymentsArray;
        this.globalPaymentsArray.paymentsDescription = workingDescriptions;
        console.log(this.globalPaymentsArray);
      } catch (error) {
        console.log(error);
      }
    },
    async updateClient(id) {
      try {
        const debtFormated = numeral(this.data.debt).value();

        await axios.put(`https://api-gestion-ahil.onrender.com/clients/${id}`, {
          name: this.data.name,
          address: this.data.address,
          email: this.data.email,
          phoneNumber: this.data.phoneNumber,
          debt: debtFormated,
        });

        this.data.name = "";
        this.data.address = "";
        this.data.phoneNumber = "";
        this.data.email = "";
        this.data.debt = "";
        this.getAllClients();
        this.changeEditFormStatus();
      } catch (error) {
        console.log("Error al actualizar");
      }
    },
    async deleteClient(id) {
      try {
        if (
          window.confirm("¿Estás seguro de que deseas realizar esta acción?")
        ) {
          await axios.delete(`https://api-gestion-ahil.onrender.com/clients/${id}`);
          window.alert("Cliente eliminado");
          this.getAllClients();
        } else {
          window.alert("Accion cancelada");
        }
      } catch (error) {
        console.log(error);
      }
    },
    async createNewClient() {
      try {
        if (!this.data.name) {
          window.alert("Los campos no deben estar vacíos");
        } else {
          const debtFormated = numeral(this.data.debt).value();
          const businessId = localStorage.getItem("businessId");

          const newProduct = await axios.post("https://api-gestion-ahil.onrender.com/clients", {
            name: this.data.name,
            address: this.data.address,
            phoneNumber: this.data.phoneNumber,
            email: this.data.email,
            debt: debtFormated,
            businessId: businessId,
          });
          this.data.name = "";
          this.data.address = "";
          this.data.phoneNumber = "";
          this.data.email = "";
          this.data.debt = "";
          this.getAllClients();

          this.changeStatusOfForm();
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    },
    async getClientById(id) {
      try {
        this.paymentsIndArray = [];
        this.changeStatusOfDetails();
        const response = await axios.get(
          `https://api-gestion-ahil.onrender.com/clients/searcher/${id}`
        );
        const data = response.data;
        this.paymentsIndArray = data;
      } catch (error) {
        throw error;
      }
    },
    async searchClient(clientName) {
      try {
        const businessId = localStorage.getItem("businessId");

        const client = await axios.get(
          `https://api-gestion-ahil.onrender.com/clients/search/${businessId}/${clientName}`
        );
        const clienteEncontrado = client.data;

        this.searchedClients = clienteEncontrado;
        console.log("Producto encontrado", this.searchedClients);

        if (clienteEncontrado) {
          this.searchedClients = clienteEncontrado;
          this.foundClient = false;
          console.log("Un solo cliente: ", this.foundClient);
        } else {
          this.searchedClients = [];
          this.foundClient = false;
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    },
    async askGpt() {
      try {
        if (this.question === "") {
          window.alert("Tu pregunta no puede estar vacia");
          return;
        }
        this.loading = true;
        this.information = this.clientsArray;
        console.log("Pregunta: ", this.question);
        console.log("Informacion: ", this.information);

        const response = await axios.post(`https://api-gestion-ahil.onrender.com/chat-gpt`, {
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
    async registerPayment() {
      try {
        console.log(this.clientId);
        const res = await axios.post(
          `https://api-gestion-ahil.onrender.com/clients/register/payment/${this.clientId}`,
          {
            payments: this.paymentsData.payments,
            paymentsDescription: this.paymentsData.paymentsDescription,
          }
        );

        this.changeStatusOfPayment();
        this.getAllClients();
        this.paymentsData.payments = null;
        this.paymentsData.paymentsDescription = "";
      } catch (error) {
        throw error;
      }
    },
    async getDataToUpdate(id) {
      try {
        const response = await axios.get(
          `https://api-gestion-ahil.onrender.com/clients/searcher/${id}`
        );
        const user = response.data;

        this.changeEditFormStatus();

        this.data.name = user.name;
        this.data.address = user.address;
        this.data.phoneNumber = user.phoneNumber;
        this.data.email = user.email;
        this.data.debt = user.debt;
      } catch (error) {
        window.alert("Error al tratar de actualizar");
      }
    },
    // *****************************************************************************************
    formattedResponse() {
      return this.respuesta.split("*").join("*<br/><br/>");
    },
    formatPrice(price) {
      return numeral(price).format("$0,0.00");
    },
    formatPriceInput() {
      // Formatear el precio mientras se escribe
      this.data.debt = numeral(this.data.debt).format("$0,0");
    },
    formatDate(date) {
      return moment(date).format("DD/MM/YYYY");
    },
    checkInput() {
      if (this.clientName === "") {
        this.foundClient = true;
      }
    },
    setId(id) {
      this.client_id = id;
      console.log(this.client_id);
    },
    changeStatusOfEditor() {
      this.editorStatus = !this.editorStatus;
    },
    changeStatusOfForm() {
      this.data.name = "";
      this.data.address = "";
      this.data.phoneNumber = "";
      this.data.email = "";
      this.data.debt = "";
      this.formStatus = !this.formStatus;
    },
    checkInput() {
      if (this.clientName === "") {
        this.foundClient = true;
      }
    },
    changeStatusOfPayment() {
      this.paymentStatus = !this.paymentStatus;
    },
    changeStatusOfDetails() {
      this.showMessageBox = !this.showMessageBox;
    },
    changeEditFormStatus() {
      this.editFormStatus = !this.editFormStatus;
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
    this.getAllClients();
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
  width: 400px;
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
.registerBtn {
  border: none;
  background-color: #574f7a;
  color: white;
  font-weight: 500;
  padding: 5px;
  transition: transform 0.3s ease;
}

.registerBtn:hover {
  transform: scale(1.1);
}

.top-container button {
  margin: 10px;
  padding: 10px;
  border: none;
  color: white;
  background-color: #574f7a;
  box-shadow: 4px 4px 5px -4px rgba(0, 0, 0, 0.75);
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
  margin-left: 10px; /* Ajustar márgenes si es necesario */
  width: 50%;
  border: 1px solid #574f7a;
  padding: 10px;
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
select {
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 16px;
  margin-bottom: 5px;

  width: 100%;
}

/* //RESPONSIVE PARA TELEFONO-****************************************************************** */
@media screen and (max-width: 768px) {
  .searchbar-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }

  .searchbar-container input {
    width: 95vw;
  }

  .searchbar-container button {
    width: 95vw;
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