<template>
  <div class="mainContainer">
    <h2>Bloc de notas</h2>
    <!-- BOTON CREAR NUEVA NOTA -->
    <div class="btnCreate">
      <button @click="showHideForm">Crear nueva nota</button>
    </div>
    <!-- TODAS LAS NOTAS -->
    <div class="table-responsive">
      <table class="table table-hover table-nowrap">
        <thead class="thead-light">
          <tr class="tableRow">
            <th scope="col">Producto</th>
            <th scope="col">Descripcion</th>
            <th scope="col">Lote</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Fecha vencimiento</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody class="table-body">
          <tr @click="setId(notes._id)" v-for="notes in notesArray">
            <td>
              <span>{{ notes.product }}</span>
            </td>
            <td>
              <span>{{ notes.description }}</span>
            </td>
            <td>
              <span>{{ notes.identification }}</span>
            </td>
            <td>
              <span>{{ notes.quantity }}</span>
            </td>
            <td>
              <span>{{ formatDate(notes.expirationDate) }}</span>
            </td>
           
            <td>
              <a @click="deleteNote(notes._id)">
                <i  class="bi bi-trash"></i>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- FORM CREAR NUEVA NOTA -->
    <div v-if="formStatus" class="register-component">
      <form action="" class="expenses-form">
        <div class="form-group">
          <h3 style="text-align: center">Nueva nota</h3>

          <input
            v-model="noteData.product"
            type="text"
            placeholder="Producto... "
          />

          <input
            v-model="noteData.description"
            type="text"
            placeholder="Descripcion..."
          />

          <input
            v-model="noteData.identification"
            type="number"
            placeholder="Lote..."
          />

          <input
            v-model="noteData.quantity"
            type="text"
            placeholder="Cantidad..."
          />

          <input
            v-model="noteData.expirationDate"
            type="date"
            placeholder="Fecha de vencimiento..."
          />

          <button @click="showHideForm" class="btn-cancel">Cancelar</button>
          <button @click.prevent="createNote" class="btn-confirm">
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

const businessId = localStorage.getItem("businessId");
export default {
  data() {
    return {
      formStatus: false,
      notesArray: [],
      noteData: {
        product: "",
        description: "",
        identification: "",
        quantity: null,
        expirationDate: Date,
      },
      note_id: null,
    };
  },
  methods: {
    // ********************************SOLICITUDES A LA API*******************************************
    async getAllNotes() {
      try {
        const response = await axios.get(
          `http://localhost:3000/notes/${businessId}/notes/ordered-by-due-date`
        );
        const notes = response.data;
        this.notesArray = notes;
      } catch (error) {
        throw error;
      }
    },
    async createNote() {
      try {
        const formatedDate = moment(this.noteData.expirationDate).format(
          "YYYY-MM-DD"
        );
        const note = await axios.post(
          `http://localhost:3000/notes/${businessId}`,
          {
            product: this.noteData.product,
            description: this.noteData.description,
            identification: this.noteData.identification,
            quantity: this.noteData.quantity,
            expirationDate: formatedDate,
          }
        );
        this.showHideForm();
        this.getAllNotes();
      } catch (error) {
        throw error;
      }
    },
    async deleteNote(id) {
      try {
        if (window.confirm("¿Desea eliminar la nota?")) {
        const deleteNote=await axios.delete(`http://localhost:3000/notes/${id}/${businessId}`)
          window.alert("Nota eliminada");
          this.getAllNotes()
        }
      } catch (error) {
        throw error;
      }
    },
    // ********************************SOLICITUDES A LA API*******************************************
    formatDate(date) {
      return moment(date).format("DD/MM/YYYY");
    },
    showHideForm() {
      this.formStatus = !this.formStatus;
    },
    setId(id) {
      this.note_id = id;
    },
  },
  mounted() {
    this.getAllNotes();
  },
};
</script>

<style scoped>
.btnCreate {
  margin-bottom: 10px;
}

.btnCreate button {
  border: none;
  border-radius: 0%;
  background-color: #574f7a;
  font-weight: 500;
  color: white;
  padding: 10px;
}

.mainContainer {
  margin: 10px;
}
.table-responsive {
  background-color: #ffffff;
  padding: 5px;
  box-shadow: 4px 4px 5px -4px rgba(0, 0, 0, 0.75);
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
  padding: 5px;
  background-color: white;
  position: absolute;
  box-shadow: 4px 4px 5px -4px rgba(0, 0, 0, 0.75);

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
    color: black;
  }
}

label {
  font-size: 18px;
}

input,
select {
  padding: 8px;
  border: 1px solid #ccc;
  font-size: 16px;
  margin-bottom: 5px;

  width: 100%;
}

.btn-cancel,
.btn-confirm {
  padding: 10px 20px;
  border: none;
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
