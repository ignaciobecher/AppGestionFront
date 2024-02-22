<template>
  <div>
    <div class="inputsContainer">
      <input v-model="startMonth" type="month" />
      <input v-model="endMonth" type="month" />
      <button
        style="background-color:#149c68 ;"
        @click="filterSalesByMonthRange"
        :class="{ 'blink': isFilterClicked }"
      >
        Filtrar <i class="bi bi-filter-circle"></i>
      </button>
      <button
        style="background-color: #d02941;"
        @click="removeFilters"
        :class="{ 'blink': isRemoveFiltersClicked }"
      >
        Quitar filtros <i class="bi bi-x-circle"></i>
      </button>
    </div>
    <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
   
  </div>
</template>


<script>
import { Bar } from "vue-chartjs";
import axios from "axios";
export default {
  name: "MonthlySalesChart",
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
      startMonth: "",
      endMonth: "",
      isFilterClicked: false,
      isRemoveFiltersClicked: false,
    };
  },
  methods: {
    async getAllSalesByMonthRange(startMonth, endMonth) {
      let url =
        "https://api-gestion-ahil.onrender.com/business/salesBySelectedMonths/65bfdff8a75ffb8fb6be8937";

      if (startMonth && endMonth) {
        url += `?startMonth=${startMonth}&endMonth=${endMonth}`;
      }

      const response = await axios.get(url);
      const salesByMonthRange = response.data;

      const labels = Object.keys(salesByMonthRange);
      const salesData = Object.values(salesByMonthRange);

      this.chartData = {
        labels: labels,
        datasets: [
          {
            label: "Ventas por mes",
            backgroundColor: "#5c39f5",
            data: salesData,
          },
        ],
      };
    },
    filterSalesByMonthRange() {
      this.isFilterClicked = true;
      this.getAllSalesByMonthRange(this.startMonth, this.endMonth);
      setTimeout(() => {
        this.isFilterClicked = false;
      }, 500);
    },
  },
  mounted() {
    this.getAllSalesByMonthRange();
  },
};
</script>

<style scoped>
.main {
  background-color: #ffffff;
  margin: 10px;
  height: 100;
}

#my-chart-id {
  background-color: #ffffff;
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
  font-size: 10px;
  font-weight: bold;
}

.inputsContainer button {
  padding: 5px;
  border: none;
  margin: 5px;
  border-radius: 15px;
  font-size: 10px;
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
