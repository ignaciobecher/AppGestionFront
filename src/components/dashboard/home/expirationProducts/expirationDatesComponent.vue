<template>
  <div class="mainContainer">
    <div style="display: flex; background-color: #ffffff" class="backBtn">
      <router-link to="/">
        <button
          style="
            margin: 10px;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            background-color: rgb(109, 169, 62);
            border: none;
          "
        >
          <i
            style="color: white; font-weight: bold; font-size: 20px"
            class="bi bi-arrow-return-left"
          ></i>
        </button>
      </router-link>
      <h4 style="color: black; margin-top: 15px">Productos por vencer</h4>
    </div>

    <div style="display:flex; margin-left: 10px; margin-top:10px;">
      <h4 style="margin-top: 8px; color: black;">Ingrese cantidad de días</h4>
      <input v-model="expirationDays" placeholder="Ingrese una cantidad de días para ver vencimientos" style="margin-left: 10px;  padding: 10px; font-size: 15px; font-weight: bold; width: 40%;" type="number" />
      <button @click="getExpiratedProducts(expirationDays)" style="margin-left: 10px;  padding: 10px; font-size: 15px; font-weight: bold; border:none; background-color:#b28cc4;" type="submit">Ver productos</button>
    </div>
    <div class="innerContainer">
        <div class="table-responsive">
      <table class="table table-hover table-nowrap">
        <thead class="thead-light">
          <tr class="tableRow">
            <th scope="col">Producto</th>
            <th scope="col">Fecha de vencimiento</th>
          </tr>
        </thead>
        <tbody class="table-body">
          <tr v-for="(product,key) in productsArray" class="tableRow">
            <td>
              <span>{{product.message }}</span>
            </td>
            <td>
              <span>{{ product.date }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return{
            productsArray:[],
            expirationDays:null
        }
    },
    methods:{
       async getExpiratedProducts(days){
            try {
                const response=await axios.get(`http://localhost:3000/products/toExpirate/65bfdff8a75ffb8fb6be8937/${days}`)
                const products=response.data
                this.productsArray=products
            } catch (error) {
                console.log(error);
            }
        }
    },
    mounted(){
        this.getExpiratedProducts(31)
    }
};
</script>

<style scoped>
.mainContainer {
  background-color: #f0e7f7;
  height: 100vh;
}

.table-responsive {
  margin: 10px;
  background-color: #ffffff;
  padding: 5px;
  border: 1px solid white;
  box-shadow: 5px 5px 5px -5px rgba(0, 0, 0, 0.75);

}

.tableRow th {
  background-color: #ffffff;
  color: black;
}

.tableRow td {
  background-color: #ffffff;
  color: blck;
}
</style>
