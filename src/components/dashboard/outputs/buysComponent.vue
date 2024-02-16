<template>
  <div class="buysContainer">
    <h1>Compras</h1>

    <div class="searchbar-container">
      <p>Buscar compra:</p>
      <input type="search" name="" placeholder="Buscar por nombre" id="" />
      <div class="top-container">
        <button @click.prevent="changeFormStatus">
          Registrar nueva compra
        </button>
      </div>
      <div class="date"></div>
    </div>

    <div class="table-responsive">
      <table class="table table-hover table-nowrap">
        <thead class="thead-light">
          <tr class="tableRow">
            <th scope="col">Fecha de compra</th>
            <th scope="col">Proveedor</th>
            <th scope="col">Descripcion</th>
            <th scope="col">Monto</th>
            <th scope="col">Numero Factura</th>
          </tr>
        </thead>
        <tbody class="table-body">
          <tr
            @click="setId(buy._id)"
            v-for="(buy, index) in buysArray"
            :key="index"
            class="tableRow"
          >
            <td>
              <span>{{ formatDate(buy.createdAt) }}</span>
            </td>
            <td>
              <span v-if="!editStatus">{{ buy.providerId.name }}</span>
              <input v-else v-model="buy.providerId.name" />
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
              <span v-if="!editStatus">{{ formatPrice(buy.price) }}</span>
              <input v-else v-model="buy.price" type="text" />
            </td>
            <td>
              <span v-if="!editStatus">{{ buy.receiptNumber }}</span>
              <input v-else v-model="buy.receiptNumber" type="text" />
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
              <a @click="updateBuy(buy, buy._id)" href="#">
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
              <a @click="deleteBuy(buy._id)"> <i class="bi bi-trash"></i></a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="editFormStatus" class="register-component">
      <form action="" class="expenses-form">
        <div class="form-group">
          <h3 style="text-align: center">Nueva compra</h3>
          <select v-model="providerId" name="" id="">
            <option
              v-for="(provider, index) in providersArray"
              :key="index"
              :value="provider._id"
            >
              {{ provider.name }}
            </option>
          </select>
         
          <input
            v-model="data.description"
            type="text"
            placeholder="Decripcion... (opcional)"
          />

          <input
            v-model="data.receiptNumber"
            type="text"
            placeholder="Nro factura... (opcional)"
          />

          <input
            v-model="data.price"
            type="text"
            placeholder="Monto total..."
          />

          <button @click.prevent="changeFormStatus" class="btn-cancel">
            Cancelar
          </button>
          <button @click.prevent="createNewBuy" class="btn-confirm">
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
      buysArray: [],
      editStatus: false,
      editFormStatus: false,
      buy_id: null,
      data: {
        // product: "",
        description: "",
        // quantity: "",
        price: "",
        receiptNumber: null,
        // expirationDate: "",
      },
      providersArray: [],
      providerId:null
    };
  },
  methods: {
    // ********************************************LLAMADAS A LA API**************************************
    async getAllBuys() {
      try {
        const response = await axios.get(
          "http://localhost:3000/business/buys/65bfdff8a75ffb8fb6be8937"
        );
        const buys = response.data;
        this.buysArray = buys;
        console.log(buys);
      } catch (error) {
        console.log(error);
      }
    },
    async updateBuy(buy, id) {
      try {
        const formattedExpirationDate = moment
          .utc(buy.expirationDate)
          .add(1, "days")
          .format("YYYY-MM-DD");

        await axios.put(`http://localhost:3000/buys/${id}`, {
          name: buy.name,

          description: buy.description,
          // quantity: buy.quantity,
          price: buy.price,
          receiptNumber: buy.receiptNumber,
          // expirationDate: formattedExpirationDate,
        });

        this.getAllBuys();
        this.changeEditStatus();
      } catch (error) {
        console.log("Error al actualizar");
      }
    },
    async createNewBuy() {
      try {
        console.log(this.data);
        const formattedExpirationDate = moment
          .utc(this.data.expirationDate)
          .add(1, "days")
          .format("YYYY-MM-DD");

        const newSale = await axios.post("http://localhost:3000/buys", {
          description: this.data.description,
          price: this.data.price,
          // quantity: this.data.quantity,
          receiptNumber: this.data.receiptNumber,
          businessId: "65bfdff8a75ffb8fb6be8937",
          providerId:this.providerId
        });
        if (newSale) {
          console.log("Compra cargada con exito", newSale);
          this.changeFormStatus();
          this.getAllBuys();
          this.data.description=""
          this.data.price=""
          this.data.receiptNumber=""
          this.providerId=""
        } else {
          console.log("Error al cargar la venta");
        }
      } catch (error) {
        console.log("Error desde el catch", error);
      }
    },
    async deleteBuy(id) {
      try {
        if (
          window.confirm("¿Estás seguro de que deseas realizar esta acción?")
        ) {
          await axios.delete(`http://localhost:3000/buys/${id}`);
          window.alert("Compra eliminada");
          this.getAllBuys();
        } else {
          window.alert("Accion cancelada");
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getAllProviders() {
      try {
        const response = await axios.get(
          "http://localhost:3000/providers/business/65bfdff8a75ffb8fb6be8937"
        );
        const providers = response.data;

        for (const provider of providers) {
          for (const iterator of provider.providers) {
            this.providersArray.push(iterator)
          }
        }
      } catch (error) {
        throw error;
      }
    },
    // ********************************************----------------**************************************
    setId(id) {
      this.buy_id = id;
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
    this.getAllBuys(), this.getAllProviders();
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
