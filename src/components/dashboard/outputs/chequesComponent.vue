<template>
  <div class="buysContainer">
    <h1>Cheques</h1>

    <div class="searchbar-container">
      <p>Buscar cheque:</p>
      <input
        @input="checkInput"
        v-model="inputName"
        type="search"
        name=""
        @keyup.enter="getInputsByName"
        placeholder="Buscar cheque segun identificacion..."
        id=""
      />

      <div class="top-container">
        <button @click.prevent="changeFormStatus">
          Registrar nuevo cheque
        </button>
      </div>
      <div class="date"></div>
    </div>
    <div class="datesDiv">
      <label for="startDate">Fecha de inicio:</label>
      <input type="date" id="startDate" v-model="startDate" />

      <label for="endDate">Fecha de fin:</label>
      <input type="date" id="endDate" v-model="endDate" />

      <button @click="getFilteredCheques">Obtener cheques filtrados</button>
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
        placeholder="Ingresa tu consulta sobre los egresos..."
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

    <div class="table-responsive">
      <table class="table table-hover table-nowrap">
        <thead class="thead-light">
          <tr class="tableRow">
            <th scope="col">Fecha de creación</th>
            <th scope="col">Identificación</th>
            <th scope="col">Descripción</th>
            <th scope="col">N° cheque</th>
            <th scope="col">Fecha de cobro</th>
            <th scope="col">Propio/Tercero</th>
            <th scope="col">Total</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody v-if="foundInput === false" class="table-body">
          <!-- CHEQUES FILTRADOS -->
          <tr
            @click="setId(cheque._id)"
            v-for="cheque in filteredCheques"
            class="tableRow"
            v-if="filteredCheques.length > 0"
          >
            <td>
              <span>{{ formatDate(cheque.createdAt) }}</span>
            </td>
            <td>
              <span >{{ cheque.identification }}</span>
            </td>

            <td>
              <span >{{ cheque.description }}</span>
            </td>

            <td>
              <span >{{ cheque.chequeNumber }}</span>
            </td>
            <td>
              <span >{{
                formatDate(cheque.chequeDate)
              }}</span>
            </td>

            <td>
              <span >{{ cheque.chequeOwner }}</span>
            </td>

            <td>
              <span >{{ formatPrice(cheque.total) }}</span>
            </td>

            <td >
              <a @click="getChequeData(cheque._id)"><i class="bi bi-pencil"></i></a>
            </td>
           
            <td>
              <a @click="deleteCheque(cheque._id)">
                <i class="bi bi-trash"></i
              ></a>
            </td>
          </tr>
          <!-- TODOS LOS CHEQUES -->
          <tr
            @click="setId(cheque._id)"
            v-for="(cheque, index) in chequesArray"
            :key="index"
            class="tableRow"
            v-else
          >
            <td>
              <span>{{ formatDate(cheque.createdAt) }}</span>
            </td>
            <td>
              <span >{{ cheque.identification }}</span>
            </td>

            <td>
              <span >{{ cheque.description }}</span>
            </td>

            <td>
              <span >{{ cheque.chequeNumber }}</span>
            </td>
            <td>
              <span >{{
                formatDate(cheque.chequeDate)
              }}</span>
            </td>

            <td>
              <span >{{ cheque.chequeOwner }}</span>
             
            </td>

            <td>
              <span >{{ formatPrice(cheque.total) }}</span>
            </td>

            <td >
              <a @click="getChequeData(cheque._id)"><i class="bi bi-pencil"></i></a>
            </td>
            
            <td>
              <a @click="deleteCheque(cheque._id)">
                <i class="bi bi-trash"></i
              ></a>
            </td>
          </tr>
        </tbody>

        <tbody v-if="foundInput === true" class="table-body">
          <!-- TODOS LOS CHEQUES -->
          <tr
            @click="setId(cheque._id)"
            v-for="(cheque, index) in filteredClients"
            :key="index"
            class="tableRow"
          >
            <td>
              <span>{{ formatDate(cheque.createdAt) }}</span>
            </td>
            <td>
              <span >{{ cheque.identification }}</span>
            </td>

            <td>
              <span >{{ cheque.description }}</span>
            </td>

            <td>
              <span >{{ cheque.chequeNumber }}</span>
            </td>
            <td>
              <span >{{
                formatDate(cheque.chequeDate)
              }}</span>
            </td>

            <td>
              <span >{{ cheque.chequeOwner }}</span>
             
            </td>

            <td>
              <span >{{ formatPrice(cheque.total) }}</span>
            </td>

            <td >
              <a @click="changeEditForm()"><i class="bi bi-pencil"></i></a>
            </td>
            
            <td>
              <a @click="deleteCheque(cheque._id)">
                <i class="bi bi-trash"></i
              ></a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="editFormStatus" class="register-component">
      <form action="" class="expenses-form">
        <div class="form-group">
          <h3 style="text-align: center">Nuevo cheque</h3>

          <input
            v-model="data.identification"
            type="text"
            placeholder="Identificacion..."
          />

          <select v-model="chequeOwner" name="" id="">
            <option value="Propio">Propio</option>
            <option value="Tercero">Tercero</option>
          </select>

          <input
            v-model="data.description"
            type="text"
            placeholder="Descripcion..."
          />

          <input
            v-model="data.chequeNumber"
            type="number"
            placeholder="N° cheque..."
          />

          <input
            v-model="data.total"
            type="text"
            placeholder="Monto..."
            @input="formatPriceInput"
          />

          <input v-model="data.chequeDate" type="date" placeholder="Fecha..." />

          <button @click.prevent="changeFormStatus" class="btn-cancel">
            Cancelar
          </button>
          <button @click.prevent="createNewCheque" class="btn-confirm">
            Confirmar
          </button>
        </div>
      </form>
    </div>

    <div v-if="formStatus" class="register-component">
      <form action="" class="expenses-form">
        <div class="form-group">
          <h3 style="text-align: center">Actualizar cheque</h3>

          <input
            v-model="data.identification"
            type="text"
            placeholder="Identificacion..."
          />

          <select v-model="chequeOwner" name="" id="">
            <option value="Propio">Propio</option>
            <option value="Tercero">Tercero</option>
          </select>

          <input
            v-model="data.description"
            type="text"
            placeholder="Descripcion..."
          />

          <input
            v-model="data.chequeNumber"
            type="number"
            placeholder="N° cheque..."
          />

          <input
            v-model="data.total"
            type="text"
            placeholder="Monto..."
            @input="formatPriceInput"
          />

          <input v-model="data.chequeDate" type="date" placeholder="Fecha..." />

          <button @click.prevent="changeEditForm" class="btn-cancel">
            Cancelar
          </button>
          <button @click.prevent="updateCheque" class="btn-confirm">
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
      chequesArray: [],
      editStatus: false,
      editFormStatus: false,
      cheque_id: null,
      data: {
        identification: "",
        description: "",
        chequeNumber: "",
        total: "",
        chequeDate: Date,
      },
      chequeOwner: "Propio",
      chequeId: null,
      startDate: "",
      endDate: "",
      filteredCheques: [],
      question: "",
      respuesta: "",
      information: [],
      inputName: "",
      foundInput: false,
      filteredClients: [],
      loading: false,
      formStatus:false
    };
  },
  methods: {
    // ********************************************LLAMADAS A LA API**************************************
    async getAllCheques() {
      try {
        const response = await axios.get(
          `http://localhost:3000/cheques/${businessId}`
        );
        const cheques = response.data;
        this.chequesArray = cheques;
        console.log(cheques);
      } catch (error) {
        console.log(error);
      }
    },
    async updateCheque() {
      try {
        const fechaCheque = moment(this.data.chequeDate);
        const nuevaFecha = fechaCheque.add(1, "day");
        const formatedDate = nuevaFecha.format("YYYY-MM-DD");
        const formatedTotal=numeral(this.data.total).value()
        await axios.put(`http://localhost:3000/cheques/${this.cheque_id}`, {
          identification: this.data.identification,
          description: this.data.description,
          chequeNumber: this.data.chequeNumber,
          total: formatedTotal,
          chequeDate: formatedDate,
          chequeOwner: this.data.chequeOwner,
        });

        this.data.identification=''
        this.data.description=''
        this.data.chequeNumber=''
        this.data.total=''
        this.data.chequeOwner='Propio'

        this.getAllCheques();
        this.changeEditForm();
      } catch (error) {
        console.log("Error al actualizar",error);
      }
    },
    async createNewCheque() {
      try {
        const totalWhitoutFormat = numeral(this.data.total).value();
        const fechaCheque = moment(this.data.chequeDate);
        const nuevaFecha = fechaCheque.add(1, "day");
        let formatedDate = nuevaFecha.format("YYYY-MM-DD");

          if (formatedDate === "Invalid date") {
            console.log("Problema de fecha");
            const date = new Date();
            const day = date.getDate();
            const month = date.getMonth() + 1; // Se suma 1 porque los meses comienzan desde 0
            const year = date.getFullYear();
            formatedDate = `${year}-${month}-${day}`;
          }

        const newCheque = await axios.post("http://localhost:3000/cheques", {
          identification: this.data.identification,
          description: this.data.description,
          chequeNumber: this.data.chequeNumber,
          total: totalWhitoutFormat,
          chequeDate: formatedDate,
          businessId: businessId,
          chequeOwner: this.chequeOwner,
        });
        if (newCheque) {
          console.log("Cheque cargado con exito", newCheque);
          this.changeFormStatus();
          this.getAllCheques();
          this.data.description = "";
          this.data.identification = "";
          this.data.chequeNumber = 0;
          this.data.chequeDate=null
          this.total = 0;
        } else {
          console.log("Error al cargar cheque");
        }
      } catch (error) {
        console.log("Error desde el catch", error);
      }
    },
    async deleteCheque(id) {
      try {
        if (
          window.confirm("¿Estás seguro de que deseas realizar esta acción?")
        ) {
          await axios.delete(`http://localhost:3000/cheques/${id}`);
          window.alert("Cheque eliminado");
          this.getAllCheques();
        } else {
          window.alert("Accion cancelada");
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getFilteredCheques() {
      try {
        const businessId = localStorage.getItem("businessId");
        const res = await axios.get(
          `http://localhost:3000/cheques/getByDay/${businessId}/${this.startDate}/${this.endDate}`
        );
        const cheques = res.data;
        this.filteredCheques = cheques;
      } catch (error) {}
    },
    async askGpt() {
      try {
        if (this.question === "") {
          window.alert("Tu pregunta no puede estar vacia");
          return;
        }
        this.loading = true;
        this.information = this.chequesArray;
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
    async getInputsByName() {
      try {
        const response = await axios.get(
          `http://localhost:3000/cheques/search/${businessId}/${this.inputName}`
        );
        const data = response.data;
        this.filteredClients = [];
        for (const cheque of data) {
          this.filteredClients.push(cheque);
        }

        if (data && data.length > 0) {
          this.foundInput = true;
        }
      } catch (error) {
        throw error;
      }
    },
    async getChequeData(id){
      try {
        this.changeEditForm()
        const response=await axios.get(`http://localhost:3000/cheques/search/${id}`)
        const data=response.data

        this.data.identification=data.identification
        this.data.description=data.description
        this.data.chequeNumber=data.chequeNumber
        this.data.total=data.total
        this.data.chequeOwner=data.chequeOwner

      } catch (error) {
        window.alert('Error al acceder al cheque')
      }
    },
    // ********************************************----------------**************************************
    formattedResponse() {
      return this.respuesta.split("*").join("*<br/><br/>");
    },
    setId(id) {
      this.cheque_id = id;
    },

    checkInput() {
      if (this.inputName === "") {
        this.foundInput = false;
      }
    },
    clearFilters() {
      this.startDate = "";
      this.endDate = "";
      this.filteredCheques.length = 0;
      this.getAllCheques();
    },
    formatDate(date) {
      return moment(date).format("DD/MM/YYYY");
    },
    formatPrice(price) {
      return numeral(price).format("$0,0.00");
    },
    formatPriceInput() {
      // Formatear el precio mientras se escribe
      this.data.total = numeral(this.data.total).format("$0,0");
    },
    changeFormStatus() {
      this.editFormStatus = !this.editFormStatus;
    },
    changeEditForm(){
      this.formStatus=!this.formStatus
    }
  },
  created() {
    this.getAllCheques();
  },
};
</script>

<style scoped>
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
.buysContainer {
  margin-left: 10px;
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
