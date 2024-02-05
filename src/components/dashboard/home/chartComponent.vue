<template>
  <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>

<script>
import axios from "axios";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);
export default {
  name: "BarChart",
  components: { Bar },
  data() {
    return {
      chartData: {
        labels: [], // Aquí se almacenarán las fechas
        datasets: [{ data: [] }], // Aquí se almacenarán las cantidades de ventas
      },
      chartOptions: {
        responsive: true,
      },
    };
  },
  methods: {
    async getSalesDay() {
      try {
        const sales = await axios.get(
          "https://api-gestion-ahil.onrender.com/business/salesByDay/65bfdff8a75ffb8fb6be8937"
        );
        const data = sales.data;

        const labels = []; // Array para almacenar las fechas
        const salesData = []; // Array para almacenar las cantidades de ventas

        for (const date in data) {
          labels.push(date); // Agregar la fecha al array de etiquetas
          salesData.push(data[date].length); // Agregar la cantidad de ventas al array de datos
        }

        this.chartData = {
          labels: labels, // Establecer las fechas como etiquetas
          datasets: [
            {
              label: "Ultimas ventas",
              backgroundColor: "#5c39f5", // Color de las barras
              data: salesData, // Establecer los datos de ventas
            },
          ],
        };
      } catch (error) {
        console.error("Error al obtener los datos de ventas:", error);
      }
    },
  },
  mounted() {
    this.getSalesDay();
  },
};
</script>

<style scoped>
#my-chart-id {
  background-color: #1a1a1a;
  margin: 10px;
  border-radius: 15px;
}
</style>
