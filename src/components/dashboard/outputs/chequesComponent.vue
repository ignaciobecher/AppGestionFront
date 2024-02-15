<template>
  <div class="buysContainer">
    <h1>Cheques</h1>

    <div class="searchbar-container">
      <p>Buscar cheque:</p>
      <input type="search" name="" placeholder="Buscar por nombre" id="" />
      <div class="top-container">
        <button @click.prevent="changeFormStatus">
          Registrar nuevo cheque
        </button>
      </div>
      <div class="date"></div>
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
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody class="table-body">
          <tr
            @click="setId(cheque._id)"
            v-for="(cheque, index) in chequesArray"
            :key="index"
            class="tableRow"
          >
            <td>
              <span>{{ formatDate(cheque.createdAt) }}</span>
            </td>
            <td>
              <span v-if="!editStatus">{{ cheque.identification }}</span>
              <input v-else v-model="cheque.identification" />
            </td>

            <td>
              <span v-if="!editStatus">{{ cheque.description }}</span>
              <input v-else v-model="cheque.description" type="text" />
            </td>

            <td>
              <span v-if="!editStatus">{{ cheque.chequeNumber }}</span>
              <input v-else v-model="cheque.chequeNumber" type="text" />
            </td>
            <td>
              <span v-if="!editStatus">{{
                formatDate(cheque.chequeDate)
              }}</span>
              <input v-else v-model="cheque.chequeDate" type="date" />
            </td>

            <td>
              <span v-if="!editStatus">{{ formatPrice(cheque.total) }}</span>
              <input v-else v-model="cheque.total" type="number" />
            </td>

            <td v-if="!editStatus">
              <a @click="changeEditStatus()"><i class="bi bi-pencil"></i></a>
            </td>
            <td v-else>
              <a @click="updateCheque(cheque, cheque._id)" href="#">
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
          <h3 style="text-align: center">Nueva compra</h3>

          <input
            v-model="data.identification"
            type="text"
            placeholder="Identificacion... (opcional)"
          />

          <input
            v-model="data.description"
            type="text"
            placeholder="Descripcion... (opcional)"
          />

          <input
            v-model="data.chequeNumber"
            type="number"
            placeholder="N° cheque..."
          />

          <input v-model="data.total" type="text" placeholder="Monto..." />

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
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import numeral from "numeral";

export default {
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
      chequeId: null,
    };
  },
  methods: {
    // ********************************************LLAMADAS A LA API**************************************
    async getAllCheques() {
      try {
        const response = await axios.get(
          "http://localhost:3000/cheques/65bfdff8a75ffb8fb6be8937"
        );
        const cheques = response.data;
        this.chequesArray = cheques;
        console.log(cheques);
      } catch (error) {
        console.log(error);
      }
    },
    async updateCheque(cheque, id) {
      try {
     
        const fechaCheque = moment(cheque.chequeDate);
        const nuevaFecha = fechaCheque.add(1, "day");
        const formatedDate = nuevaFecha.format("YYYY-MM-DD");
        await axios.put(`http://localhost:3000/cheques/${id}`, {
          identification: cheque.identification,
          description: cheque.description,
          chequeNumber: cheque.chequeNumber,
          total: cheque.total,
          chequeDate:formatedDate
        });

        this.getAllCheques();
        this.changeEditStatus();
      } catch (error) {
        console.log("Error al actualizar");
      }
    },
    async createNewCheque() {
      try {
        // const formattedExpirationDate = moment
        //   .utc(this.data.expirationDate)
        //   .add(1, "days")
        //   .format("YYYY-MM-DD");

        const fechaCheque = moment(this.data.chequeDate);
        const nuevaFecha = fechaCheque.add(1, "day");
        const formatedDate = nuevaFecha.format("YYYY-MM-DD");

        const newCheque = await axios.post("http://localhost:3000/cheques", {
          identification: this.data.identification,
          description: this.data.description,
          chequeNumber: this.data.chequeNumber,
          total: this.data.total,
          chequeDate: formatedDate,
          businessId: "65bfdff8a75ffb8fb6be8937",
        });
        if (newCheque) {
          console.log("Cheque cargado con exito", newCheque);
          this.changeFormStatus();
          this.getAllCheques();
          this.data.description = "";
          this.data.identification = "";
          this.data.chequeNumber = 0;
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

    // ********************************************----------------**************************************
    setId(id) {
      this.cheque_id = id;
    },
    formatDate(date) {
      return moment(date).format("DD/MM/YYYY");
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
    this.getAllCheques();
  },
};
</script>

<style scoped>
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
  background-color: #1a1a1a;
  border-radius: 15px;
  padding: 5px;
}

.tableRow th {
  background-color: #1a1a1a;
  color: white;
}

.tableRow td {
  background-color: #1a1a1a;
  color: white;
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
</style>
