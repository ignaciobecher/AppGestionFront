<template>
  <informContainer></informContainer>
  <div style="display: flex">
    <pieChart class="chart"></pieChart>
    <columnChart class="chart"></columnChart>
  </div>
</template>

<script>
import columnChart from "@/components/dashboard/inform/columnChartComponent.vue";
import pieChart from "@/components/dashboard/inform/pieChartComponent.vue";
import informContainer from "../components/dashboard/inform/informComponent.vue";
export default {
  components: {
    informContainer,
    pieChart,
    columnChart
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
</style>
