<template>
  <div class="chartContainer">
    <h4 style="text-align: center; padding: 5px">Top de ventas</h4>
    <column-chart
      :data="[
        ['Sun', 32],
        ['Mon', 46],
        ['Tue', 28],
      ]"
    ></column-chart>
  </div>
</template>

<script>
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "vue-chartjs";

ChartJS.register(ArcElement, Tooltip, Legend);
export default {
  components: {
    Pie,
  },
  data() {
    return {
      salesArray: [],
    };
  },
  methods: {
    async getSales() {
      try {
        const sales = await axios.get(
          "http://localhost:3000/business/sales/65931333d7c90d26950f7332"
        );
        this.salesArray = sales.data;

        // Obtén las horas de venta
        const saleHours = this.salesArray.map((sale) =>
          new Date(sale.createdAt).getHours()
        );

        // Realiza un conteo de la frecuencia de cada hora
        const hourFrequency = saleHours.reduce((acc, hour) => {
          acc[hour] = (acc[hour] || 0) + 1;
          return acc;
        }, {});

        // Encuentra la hora con la frecuencia más alta
        const mostFrequentHour = Object.keys(hourFrequency).reduce((a, b) =>
          hourFrequency[a] > hourFrequency[b] ? a : b
        );

        console.log("Hora de venta más frecuente:", mostFrequentHour);
      } catch (error) {
        console.log(error);
      }
    },
    mounted() {
      this.getSales();
    },
  },
};
</script>

<style scoped>
.chartContainer {
  margin-left: 10px;
}

.pieChart {
  padding: 10px;
}
</style>
