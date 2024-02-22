<template>
  <div class="inputsContainer">
    <div class="searchbar-container">
      <p>Buscar ingreso:</p>
      <input type="search" name="" placeholder="Buscar ingreso..." id="" />
      <div class="top-container">
        <button @click.prevent="changeFormStatus">
          Registrar nuevo ingreso
        </button>
      </div>
    </div>

    <div class="table-responsive">
      <table class="table table-hover table-nowrap">
        <thead class="thead-light">
          <tr class="tableRow">
            <th scope="col">Fecha de ingreso</th>
            <th scope="col">Referencia</th>
            <th scope="col">Descripcion</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Precio</th>
            <!-- <th scope="col">Fecha de Vencimiento</th> -->
          </tr>
        </thead>
        <tbody class="table-body">
          <tr
            @click="setId(input._id)"
            v-for="(input, index) in inputsArray"
            :key="index"
            class="tableRow"
          >
            <td>
              <span>{{ formatDate(input.createdAt) }}</span>
            </td>
            <td>
              <span v-if="!editStatus">{{ input.name }}</span>
              <input v-else v-model="input.name" />
            </td>

            <td>
              <span v-if="!editStatus">{{ input.description }}</span>
              <input v-else v-model="input.description" type="text" />
            </td>
            <td>
              <span v-if="!editStatus">{{ input.quantity }}</span>
              <input v-else v-model="input.quantity" type="text" />
            </td>
            <td>
              <span v-if="!editStatus">{{ formatPrice(input.value) }}</span>
              <input v-else v-model="input.value" type="text" />
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
              <a @click="updateInput(input, input._id)" href="#">
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
              <a @click="deleteInput(input._id)">
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
          <h3 style="text-align: center">Nuevo ingreso</h3>
          <input v-model="data.product" type="text" placeholder="Destino..." />
          <input
            v-model="data.description"
            type="text"
            placeholder="Descripcion... (opcional)"
          />
          <input
            v-model="data.quantity"
            type="text"
            placeholder="Cantidad... (opcional)"
          />
          <input
            v-model="data.value"
            type="text"
            placeholder="Monto... (opcional)"
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
          <button @click.prevent="createNewInput" class="btn-confirm">
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

export default {
  data() {
    return {
      inputsArray: [],
      editStatus: false,
      editFormStatus: false,
      input_Id: null,
      data: {
        product: "",
        description: "",
        quantity: "",
        value: "",
        expirationDate: "",
      },
    };
  },
  methods: {
    // ********************************************LLAMADAS A LA API**************************************
    async getAllInputs() {
      try {
        const response = await axios.get(
          "http://localhost:3000/inputs/65bfdff8a75ffb8fb6be8937"
        );
        const inputs = response.data;
        this.inputsArray = inputs;
        for (let index = 0; index < inputs.length; index++) {
          const element = inputs[index];
          const date = new Date(element.createdAt);
          const month = date.getMonth() + 1;
          const formattedDate = date.toLocaleDateString();
          console.log("Fecha:", formattedDate, "////", "Mes: ", month);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async updateInput(buy, id) {
      try {
        const formattedExpirationDate = moment
          .utc(buy.expirationDate)
          .add(1, "days")
          .format("YYYY-MM-DD");
        await axios.put(`http://localhost:3000/inputs/${id}`, {
          name: buy.name,
          description: buy.description,
          quantity: buy.quantity,
          value: buy.value,
          expirationDate: formattedExpirationDate,
        });

        this.getAllInputs();
        this.changeEditStatus();
      } catch (error) {
        console.log("Error al actualizar");
      }
    },
    async createNewInput() {
      try {
        console.log(this.data);
        const formattedExpirationDate = moment
          .utc(this.data.expirationDate)
          .add(1, "days")
          .format("YYYY-MM-DD");
        const value=numeral(this.data.value).value();
        const newSale = await axios.post("http://localhost:3000/inputs", {
          name: this.data.product,
          description: this.data.description,
          value: value,
          quantity: this.data.quantity,
          businessId: "65bfdff8a75ffb8fb6be8937",
        });
        if (newSale) {
          console.log("Compra cargada con exito", newSale);
          this.changeFormStatus();
          this.getAllInputs();
        } else {
          console.log("Error al cargar la venta");
        }
      } catch (error) {
        console.log("Error desde el catch", error);
      }
    },
    async deleteInput(id) {
      try {
        if (
          window.confirm("¿Estás seguro de que deseas realizar esta acción?")
        ) {
          await axios.delete(`http://localhost:3000/inputs/${id}`);
          window.alert("Compra eliminada");
          this.getAllInputs();
        } else {
          window.alert("Accion cancelada");
        }
      } catch (error) {
        console.log(error);
      }
    },
    // ********************************************----------------**************************************
    setId(id) {
      this.input_Id = id;
    },
    formatDate(date) {
      return moment(date).format("DD/MM/YYYY");
    },
    formatPriceInput() {
      // Formatear el precio mientras se escribe
      this.data.value = numeral(this.data.value).format('$0,0');
    },
    formatPrice(price) {
      return numeral(price).format("$0,0.00");
    },
    changeEditStatus() {
      this.editStatus = !this.editStatus;
    },
    changeFormStatus() {
      this.editFormStatus = !this.editFormStatus;
    },
  },
  created() {
    this.getAllInputs();
  },
};
</script>

<style scoped>
.inputsContainer {
  margin: 10px;
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
  background-color: #FFFFFF;
  box-shadow: 4px 4px 5px -4px rgba(0, 0, 0, 0.75);
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
