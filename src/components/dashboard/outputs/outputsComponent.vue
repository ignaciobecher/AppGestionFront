<template>
  <div class="buys-container">
    <div class="searchbar-container">
      <p>Buscar egreso:</p>
      <input type="search" name="" placeholder="Buscar egreso..." id="" />
      <div class="top-container">
        <button @click.prevent="changeFormStatus">
          Registrar nuevo egreso
        </button>
      </div>
    </div>

    <div class="datesDiv">
      <label for="startDate">Fecha de inicio:</label>
      <input type="date" id="startDate" v-model="startDate" />

      <label for="endDate">Fecha de fin:</label>
      <input type="date" id="endDate" v-model="endDate" />

      <button @click="getFilteredOutputs">Obtener egresos filtrados</button>
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
      <p v-html="formattedResponse()"></p>
    </div>

    <div class="table-responsive">
      <table class="table table-hover table-nowrap">
        <thead class="thead-light">
          <tr class="tableRow">
            <th scope="col">Fecha de egreso</th>
            <th scope="col">Referencia</th>
            <th scope="col">Descripcion</th>
            <!-- <th scope="col">Cantidad</th> -->
            <th scope="col">Monto</th>
            <!-- <th scope="col">Fecha de Vencimiento</th> -->
          </tr>
        </thead>
        <tbody class="table-body">
          <!-- EGRESOS FILTRADOS -->
          <tr
            @click="setId(buy._id)"
            v-for="buy in filteredOutputs"
            class="tableRow"
            v-if="filteredOutputs.length > 0"
          >
            <td>
              <span>{{ formatDate(buy.createdAt) }}</span>
            </td>
            <td>
              <span v-if="!editStatus">{{ buy.name }}</span>
              <input v-else v-model="buy.name" />
            </td>

            <td>
              <span v-if="!editStatus">{{ buy.description }}</span>
              <input v-else v-model="buy.description" type="text" />
            </td>

            <td>
              <span v-if="!editStatus">{{ formatPrice(buy.value) }}</span>
              <input v-else v-model="buy.value" type="text" />
            </td>

            <td v-if="!editStatus">
              <a @click="changeEditStatus()"><i class="bi bi-pencil"></i></a>
            </td>
            <td v-else>
              <a @click="updateOutput(buy, buy._id)" href="#">
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
              <a @click="deleteOutput(buy._id)"> <i class="bi bi-trash"></i></a>
            </td>
          </tr>

          <!-- TODOS LOS EGRESOS -->
          <tr
            @click="setId(buy._id)"
            v-for="(buy, index) in buysArray"
            :key="index"
            class="tableRow"
            v-else
          >
            <td>
              <span>{{ formatDate(buy.createdAt) }}</span>
            </td>
            <td>
              <span v-if="!editStatus">{{ buy.name }}</span>
              <input v-else v-model="buy.name" />
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
              <span v-if="!editStatus">{{ formatPrice(buy.value) }}</span>
              <input v-else v-model="buy.value" type="text" />
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
              <a @click="updateOutput(buy, buy._id)" href="#">
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
              <a @click="deleteOutput(buy._id)"> <i class="bi bi-trash"></i></a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="editFormStatus" class="register-component">
      <form action="" class="expenses-form">
        <div class="form-group">
          <h3 style="text-align: center">Nuevo egreso</h3>
          <input
            v-model="data.product"
            type="text"
            placeholder="Ingrese una descripcion"
          />
          <input
            v-model="data.description"
            type="text"
            placeholder="Ingrese una observacion (opcional)"
          />
          <!-- <input
            v-model="data.quantity"
            type="text"
            placeholder="Ingrese una cantidad"
          /> -->
          <input
            v-model="data.value"
            type="text"
            placeholder="Ingrese un monto"
            @input="formatPriceInput"
          />
          <!-- <input
            v-model="data.expirationDate"
            type="date"
            placeholder="Ingrese una fecha de vencimiento"
          /> -->
          <button @click.prevent="changeFormStatus" class="btn-cancel">
            Cancelar
          </button>
          <button @click.prevent="createNewOutput" class="btn-confirm">
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
import * as todo from "@/components/testComponents/gptTest.vue";

