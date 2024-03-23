<template>
  <div class="stock-container">
    <!-- BARRA DE BUSQUEDA -->
    <div style="display: flex; justify-content: start; margin-left: 10px">
      <router-link to="/home">
        <i style="font-size: 30px" class="bi bi-arrow-left"></i>
      </router-link>
    </div>
    <div class="searchbar-container"></div>

    <!-- ASISTENTE VIRTUAL -->
    <div class="assistentComponent">
      <h4>Asistente virtual</h4>
      <input
        type="text"
        v-model="question"
        placeholder="Ingresa tu consulta sobre tus proveedores..."
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

    <!-- TABLA DE DATOS -->
    <div class="table-responsive">
      <table class="table table-hover table-nowrap">
        <thead class="thead-light">
          <tr class="tableRow">
            <th scope="col">Nombre</th>
            <th scope="col">Email</th>
            <th scope="col">Teléfono</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody class="table-body">
          <!--****************************** TODOS LOS CLIENTES************************************ -->
          <tr
            @click="setId(client._id)"
            v-for="(client, index) in clientsArray"
            :key="index"
            v-if="foundClient"
          >
            <td>
              <span >{{ client.name }}</span>
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
                      encodeURIComponent(client.telephone) +
                      '&text=Hola!'
                    "
                    target="_blank"
                    >{{ client.telephone }}</a
                  >
                </td>
              </span>
            
            </td>
          

            <td >
              <a @click="getProviderData(client._id)"><i class="bi bi-pencil"></i></a>
              <a
                style="margin-left: 20px"
                @click.prevent="deleteClient(client._id)"
              >
                <i class="bi bi-trash"></i
              ></a>
              <a style="margin-left: 20px">
                <i class="bi bi-search" @click="changeStatusOfDetails"></i
              ></a>
            </td>
          
          </tr>
        </tbody>
      </table>
    </div>

     <!-- ACTUALIZAR PROVEEDOR -->
     <div v-if="editForm" class="register-component">
      <form action="" class="expenses-form">
        <div class="form-group">
          <h3 style="text-align: center">Actualizar proveedor</h3>

          <input
            type="text"
            placeholder="Nombre..."
            v-model="this.data.name"
          />

          <input
            type="email"
            placeholder="Email..."
            v-model="this.data.email"
          />

          <input
            type="number"
            placeholder="Telefono..."
            v-model="this.data.phoneNumber"
          />

          <button @click.prevent="changeEditForm" class="btn-cancel">
            Cancelar
          </button>
          <button @click.prevent="updateClient" class="btn-confirm">
            Confirmar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import numeral from "numeral";
import axios from "axios";
import askHomeComponentVue from "../home/askHomeComponent.vue";
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
      editForm:false
    };
  },
  methods: {
    // *****************************************LLAMADAS A LA API*******************************
    async getAllClients() {
      try {
        const businessId = localStorage.getItem("businessId");

        const result = await axios.get(
          `https://api-gestion-ahil.onrender.com/providers/business/${businessId}`
        );
        const sales = result.data;
        this.clientsArray = sales;
        
        // for (const item of this.clientsArray) {
        //   for (const iterator of item.providers) {
        //     this.clientsArray.push(iterator);
        //   }
        // }
        for (const iterator of this.clientsArray[0].providers) {
          this.clientsArray.push(iterator)
        }
      } catch (error) {
        console.log(error);
      }
    },
    async updateClient() {
      try {
        await axios.put(`https://api-gestion-ahil.onrender.com/providers/${this.client_id}`, {
          name: this.data.name,
          email: this.data.email,
          telephone: this.data.phoneNumber,
        });

        this.data.name=''
        this.data.email=''
        this.data.phoneNumber=''

        this.getAllClients();
        this.changeEditForm()
      } catch (error) {
        console.log("Error al actualizar",error);
      }
    },
    async deleteClient(id) {
      try {
        if (
          window.confirm("¿Estás seguro de que deseas realizar esta acción?")
        ) {
          await axios.delete(`https://api-gestion-ahil.onrender.com/providers/${id}`);
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

          setTimeout(() => {
            this.changeStatusOfForm();
          }, 0);
        }
      } catch (error) {
        console.log("Error: ", error);
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

        const response = await axios.post(`https://api-gestion-ahil.onrender.com/chat-gpt`, {
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
    async getProviderData(id){
      try {
        this.changeEditForm()
        const response=await axios.get(`https://api-gestion-ahil.onrender.com/providers/${id}`)
        const data=response.data
        this.data.name=data.name
        this.data.email=data.email
        this.data.phoneNumber=data.telephone

      } catch (error) {
        window.alert('Error al acceder al proveedor')
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
    changeEditForm() {
      this.editorStatus = !this.editorStatus;
    },
    changeStatusOfForm() {
      this.formStatus = !this.formStatus;
      console.log("Formulario abierto/cerrado");
    },
  
    changeStatusOfDetails() {
      this.showMessageBox = !this.showMessageBox;
    },
    changeEditForm(){
      this.editForm=!this.editForm
    }
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
