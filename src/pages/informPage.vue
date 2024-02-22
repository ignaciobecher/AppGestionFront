<template>
  <informContainer class="resume"></informContainer>
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
</template>

<script>
import monthSalesChart from "@/components/dashboard/inform/monthSalesChartcomponent.vue";
import columnChart from "@/components/dashboard/inform/columnChartComponent.vue";
import pieChart from "@/components/dashboard/inform/pieChartComponent.vue";
import informContainer from "../components/dashboard/inform/informComponent.vue";
import accountContainer from "../components/dashboard/inform/accountComponent.vue";
export default {
  components: {
    informContainer,
    pieChart,
    columnChart,
    monthSalesChart,
    accountContainer,
  },
  data() {
    return {
      monthChart: false,
      dayChart: true,
    };
  },
  methods: {
    async changeChartVisibility() {
      this.monthChart = !this.monthChart;
      this.dayChart = !this.dayChart;
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

.graphics{
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
</style>
