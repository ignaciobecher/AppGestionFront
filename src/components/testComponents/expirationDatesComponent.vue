<template>
  <div class="mainContainer">
    <div style="display: flex; background-color: #292a31" class="backBtn">
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
      <h4 style="color: white; margin-top: 15px">Productos por vencer</h4>
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
            productsArray:[]
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
  background-color: #292a31;
  height: 100vh;
}

.table-responsive {
  margin: 10px;
  background-color: #1a1a1a;
  border-radius: 15px;
  padding: 5px;
  border: 1px solid white;
}

.tableRow th {
  background-color: #1a1a1a;
  color: white;
}

.tableRow td {
  background-color: #1a1a1a;
  color: white;
}
</style>
