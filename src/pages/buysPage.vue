<template>
  <backBtnComponent></backBtnComponent>
  <div class="buys-container">
    <div class="top-container">
      <h1>Compras:</h1>
      <button @click="showFormFunction">Registrar nueva compra</button>
    </div>

    <div class="table-responsive">
      <table class="table table-hover table-nowrap">
        <thead class="thead-light">
          <tr>
            <th scope="col">Fecha de compra</th>
            <th scope="col">Producto</th>
            <th scope="col">Descripcion</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Precio</th>
            <th scope="col">Fecha de Vencimiento</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(buy, index) in buys" :key="index">
            <td>{{ formatDate(buy.createdAt) }}</td>
            <td>{{ buy.name }}</td>
            <td>{{ buy.description }}</td>
            <td>{{ buy.quantity }}</td>
            <td>{{ buy.price }}</td>
            <td>{{ formatDate(buy.expirationDate) }}</td>
            <td>
              <a><i @click="getBuyInfo(buy._id)" class="bi bi-pencil"></i></a>
            </td>
            <td>
              <a><i @click="deleteBuy(buy._id)" class="bi bi-trash"></i></a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <updateProductComponent v-if="showForm">
    <template v-slot:productName
      ><input v-model="buyName" type="text"
    /></template>
    <template v-slot:productDescription
      ><input v-model="buyDescription" type="text"
    /></template>
    <template v-slot:productQuantity
      ><input v-model="buyQuantity" type="text"
    /></template>
    <template v-slot:productPrice
      ><input v-model="buyPrice" type="text"
    /></template>
    <template v-slot:productBarcode
      ><input v-model="expirationDate" type="text"
    /></template>
    <template v-slot:cancelBtn
      ><button @click="showFormFunction" class="btn-cancel" type="button">
        Cancelar
      </button></template
    >
    <template v-slot:confirmBtn
      ><button @click="createNewBuy" class="btn-cancel" type="button">
        Confirmar
      </button></template
    >
  </updateProductComponent>
</template>

<script>
import updateProductComponent from "@/components/forms/updateProductComponent.vue";
import moment from "moment";
import axios from "axios";
import backBtnComponent from "../components/buttons/backBtnComponent.vue";
export default {
  components: {
    backBtnComponent,
    updateProductComponent,
  },
  data() {
    return {
      buys: [],
      showForm: false,
      buyName: "",
      buyDescription: "",
      buyQuantity: "",
      buyPrice: "",
      expirationDate: "",
      buy_id: null,
    };
  },
  methods: {
    //------------------------------------LLAMADAS A LA API-----------------------------------------------
    async getAllBuys() {
      try {
        const buys = await axios.get(
          "http://localhost:3000/business/buys/65931333d7c90d26950f7332"
        );
        const data = buys.data;
        this.buys = data;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteBuy(id) {
      const confirm = window.confirm("¿Quiere eliminar esta compra?");
      if (!confirm) {
        window.alert("No se elimino la compra");
      } else {
        await axios.delete(`http://localhost:3000/buys/${id}`);
        console.log("Compra eliminado:", id);
        this.getAllBuys();
        return "Compra eliminada";
      }
    },
    async getBuyInfo(id) {
      try {
        this.setId(id);
        this.showFormFunction();
        const response = await axios.get(`http://localhost:3000/buys/${id}`);
        const buy = response.data;

        this.buyName = buy.name;
        this.buyDescription = buy.description;
        this.buyQuantity = buy.quantity;
        this.buyPrice = buy.price;
        this.expirationDate = buy.expirationDate;
      } catch (error) {
        console.log(error);
      }
    },
    async updateBuy(id) {
      try {
        console.log("Primer log");
        await axios.put(`http://localhost:3000/buys/${id}`, {
          name: this.buyName,
          quantity: this.buyQuantity,
          description: this.buyDescription,
          expirationDate: this.expirationDate,
        });
        console.log("Despeus de PUT");
        this.getAllBuys();
        this.showFormFunction();
        return "Compra actualizada";
      } catch (error) {
        console.log(error);
      }
    },
    async createNewBuy() {
      try {
        await axios.post("http://localhost:3000/buys", {
          name: this.buyName,
          quantity: this.buyQuantity,
          description: this.buyDescription,
          expirationDate: this.expirationDate,
          businessId: "65931333d7c90d26950f7332",
          productId:"6593136fd7c90d26950f7335"
        });
        this.showFormFunction()
        this.getAllBuys()
      } catch (error) {
        console.log(erro);
      }
    },
    //------------------------------------------------------------------------------------------------------
    formatDate(date) {
      return moment(date).format("DD/MM/YYYY");
    },
    showFormFunction() {
      if (this.showForm === false) {
        this.showForm = true;
      } else {
        this.showForm = false;
      }
    },
    setId(id) {
      this.buy_id = id;
      console.log(this.buy_id);
    },
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
