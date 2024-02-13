<template>
  <div class="sales-container">
    <div v-if="btn" class="backBtn">
      <button @click="goBackFunction"
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
    </div>
    <div class="selector">
      <h1 v-if="homePage" style="text-align: center; margin-top: 20px; margin-right: 10%">
        Sección ventas
      </h1>
      <div v-if="homePage" class="mainBtns">
        <button class="btnSales" @click="mostrarDeudores">
          Cuentas corrientes <i class="bi bi-file-person"></i>
        </button>
        <button class="btnSales" @click="mostrarVentas">Vender <i class="bi bi-basket2"></i></button>

        <button class="btnSales" @click="mostrarLista">Ventas <i class="bi bi-card-list"></i></button>
      </div>
    </div>

    <div v-if="homePage" class="pDescription" style="text-align: center; margin-top: 50px">
      <p>
        En este apartado se encuentran las ventas realizadas, cuentas corrientes
        y el menu de realizar ventas de tu negocio.
      </p>
    </div>
  </div>
  <productComponent v-if="ventas"></productComponent>
  <salesListComponent v-if="listaDeVentas"></salesListComponent>
  <debtsComponent v-if="deudores"></debtsComponent>
</template>

<script>
import productComponent from "@/components/dashboard/sales/productComponent.vue";
import salesListComponent from "../components/dashboard/sales/salesListComponent.vue";
import debtsComponent from '../components/dashboard/sales/debtsComponent.vue'
export default {
  components: {
    productComponent,
    salesListComponent,
    debtsComponent
  },
  data() {
    return {
      btn: false,
      cuentasCorrientes: false,
      ventas: false,
      listaDeVentas: false,
      homePage:true,
      deudores:false
    };
  },
  methods: {
    mostrarVentas(){
      this.homePage=false
      this.btn=true
      this.ventas=true
      this.deudores=false
      this.listaDeVentas=false
    },
    mostrarLista(){
      this.homePage=false
      this.btn=true
      this.listaDeVentas=true
      this.ventas=false
      this.deudores=false
    },
    mostrarDeudores(){
      this.homePage=false
      this.btn=true
      this.listaDeVentas=false
      this.deudores=true
      this.ventas=false
    },
    goBackFunction(){
      this.homePage=true
      this.btn=false
      this.ventas=false
      this.listaDeVentas=false
      this.deudores=false
    }
  },
};
</script>

<style scoped>
.mainBtns {
  text-align: center;
  margin: 0 auto;
  margin-top: 150px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

.btnSales {
  margin: 10px;
  width: 90%;
  border-radius: 25px;
  border: none;
  padding: 10px;
  font-size: 30px;
  font-weight: bold;
  transition: transform 0.3s ease, background-color 0.3s ease;
  background-color: #d02941;
}

.btnOutput:hover {
  transform: scale(1.1);
  background-color: #ec1a41;
}

.btnSales:hover {
  transform: scale(1.1);
  background-color: #ec1a41;
}

.btnOutput,
.btnSales i {
  font-size: 30px;
  font-weight: bolder;
}
</style>