export default {
  data() {
    return {
      buysArray: [],
      editStatus: false,
      editFormStatus: false,
      buy_id: null,
      data: {
        product: "",
        description: "",
        quantity: "",
        value: "",
        expirationDate: "",
      },
      gptArray: [],
      startDate: "",
      endDate: "",
      filteredOutputs: [],
      question: "",
      respuesta: "",
      information: [],
    };
  },
  methods: {
    // ********************************************LLAMADAS A LA API**************************************
    async getAllOutputs() {
      try {
        const businessId = localStorage.getItem("businessId");

        const response = await axios.get(
          `https://api-gestion-ahil.onrender.com/business/outputs/${businessId}`
        );
        const buys = response.data;
        this.buysArray = buys;
      } catch (error) {
        console.log(error);
      }
    },
    async updateOutput(buy, id) {
      try {
        const formattedExpirationDate = moment
          .utc(buy.expirationDate)
          .add(1, "days")
          .format("YYYY-MM-DD");

        await axios.put(`https://api-gestion-ahil.onrender.com/outputs/${id}`, {
          name: buy.name,
          description: buy.description,
          quantity: buy.quantity,
          value: buy.value,
          expirationDate: formattedExpirationDate,
        });

        this.getAllOutputs();
        this.changeEditStatus();
      } catch (error) {
        console.log("Error al actualizar");
      }
    },
    async createNewOutput() {
      try {
        console.log(this.data);
        const formattedExpirationDate = moment
          .utc(this.data.expirationDate)
          .add(1, "days")
          .format("YYYY-MM-DD");
        const totalWhitoutFormat = numeral(this.data.value).value();
        const businessId = localStorage.getItem("businessId");

        const newSale = await axios.post("https://api-gestion-ahil.onrender.com/outputs", {
          name: this.data.product,
          description: this.data.description,
          value: totalWhitoutFormat,
          quantity: this.data.quantity,
          businessId: businessId,
        });
        if (newSale) {
          console.log("Compra cargada con exito", newSale);
          this.changeFormStatus();
          this.getAllOutputs();
        } else {
          console.log("Error al cargar la venta");
        }
      } catch (error) {
        console.log("Error desde el catch", error);
      }
    },
    async deleteOutput(id) {
      try {
        if (
          window.confirm("¿Estás seguro de que deseas realizar esta acción?")
        ) {
          await axios.delete(`https://api-gestion-ahil.onrender.com
          /outputs/${id}`);
          window.alert("Compra eliminada");
          this.getAllOutputs();
        } else {
          window.alert("Accion cancelada");
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getFilteredOutputs() {
      try {
        const businessId = localStorage.getItem("businessId");

        const res = await axios.get(
          `https://api-gestion-ahil.onrender.com/outputs/getOutputs/${businessId}/${this.startDate}/${this.endDate}`
        );
        const outputs = res.data;
        this.filteredOutputs = outputs;
        for (const item of this.filteredOutputs) {
          console.log(item);
        }
      } catch (error) {
        throw error;
      }
    },
    async askGpt() {
      try {
        console.log("Pregunta: ", this.question);
        console.log("Informacion: ", this.information);
        this.information = this.buysArray;
        const response = await axios.post(
          `https://api-gestion-ahil.onrender.com/chat-gpt`,
          {
            message:this.question,
            info: this.information,
          }
        );
        const data = response.data;

        this.respuesta = data;
      } catch (error) {
        throw error;
      }
    },

    // ********************************************----------------**************************************
    formattedResponse() {
      return this.respuesta.split("*").join("*<br/><br/>");
    },
    setId(id) {
      this.buy_id = id;
    },
    formatDate(date) {
      return moment(date).format("DD/MM/YYYY");
    },
    formatPrice(price) {
      return numeral(price).format("$0,0.00");
    },
    formatPriceInput() {
      // Formatear el precio mientras se escribe
      this.data.value = numeral(this.data.value).format("$0,0");
    },
    changeEditStatus() {
      this.editStatus = !this.editStatus;
    },
    changeFormStatus() {
      this.editFormStatus = !this.editFormStatus;
    },
    clearFilters() {
      this.startDate = "";
      this.endDate = "";
      this.filteredOutputs.length = 0;
      this.getAllOutputs();
    },
  },
  created() {
    this.getAllOutputs();
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
.gpt {
  margin: 10px;
}

.gpt li {
  list-style-type: none;
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
  width: 50%;
  border: none;
  border-radius: 0%;
  background-color: #574f7a;
  font-size: 20px;
  font-weight: 500;
  color: white;
}

/* //RESPONSIVE PARA TELEFONO-****************************************************************** */
@media screen and (max-width: 768px){
  .datesDiv{
    display: flex;
    flex-direction: column;
  }

  .datesDiv input{
    width: 95vw;
  }

  .datesDiv button{
    width: 95vw;
    margin-top: 10px;
  }
  .searchbar-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  }

  .searchbar-container input{
    width: 95vw;
  }
 
  .searchbar-container button{
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