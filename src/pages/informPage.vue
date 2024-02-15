<template>
  <informContainer></informContainer>
  <div class="secondContainer">
    <pieChart class="chart"></pieChart>
    <div class="chart">
      <accountContainer></accountContainer>
    </div>
  </div>
  <button class="visibilityBtn" @click="changeChartVisibility">Mes/Día</button>
  <columnChart v-show="dayChart"></columnChart>
  <monthSalesChart v-show="monthChart"></monthSalesChart>
</template>

<script>
import monthSalesChart from "@/components/dashboard/inform/monthSalesChartcomponent.vue";
import columnChart from "@/components/dashboard/inform/columnChartComponent.vue";
import pieChart from "@/components/dashboard/inform/pieChartComponent.vue";
import informContainer from "../components/dashboard/inform/informComponent.vue";
import accountContainer from '../components/dashboard/inform/accountComponent.vue'
export default {
  components: {
    informContainer,
    pieChart,
    columnChart,
    monthSalesChart,
    accountContainer
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
.secondContainer{
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.chart {
  background-color: #1a1a1a;
  margin: 5px;
  border-radius: 15px;
}

.visibilityBtn{
  margin: 10px;
  border: none;
  border-radius: 15px;
  padding: 10px;
  font-size: 15px;
  font-weight: bold;
}
</style>
