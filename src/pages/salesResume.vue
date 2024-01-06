<template>
  <backBtnComponent></backBtnComponent>
  <div class="buys-container">
    <div class="top-container">
      <h1>Ventas</h1>
    </div>

    <div class="table-responsive">
      <table class="table table-hover table-nowrap">
        <thead class="thead-light">
          <tr>
            <th scope="col">Fecha</th>
            <th scope="col">Forma de pago</th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(buy, index) in buysArray" :key="index">
            <td>{{ formatDate(buy.createdAt) }}</td>
            <td>{{ buy.paymentMethod }}</td>
            <td>{{formatPrice( buy.total) }}</td>
            

            <!-- <td>
                <a><i class="bi bi-pencil"></i></a>
              </td>
              <td>
                <a><i class="bi bi-trash"></i></a>
              </td> -->
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import updateProductComponent from "@/components/forms/updateProductComponent.vue";
import moment from "moment";
import numeral from 'numeral'
import axios from "axios";
import backBtnComponent from "../components/buttons/backBtnComponent.vue";
export default {
  components: {
    backBtnComponent,
    updateProductComponent,
  },
  data() {
    return {
      buysArray: [],
    };
  },
  methods: {
    async getAllBuys() {
      try {
        const response = await axios.get(
          "http://localhost:3000/business/sales/65931333d7c90d26950f7332"
        );
        const buys = response.data;
        this.buysArray = buys;
      } catch (error) {
        console.log(buys);
      }
    },
    formatDate(date) {
      return moment(date).format("DD/MM/YYYY");
    },
    formatPrice(price){
      return numeral(price).format('$0,0[.]00 ')
    }
  },
  mounted() {
    this.getAllBuys();
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

.update-form {
  width: 60%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;

  position: absolute;
  top: 10%;
  right: 20%;
}

.form-group {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  width: 80%;
}

label {
  font-size: 18px;
  margin-bottom: 5px;
}

input {
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 16px;
  width: 100%;
}

.btn-cancel,
.btn-confirm {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-right: 10px;
}

.btn-cancel {
  background-color: #ccc;
  color: #333;
}

.btn-confirm {
  background-color: #007bff;
  color: #fff;
}
</style>
