<template>
  <div>
    <div @click="goBackFunction" class="backBtn" v-if="btn">
      <i style="font-size: 30px;margin-left: 10px; " class="bi bi-arrow-left"></i>
    </div>

    <div v-if="selector" class="selector">
      <h1 style="text-align: center; margin-top: 20px; margin-right: 10%">
      Ingresos de tu negocio
      </h1>
      <div class="mainBtns">
        <button @click="showInputs" class="btnSales">
          Ingresos  <i class="bi bi-arrow-down-left"></i>
        </button>
        <button @click="showRandomInputs" class="btnSales">
          Ingresos varios<i class="bi bi-bag"></i>
        </button>
      </div>
    </div>

    <div
      v-if="selector"
      class="pDescription"
      style="text-align: center; margin-top: 50px; display:grid; grid-template-columns: 1fr 1fr;"
    >
      <p>
        En ingresos encontras los ingresos de dinero de tu negocio
      </p>
      <p>
        En ingresos varios podes encontrar los ingresos de cualquier tipo que haya registrado tu negocio
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
  display: grid;
  grid-template-columns: 1fr 1fr ;
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

/* //RESPONSIVE PARA TELEFONO-****************************************************************** */
@media screen and (max-width: 768px){
  .mainBtns{
    display: flex;
    flex-direction: column;
    margin-top: 80px;
  }
}
</style>