<template>
  <informContainer></informContainer>
  <div style="display: flex">
    <pieChart class="chart"></pieChart>
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
.chart {
  width: 50%;
  background-color: #1a1a1a;
  margin: 10px;
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
