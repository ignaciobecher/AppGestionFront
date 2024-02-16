<template>
  <div class="stock-container">
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
      <div class="date"></div>
    </div>

    <div class="table-responsive">
      <table class="table table-hover table-nowrap">
        <thead class="thead-light">
          <tr class="tableRow">
            <th scope="col">Nombre</th>
            <th scope="col">Dirección</th>
            <th scope="col">Email</th>
            <th scope="col">Teléfono</th>
            <th scope="col">Deuda</th>
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
              <span v-if="!editorStatus">{{ client.name }}</span>
              <input name="name" v-else type="text" v-model="client.name" />
            </td>

            <td>
              <span v-if="!editorStatus">{{ client.address }}</span>
              <input
                name="description"
                v-else
                type="text"
                v-model="client.address"
              />
            </td>
            <td>
              <span v-if="!editorStatus">{{ client.email }}</span>
              <input
                name="description"
                v-else
                type="text"
                v-model="client.email"
              />
            </td>

            <td>
              <span v-if="!editorStatus">{{ client.phoneNumber }}</span>
              <input
                name="description"
                v-else
                type="text"
                v-model="client.phoneNumber"
              />
            </td>
            <td>
              <span v-if="!editorStatus">{{ formatPrice(client.debt) }}</span>
              <input
                name="description"
                v-else
                type="text"
                v-model="client.debt"
              />
            </td>
            <td v-if="!editorStatus">
              <a @click="changeStatusOfEditor"><i class="bi bi-pencil"></i></a>
            </td>
            <td v-else>
              <a @click.prevent="updateClient(client, client._id)" href="#">
                <i style="color: #149c68" class="bi bi-check-circle-fill"></i>
              </a>
              <a href="#" @click="changeStatusOfEditor">
                <i style="color: #d02941" class="bi bi-x-circle"></i>
              </a>
            </td>
            <td>
              <a @click.prevent="deleteClient(client._id)">
                <i class="bi bi-trash"></i
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
              <span v-if="!editorStatus">{{ client.name }}</span>
              <input name="name" v-else type="text" v-model="client.name" />
            </td>

            <td>
              <span v-if="!editorStatus">{{ client.address }}</span>
              <input
                name="description"
                v-else
                type="text"
                v-model="client.address"
              />
            </td>
            <td>
              <span v-if="!editorStatus">{{ client.email }}</span>
              <input
                name="description"
                v-else
                type="text"
                v-model="client.email"
              />
            </td>

            <td>
              <span v-if="!editorStatus">{{ client.phoneNumber }}</span>
              <input
                name="description"
                v-else
                type="text"
                v-model="client.phoneNumber"
              />
            </td>
            <td>
              <span v-if="!editorStatus">{{ formatPrice(client.debt) }}</span>
              <input
                name="description"
                v-else
                type="text"
                v-model="client.debt"
              />
            </td>

            <td v-if="!editorStatus">
              <a @click="changeStatusOfEditor"><i class="bi bi-pencil"></i></a>
            </td>
            <td v-else>
              <a @click.prevent="updateClient(client, client._id)" href="#">
                <i style="color: #149c68" class="bi bi-check-circle-fill"></i>
              </a>
              <a href="#" @click="changeStatusOfEditor">
                <i style="color: #d02941" class="bi bi-x-circle"></i>
              </a>
            </td>
            <td>
              <a @click.prevent="deleteClient(client._id)">
                <i class="bi bi-trash"></i
              ></a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

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
  </div>
</template>

<script>
import moment from "moment";
import numeral from "numeral";
import axios from "axios";

export default {
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
    };
  },
  methods: {
    // *****************************************LLAMADAS A LA API*******************************
    async getAllClients() {
      try {
        const result = await axios.get(
          "http://localhost:3000/business/clients/65bfdff8a75ffb8fb6be8937"
        );
        const sales = result.data;
        this.clientsArray = sales;
        console.log(this.clientsArray);
      } catch (error) {
        console.log(error);
      }
    },
    async updateClient(client, id) {
      try {
        await axios.put(`http://localhost:3000/clients/${id}`, {
          name: client.name,
          address: client.address,
          email: client.email,
          phoneNumber: client.phoneNumber,
          debt: client.debt,
        });

        this.getAllClients();
        this.changeStatusOfEditor();
      } catch (error) {
        console.log("Error al actualizar");
      }
    },
    async deleteClient(id) {
      try {
        if (
          window.confirm("¿Estás seguro de que deseas realizar esta acción?")
        ) {
          await axios.delete(`http://localhost:3000/clients/${id}`);
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
          const newProduct = await axios.post("http://localhost:3000/clients", {
            name: this.data.name,
            address: this.data.address,
            phoneNumber: this.data.phoneNumber,
            email: this.data.email,
            debt: this.data.debt,
            businessId: "65bfdff8a75ffb8fb6be8937",
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
        const client = await axios.get(
          `http://localhost:3000/clients/search/65bfdff8a75ffb8fb6be8937/${clientName}`
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

    // *****************************************************************************************
    formatPrice(price) {
      return numeral(price).format("$0,0.00");
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
      this.formStatus = !this.formStatus;
      console.log("Formulario abierto/cerrado");
    },
    checkInput() {
      if (this.clientName === "") {
        this.foundClient = true;
      }
    },
  },
  mounted() {
    this.getAllClients();
  },
};
</script>

<style scoped>
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
  border: 1px solid #574f7a;
  padding: 10px;
}

.table-responsive {
  margin: 10px;
  /* background-color: #1a1a1a; */
  background-color: #FFFFFF;
  box-shadow: 4px 4px 5px -4px rgba(0, 0, 0, 0.75);
  border-radius: 15px;
  padding: 5px;
}

.tableRow th {
  background-color: #FFFFFF;
  color: black;
}

.tableRow td {
  background-color: #FFFFFF;
  color: black;
}

.table-body td {
  background-color: #FFFFFF;
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
</style>
