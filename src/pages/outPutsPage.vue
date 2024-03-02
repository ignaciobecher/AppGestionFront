<template>
  <div>
    <div @click="goBackFunction" class="backBtn" v-if="btn">
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
    </div>
    <div v-if="selector" class="selector">
      <h1 style="text-align: center; margin-top: 20px; margin-right: 10%">
        Gastos de tu negocio
      </h1>
      <div class="mainBtns">
        <button @click="showOutputs" class="btnSales">
          Egresos <i class="bi bi-arrow-up-right"></i>
        </button>
        <button @click="showCheques" class="btnSales">
          Cheques <i class="bi bi-bank"></i>
        </button>
        <button @click="showSales" class="btnSales">
          Compras <i class="bi bi-bag"></i>
        </button>
      </div>
    </div>

    <div
      v-if="selector"
      class="pDescription"
      style="text-align: center; margin-top: 50px"
    >
      <p>
        En este apartado se encuentran divididos los gastos de tu negocio, por
        un lado tener los egresos de dinero y por el otro tus compras hechas,
        como tambien tus cheques.
      </p>
    </div>

    <outputsComponent v-if="outputComponent"></outputsComponent>
    <buysComponent v-if="buysComponent"></buysComponent>
    <chequesComponent v-if="chequeComponent"></chequesComponent>
  </div>
</template>

<script>
import outputsComponent from "@/components/dashboard/outputs/outputsComponent.vue";
import buysComponent from "@/components/dashboard/outputs/buysComponent.vue";
import chequesComponent from "@/components/dashboard/outputs/chequesComponent.vue";
export default {
  components: {
    outputsComponent,
    buysComponent,
    chequesComponent,
  },
  data() {
    return {
      outputComponent: false,
      buysComponent: false,
      chequeComponent: false,
      selector: true,
      btn: false,
    };
  },
  methods: {
    showOutputs() {
      this.btn = true;
      this.outputComponent = true;
      this.selector = false;
    },
    showSales() {
      this.btn = true;
      this.buysComponent = true;
      this.selector = false;
      this.chequeComponent = false;
      this.chequeComponent = false;
    },
    showCheques() {
      this.btn = true;
      this.buysComponent = false;
      this.selector = false;
      this.outputComponent = false;
      this.chequeComponent = true;
    },
    goBackFunction() {
      this.buysComponent = false;
      this.outputComponent = false;
      this.chequeComponent = false;
      this.selector = true;
      this.btn = false;
    },
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
  width: 95%;
  height: 100px;
  box-shadow: 4px 4px 5px -4px rgba(0, 0, 0, 0.75);
  border: none;
  padding: 10px;
  font-size: 30px;
  font-weight: bold;
  transition: transform 0.3s ease, background-color 0.3s ease;
  background-color: #b28cc4 ;
}



.btnSales:hover {
  transform: scale(1.1);
  background-color: #63308e;
  color: white;
}



.btnSales i {
  font-size: 30px;
  font-weight: bolder;
  color:  #242445 
}

/* //RESPONSIVE CECLULAR********************************************************************* */
@media screen and (max-width: 768px){
  .mainBtns{
    display: flex;
    flex-direction: column;
    margin-top: 80px;
  }

}
</style>
