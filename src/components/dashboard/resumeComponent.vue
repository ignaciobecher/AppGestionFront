<template>

  <div style="background-color: #dfd9a7;" class="info-container">
    <h1> <i class="bi bi-cash"></i>Balance actual</h1>
    <h1>{{formatPrice(totalBalance)}}</h1>
    <div class="button-container">
      <button>Asistente virtual</button>
      <br />
      <a href="">Controlar con inteligencia artificial</a>
    </div>
  </div>

  <div style="background-color: #dfd9a7;" class="info-container">
    <h1> <i class="bi bi-boxes"></i>Stock actual</h1>
    <h1>520</h1>
    <div class="button-container">
      <button>Asistente virtual</button>
      <br />
      <a href="">Controlar con inteligencia artificial</a>
    </div>
  </div>

  <div style="background-color: #dfd9a7;" class="info-container">
    <h1> <i class="bi bi-bag"></i>Ventas de hoy</h1>
    <h1>150</h1>
    <div class="button-container">
      <button>Asistente virtual</button>
      <br />
      <a href="">Controlar con inteligencia artificial</a>
    </div>
  </div>

  
  
</template>

<script>
import axios from 'axios'
import numeral from 'numeral';
export default {
  data(){
    return{
      totalBalance:0
    }
  },
  methods:{
    async getBalance(){
      const sales=await axios.get('http://localhost:3000/business/salesTotal/65931333d7c90d26950f7332')
      const data=sales.data
      this.totalBalance=data
    },
    formatPrice(price){
      return numeral(price).format(	'$0,0.00')
    }
  },
  mounted(){
    this.getBalance()
  }
};
</script>

<style scoped>
.info-container {
  border-radius: 15px;
  padding: 10px;
  margin: 10px;
}

.info-container h1 {

  color: black;
}



.info-container button {
  background-color: #5c39f5;
  border: none;
  border-radius: 15px;
  padding: 10px;
  font-size: 20px;
  margin-bottom: 10px;
}

.info-container a {
  text-decoration: underline;
  color: black;
}
</style>
