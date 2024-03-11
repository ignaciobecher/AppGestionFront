<template>
  <div class="main-container">
    <informContainer class="resume"></informContainer>
    <div class="assistentComponent">
      <h4>Asistente virtual</h4>
      <input
        type="text"
        v-model="question"
        placeholder="Ingresa tu consulta sobre los ingresos..."
      />
      <button @click="askGpt">Consultar</button>
      <p v-html="formattedResponse()"></p>
    </div>

    <div class="secondContainer">
      <pieChart class="chart"></pieChart>
      <div class="graphics">
        <columnChart v-show="dayChart"></columnChart>
        <monthSalesChart v-show="monthChart"></monthSalesChart>
        <button class="visibilityBtn" @click="changeChartVisibility">
          Mes/Día
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import monthSalesChart from "@/components/dashboard/inform/monthSalesChartcomponent.vue";
import columnChart from "@/components/dashboard/inform/columnChartComponent.vue";
import pieChart from "@/components/dashboard/inform/pieChartComponent.vue";
import informContainer from "../components/dashboard/inform/informComponent.vue";
import axios from "axios";
const businessId = localStorage.getItem("businessId");

export default {
  components: {
    informContainer,
    pieChart,
    columnChart,
    monthSalesChart,
  },
  data() {
    return {
      monthChart: false,
      dayChart: true,
      question: "",
      respuesta: "",
      information: [],
    };
  },
  methods: {
    async changeChartVisibility() {
      this.monthChart = !this.monthChart;
      this.dayChart = !this.dayChart;
    },
    async askGpt() {
      try {
        const sales = await axios.get(
          `https://api-gestion-ahil.onrender.com/business/salesTotal/${businessId}`
        );
        const salesData = sales.data;

      
        const response = await axios.post(
          `https://api-gestion-ahil.onrender.com/chat-gpt`,
          {
            message:this.question,
            info: this.information,
          }
        );
        const data = response.data;

        this.respuesta = data;
      } catch (error) {
        throw error;
      }
    },

    formattedResponse() {
      return this.respuesta.split("*").join("*<br/><br/>");
    },
  },
};
</script>

<style scoped>
.secondContainer {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.chart {
  margin-right: 5px;
}

.graphics {
  background-color: #ffffff;
  box-shadow: 5px 5px 5px -5px rgba(0, 0, 0, 0.75);
  width: 98%;
}

.resume {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

.visibilityBtn {
  margin: 10px;
  border: none;
  padding: 10px;
  font-size: 15px;
  font-weight: bold;
  background-color: #b28cc4;
}

.assistentComponent {
  background-color: #ffffff;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px;
  box-shadow: 4px 4px 5px -4px rgba(0, 0, 0, 0.75);
  overflow-y: auto;
  max-height: 212px;
}

.assistentComponent input {
  width: 100%;
}

.assistentComponent button {
  width: 50%;
  border: none;
  border-radius: 0%;
  background-color: #574f7a;
  font-size: 20px;
  font-weight: 500;
  color: white;
  margin-top: 10px;
}

/* //RESPONSIVE PARA TELEFONO-****************************************************************** */
@media screen and (max-width: 768px) {
  /* .main-container{
    display: flex;
    flex-direction: column;
  } */

  .secondContainer{
    display: flex;
    flex-direction: column;
  }

  .graphics{
    margin-top: 10px;
    margin-left: 10px;
  }
}
</style>