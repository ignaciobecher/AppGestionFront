<template>
  <div>
    <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
    <div class="inputsContainer">
      <input v-model="startDate" type="date" name="" id="" />
      <input v-model="endDate" type="date" name="" id="" />
      <button
        style="background-color: #149c68"
        @click="filterDates"
        :class="{ blink: isFilterClicked }"
      >
        Filtrar <i class="bi bi-filter-circle"></i>
      </button>
      <button
        style="background-color: #d02941"
        @click="removeFilters"
        :class="{ blink: isRemoveFiltersClicked }"
      >
        Quitar filtros <i class="bi bi-x-circle"></i>
      </button>
    </div>
  </div>
</template>

<script>
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
import axios from "axios";
import moment from "moment";

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
        labels: [],
        datasets: [{ data: [] }],
      },
      chartOptions: {
        responsive: true,
      },
      startDate: "",
      endDate: "",
      isFilterClicked: false,
      isRemoveFiltersClicked: false,
    };
  },
  methods: {
    async getAllSales(startDate, endDate) {
      let url =
        "https://api-gestion-ahil.onrender.com/business/salesByDay/65931333d7c90d26950f7332";

      if (startDate && endDate) {
        url += `?startDate=${startDate}&endDate=${endDate}`;
      }

      const response = await axios.get(url);
      const sales = response.data;

      const labels = [];
      const salesData = [];

      for (const date in sales) {
        const formateDate=this.formatDate(date)
        labels.push(formateDate);

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
            label: "Ventas diarias",
            backgroundColor: "#5c39f5",
            data: salesData,
          },
        ],
      };
    },
    filterDates() {
      this.isFilterClicked = true;
      this.getAllSales(this.startDate, this.endDate);
      setTimeout(() => {
        this.isFilterClicked = false;
      }, 500);
    },
    removeFilters() {
      this.isRemoveFiltersClicked = true;
      this.startDate = "";
      this.endDate = "";
      this.getAllSales();
      setTimeout(() => {
        this.isRemoveFiltersClicked = false;
      }, 500);
    },
    formatDate(date){
      return moment(date).format('DD-MM-YYYY');
    }
  },
  mounted() {
    this.getAllSales();
  },
};
</script>

<style scoped>
#my-chart-id {
  margin: 10px;
  background-color: #1a1a1a;
  border-radius: 15px;
}

.inputsContainer {
  margin: 10px;
}

.inputsContainer input {
  padding: 5px;
  border: none;
  margin: 5px;
  border-radius: 15px;
  font-size: 15px;
  font-weight: bold;
}

.inputsContainer button {
  padding: 5px;
  border: none;
  margin: 5px;
  border-radius: 15px;
  font-size: 15px;
  font-weight: bold;
}

.blink {
  animation: blinkAnimation 0.2s alternate;
}

@keyframes blinkAnimation {
  from {
    opacity: 1;
  }
  to {
    opacity: 0.5;
  }
}
</style>
