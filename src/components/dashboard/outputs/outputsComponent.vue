<template>
  <div class="buys-container">
    <div class="searchbar-container">
      <p>Buscar egreso:</p>
      <input
        @input="checkInput"
        v-model="name"
        type="search"
        name=""
        @keyup.enter="getOutputByName"
        placeholder="Buscar egreso..."
        id=""
      />
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
      <div
        v-if="loading === true"
        style="display: flex; justify-content: center; margin-top: 20px"
      >
        <spinner> </spinner>
      </div>
      <p v-if="loading === false" v-html="formattedResponse()"></p>
      <button v-if="showPrint === true" @click="printResponse">Imprimir</button>
    </div>

    <!-- TODOS LOS PRODUCTOS -->
    <div v-if="isProductFound == false" class="table-responsive">
      <table class="table table-hover table-nowrap">
        <thead class="thead-light">
          <tr class="tableRow">
            <th scope="col">Fecha de egreso</th>
            <th scope="col">Referencia</th>
            <th scope="col">Descripcion</th>
            <th scope="col">Monto</th>
            <th scope="col"></th>
            <th scope="col"></th>
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
              <span>{{ buy.name }}</span>
            </td>

            <td>
              <span>{{ buy.description }}</span>
            </td>

            <td>
              <span>{{ formatPrice(buy.value) }}</span>
            </td>

            <td>
              <a @click="getOutPutData(buy._id)"
                ><i class="bi bi-pencil"></i
              ></a>
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
              <span>{{ buy.name }}</span>
            </td>

            <td>
              <span>{{ buy.description }}</span>
            </td>

            <td>
              <span>{{ formatPrice(buy.value) }}</span>
            </td>

            <td>
              <a @click="getOutPutData(buy._id)"
                ><i class="bi bi-pencil"></i
              ></a>
            </td>

            <td>
              <a @click="deleteOutput(buy._id)"> <i class="bi bi-trash"></i></a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- UN SOLO PRODUCTO BUSCADO -->
    <div v-if="isProductFound == true" class="table-responsive">
      <table class="table table-hover table-nowrap">
        <thead class="thead-light">
          <tr class="tableRow">
            <th scope="col">Fecha de egreso</th>
            <th scope="col">Referencia</th>
            <th scope="col">Descripcion</th>
            <th scope="col">Monto</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody class="table-body">
          <!-- TODOS LOS EGRESOS -->
          <tr @click="setId(singleProductFoundArray._id)" class="tableRow">
            <td>
              <span>{{ formatDate(singleProductFoundArray.createdAt) }}</span>
            </td>
            <td>
              <span>{{ singleProductFoundArray.name }}</span>
            </td>

            <td>
              <span>{{ singleProductFoundArray.description }}</span>
            </td>

            <td>
              <span>{{ formatPrice(singleProductFoundArray.value) }}</span>
            </td>

            <td>
              <a @click="getOutPutData(singleProductFoundArray._id)"
                ><i class="bi bi-pencil"></i
              ></a>
            </td>

            <td>
              <a @click="deleteOutput(singleProductFoundArray._id)">
                <i class="bi bi-trash"></i
              ></a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- REGISTRAR EGRESO -->
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
            placeholder="Ingrese una observacion "
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

    <!-- ACTUALIZAR EGRESO -->
    <div v-if="formStatus" class="register-component">
      <form action="" class="expenses-form">
        <div class="form-group">
          <h3 style="text-align: center">Actualizar egreso</h3>
          <input
            v-model="data.product"
            type="text"
            placeholder="Ingrese una descripcion"
          />
          <input
            v-model="data.description"
            type="text"
            placeholder="Ingrese una observacion "
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

          <button @click.prevent="changeEditForm" class="btn-cancel">
            Cancelar
          </button>
          <button @click.prevent="updateOutput" class="btn-confirm">
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
      loading: false,
      formStatus: false,
      name: "",
      isProductFound: false,
      singleProductFoundArray: null,
      showPrint: false,
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
    async updateOutput() {
      try {
        const formatedValue = numeral(this.data.value).value();
        console.log("Id desde el update:", this.buy_id);
        await axios.put(`https://api-gestion-ahil.onrender.com/outputs/${this.buy_id}`, {
          name: this.data.product,
          description: this.data.description,
          value: formatedValue,
        });

        this.changeEditForm();

        this.data.product = "";
        this.data.description = "";
        this.data.value = "";

        this.getAllOutputs();
        this.changeEditStatus();
      } catch (error) {
        console.log("Error al actualizar", error);
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

        if (!this.data.product || !this.data.description || !this.data.value) {
          window.alert("Todos los campos son obligatorios");
          return;
        }

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
          await axios.delete(`https://api-gestion-ahil.onrender.com/outputs/${id}`);
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
        if (this.question === "") {
          window.alert("Tu pregunta no puede estar vacia");
          return;
        }
        this.loading = true;
        this.information = this.buysArray;
        const response = await axios.post(`https://api-gestion-ahil.onrender.com/chat-gpt`, {
          message: this.question,
          info: this.information,
        });
        const data = response.data;

        this.respuesta = data;
        this.loading = false;
        this.showPrint=true
      } catch (error) {
        throw error;
      }
    },
    async getOutPutData(id) {
      try {
        this.changeEditForm();
        const response = await axios.get(`https://api-gestion-ahil.onrender.com/outputs/${id}`);
        const data = response.data;

        this.data.product = data.name;
        this.data.description = data.description;
        this.data.value = data.value;
      } catch (error) {
        window.alert("Error al acceder al egreso");
      }
    },
    async getOutputByName() {
      try {
        const businessId = localStorage.getItem("businessId");
        const response = await axios.get(
          `https://api-gestion-ahil.onrender.com/outputs/search/${businessId}/${this.name}`
        );
        const data = response.data;
        this.isProductFound = true;
        this.singleProductFoundArray = data;
        console.log("SingleProduct:", this.singleProductFoundArray);
      } catch (error) {
        window.alert("Error al acceder al egreso");
      }
    },
    // ********************************************----------------**************************************
    formattedResponse() {
      return this.respuesta.split("*").join("*<br/><br/>");
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
    changeEditForm() {
      this.formStatus = !this.formStatus;
    },
    checkInput() {
      if (this.name === "") {
        this.isProductFound = false;
      }
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