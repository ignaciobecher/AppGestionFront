<template>
  <backBtnComponent></backBtnComponent>
  <div class="buys-container">
    <div class="top-container">
      <h1>Gastos</h1>
      <button @click="showFormFunction">Registrar nuevo gasto</button>
    </div>

    <div class="table-responsive">
      <table class="table table-hover table-nowrap">
        <thead class="thead-light">
          <tr>
            <th scope="col">Referencia</th>
            <th scope="col">Valor</th>
            <th scope="col">Descripcion</th>
            <th scope="col">Fecha</th>
          </tr>
        </thead>
        <tbody>
          <tr
            @click="setId(expense._id)"
            v-for="(expense, index) in expensesArray"
            :key="index"
          >
            <td>{{ expense.name }}</td>
            <td>{{ formatPrice(expense.value) }}</td>
            <td>{{ expense.description }}</td>
            <td>{{ formatDate(expense.createdAt) }}</td>

            <td>
              <a
                ><i @click="getOneExpense(expense._id)" class="bi bi-pencil"></i
              ></a>
            </td>
            <td>
              <a><i class="bi bi-trash"></i></a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <form v-if="showForm" action="" class="expenses-form">
    <div class="form-group">
      <h3>Nuevo gasto</h3>
      <input
        type="text"
        v-model="formData.reference"
        placeholder="Referencia"
      />
      <input type="number" v-model="formData.value" placeholder="Valor" />
      <input
        type="text"
        v-model="formData.description"
        placeholder="Descripcion"
      />
      <button @click="showFormFunction" class="btn-cancel">Cancelar</button>
      <button @click="updateExpense(expense_id)" class="btn-confirm">
        Confirmar
      </button>
    </div>
  </form>
</template>

<script>
import moment from "moment";
import axios from "axios";
import backBtnComponent from "../components/buttons/backBtnComponent.vue";
import numeral from "numeral";
export default {
  components: {
    backBtnComponent,
  },
  data() {
    return {
      expensesArray: [],
      showForm: false,
      expense_id: null,
      formData: {
        reference: "",
        value: 0,
        description: "",
      },
    };
  },
  methods: {
    //------------------------------------------LLAMADAS A LA API---------------------------------------------
    async getAllExpenses() {
      const response = await axios.get(
        "http://localhost:3000/business/outputs/65931333d7c90d26950f7332"
      );
      const expenses = response.data;
      this.expensesArray = expenses;
    },
    async getOneExpense(id) {
      try {
        const expense = await axios.get(`http://localhost:3000/outputs/${id}`);
        const data = expense.data;
        this.formData.reference = data.name;
        this.formData.value = data.value;
        this.formData.description = data.description;
        this.showFormFunction();
      } catch (error) {
        console.log(error);
      }
    },
    async updateExpense(id) {
      try {
        await axios.put(`http://localhost:3000/outputs/${id}`, {
          name: this.formData.reference,
          value: this.formData.value,
          description: this.formData.description,
        });
        this.showFormFunction();
        this.getAllExpenses();
      } catch (error) {
        console.log(error);
      }
    },
    async deleteExpense(id) {
      try {
        const confirm = window.confirm("¿Quiere eliminar esta compra?");
        if (!confirm) {
          window.alert("No se elimino la compra");
        } else {
          await axios.delete(`http://localhost:3000/outputs/${id}`);
          console.log("Gasto eliminado");
        }
      } catch (error) {
        console.log(error);
      }
    },

    //--------------------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------------------

    formatDate(date) {
      return moment(date).format("DD/MM/YYYY");
    },
    formatPrice(price) {
      return numeral(price).format("$0.0[]00 ");
    },
    showFormFunction() {
      this.showForm = !this.showForm;
    },
    setId(id) {
      this.expense_id = id;
    },
  },
  mounted() {
    this.getAllExpenses();
  },
};
</script>

<style scoped>
.buys-container h1 {
  margin: 15px;
}

.top-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
}
.top-container {
  button {
    grid-column: 6;
    margin: 15px;
    background-color: #007bff;
    border: none;
    border-radius: 15px;
    color: white;
    font-size: 20px;
  }
}

.table-responsive {
  margin: 15px;
}

.expenses-form {
  width: 40%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 5px;
  padding: 5px;
  background-color: grey;
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
  color: #333;
  margin-bottom: 5px;
}

.btn-confirm {
  background-color: #007bff;
  color: #fff;
}
</style>
