<template>
  <div class="chartContainer">
      <h4>Ingresos/Egresos</h4>
      <pie-chart
        class="pieChart"
        :data="[
          ['Egresos', outputTotal],
          ['Ingresos', inputTotal],
          ['Compras', buysTotal],
          ['Ventas', salesTotal],
        ]"
      ></pie-chart>
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
      outputTotal: 0,
      inputTotal: 0,
      buysTotal: 0,
      salesTotal: 0,
    };
  },
  methods: {
    async getBalanceTotals() {
      try {
        const outputs = await axios.get(
          "https://api-gestion-ahil.onrender.com/business/outputs/65bfdff8a75ffb8fb6be8937"
        );
        const inputs = await axios.get(
          "https://api-gestion-ahil.onrender.com/inputs/65bfdff8a75ffb8fb6be8937"
        );
        const buys = await axios.get(
          "https://api-gestion-ahil.onrender.com/business/buys/65bfdff8a75ffb8fb6be8937"
        );
        const sales = await axios.get(
          "https://api-gestion-ahil.onrender.com/business/sales/65bfdff8a75ffb8fb6be8937"
        );

        //Egresos
        const totalOutputsValue = outputs.data.reduce(
          (total, output) => total + output.value,
          0
        );
        this.outputTotal = totalOutputsValue;

        //Ingresos
        const totalInputsValue = inputs.data.reduce(
          (total, input) => total + input.value,
          0
        );
        this.inputTotal = totalInputsValue;

        //Compras
        const totalBuysValue = buys.data.reduce(
          (total, buy) => total + buy.price,
          0
        );
        this.buysTotal = totalBuysValue;

        //Ventas
        const totalSalesValue = sales.data.reduce(
          (total, sale) => total + sale.total,
          0
        );
        this.salesTotal = totalSalesValue;

        console.log(
          this.outputTotal,
          this.inputTotal,
          this.buysTotal,
          this.salesTotal
        );
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.getBalanceTotals();
  },
};
</script>

<style scoped>
.chartContainer {
  margin-left: 10px;
  box-shadow: 5px 5px 5px -5px rgba(0, 0, 0, 0.75);
  background-color: #ffffff !important;

}


.chartContainer h4{
  background-color: #ffffff;
  text-align: center;
  margin: 0;
  font-weight: bold;
}

.pieChart {
  background-color: #ffffff;
  padding: 10px
}
</style>
