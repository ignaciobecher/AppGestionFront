<template>
  <div class="mainContainer">
    <!-- TODAS LAS NOTAS -->
    <div class="table-responsive">
      <h4>Historial de turnos</h4>

      <table class="table table-hover table-nowrap">
        <thead class="thead-light">
          <tr class="tableRow">
            <th scope="col">Fecha</th>
            <th scope="col">Descripcion</th>
            <th scope="col">Efectivo presentado</th>
            <th scope="col">Total efectivo</th>
            <th scope="col">Total Debito/Transferencia</th>
            <th scope="col">Total Crédito</th>
            <th scope="col">Total Cuenta corriente</th>
            <th scope="col">
              <strong style="color: black"> Total ventas al cierre </strong>
            </th>
          </tr>
        </thead>
        <tbody class="table-body">
          <tr v-for="(turn, index) in turnsArray">
            <td>
              <span>{{ formatDate(turn.createdAt) }}</span>
            </td>
            <td>
              <span>{{ turn.description }}</span>
            </td>
            <td>
              <span>{{ formatPrice(turn.cashTotal) }}</span>
            </td>
            <td>
              <span>{{ formatPrice(turn.cashSalesTotal) }}</span>
            </td>
            <td>
              <span>{{ formatPrice(turn.debitSalesTotal) }}</span>
            </td>
            <td>
              <span>{{ formatPrice(turn.creditTotal) }}</span>
            </td>
            <td>
              <span>{{ formatPrice(turn.cuentaCorrienteTotal) }}</span>
            </td>
            <td>
              <span>
                <strong>
                  {{ formatPrice(turn.salesTotal) }}
                </strong>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
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
      turnsArray: [],
    };
  },
  methods: {
    async getTurnsData() {
      try {
        const businessId = localStorage.getItem("businessId");
        const response = await axios.get(
          `http://localhost:3000/turns/${businessId}`
        );
        const data = response.data;
        this.turnsArray = data;
        console.log(data);
      } catch (error) {
        throw error;
      }
    },
    formatDate(date) {
      return moment(date).format("YYYY-MM-DD HH:mm:ss");
    },
    formatPrice(price) {
      return numeral(price).format("$0,0.00");
    },
  },
  mounted() {
    this.getTurnsData();
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
  max-height: 400px; /* Altura máxima */
  overflow-y: auto;
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
