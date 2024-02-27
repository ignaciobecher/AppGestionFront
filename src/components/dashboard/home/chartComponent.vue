<template>
  <div class="mainContainer">
    <div class="btns">
      <button
        style="margin-left: 10px; padding: 5px; border: none"
        @click="getSalesDay"
      >
        Ventas diarias
      </button>
      <button
        style="margin-left: 10px; padding: 5px; border: none"
        @click="getQuantityOfProductsSold"
      >
        Productos vendidos
      </button>
      <button
        style="margin-left: 10px; padding: 5px; border: none"
        @click="getTotalOfSales"
      >
        Totales de ventas
      </button>
    </div>

    <div>
      <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
    </div>
  </div>
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
import registerComponent from "../Auth/registerComponent.vue";

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
      const businessId= localStorage.getItem('businessId')
        const sales = await axios.get(
          `http://localhost:3000/business/salesByDay/${businessId}`
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
              label: "Cantidad de ventas",
              backgroundColor: "#fbce1d", // Color de las barras
              data: salesData, // Establecer los datos de ventas
            },
          ],
        };
      } catch (error) {
        console.error("Error al obtener los datos de ventas:", error);
      }
    },

    async getQuantityOfProductsSold() {
      try {
      const businessId= localStorage.getItem('businessId')
        const sales = await axios.get(
          `http://localhost:3000/business/salesByDay/${businessId}`
        );
        const data = sales.data;

        const labels = []; // Array para almacenar las fechas
        const productsData = []; // Array para almacenar la cantidad total de productos vendidos por día

        for (const date in data) {
          labels.push(date);
          // Calculamos el total de productos vendidos por día sumando las longitudes de los arrays productIds de cada venta
          const totalProducts = data[date].reduce(
            (acc, sale) => acc + sale.productIds.length,
            0
          );
          productsData.push(totalProducts);
        }

        this.chartData = {
          labels: labels, // Establecer las fechas como etiquetas
          datasets: [
            {
              label: "Cantidad de productos vendidos",
              backgroundColor: "#fbce1d", // Color de las barras
              data: productsData, // Establecer los datos de ventas
            },
          ],
        };

        return { labels, productsData };
      } catch (error) {
        console.error("Error al obtener las ventas por día: ", error);
        // Manejar el error adecuadamente
      }
    },

    async getTotalOfSales(startDate, endDate) {
      const businessId= localStorage.getItem('businessId')
      let url =
        `http://localhost:3000/business/salesByDay/${businessId}`;

      if (startDate && endDate) {
        url += `?startDate=${startDate}&endDate=${endDate}`;
      }

      const response = await axios.get(url);
      const sales = response.data;

      const labels = [];
      const salesData = [];

      for (const date in sales) {
        // const formateDate=this.formatDate(date)
        labels.push(date);

        // Calcular el total en dinero para cada fecha
        const totalMoney = sales[date].reduce(
          (acc, sale) => acc + sale.total,
          0
        );
        salesData.push(totalMoney);
      }

      this.chartData = {
        labels: labels,
        datasets: [
          {
            label: "Total en ventas",
            backgroundColor: "#fbce1d",
            data: salesData,
          },
        ],
      };
    },
  },
  mounted() {
    this.getSalesDay();
  },
};
</script>

<style scoped>
.mainContainer{
  background-color:#ffffff ;
  box-shadow: 5px 5px 5px -5px rgba(0, 0, 0, 0.75);
  margin-left: 10px;
}

#my-chart-id {
  background-color: #ffffff;
  margin: 10px;
}

.btns button {
  background-color: #b28cc4;
  margin-top: 10px;
}
</style>
