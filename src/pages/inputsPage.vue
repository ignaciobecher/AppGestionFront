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
      Ingresos de tu negocio
      </h1>
      <div class="mainBtns">
        <button @click="showInputs" class="btnOutput">
          Ingresos de dinero <i class="bi bi-arrow-down-left"></i>
        </button>
        <button @click="showRandomInputs" class="btnSales">
          Ingresos varios<i class="bi bi-bag"></i>
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
        un lado tener los egresos de dinero y por el otro tus compras hechas.
      </p>
    </div>
  </div>

  <inputsComponent v-if="inputState"></inputsComponent>
  <randomInputsComponent v-if="randomState"></randomInputsComponent>
</template>

<script>
import inputsComponent from "../components/dashboard/inputs/inputComponent.vue";
import randomInputsComponent from "@/components/dashboard/inputs/randomInputsComponent.vue";
export default {
  components: {
    inputsComponent,
    randomInputsComponent,
  },
  data() {
    return {
      inputState: false,
      randomState: false,
      btn:false,
      selector:true
    };
  },
  methods:{
    goBackFunction(){
        this.inputState=false
        this.randomState=false
        this.btn=false
        this.selector=true
    },
    showInputs(){
        this.inputState=true
        this.randomState=false
        this.selector=false
        this.btn=true
    },
    showRandomInputs(){
      this.inputState=false
      this.randomState=true
      this.selector=false
      this.btn=true
    }
  }
};
</script>


<style scoped>

.mainBtns {
  text-align: center;
  margin: 0 auto;
  margin-top: 150px;
}

.btnOutput {
  margin-right: 100px;
  width: 30%;
  border-radius: 25px;
  border: none;
  padding: 10px;
  font-size: 20px;
  font-weight: bold;
  transition: transform 0.3s ease, background-color 0.3s ease;
  background-color: #d02941;
}

.btnSales {
  margin-right: 100px;
  width: 30%;
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