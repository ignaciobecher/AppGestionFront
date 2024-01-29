<template>
  <div class="chartContainer">
      <h4 style="text-align: center; padding: 5px">Ingresos/Egresos</h4>
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
          "https://api-gestion-ahil.onrender.com/business/outputs/65931333d7c90d26950f7332"
        );
        const inputs = await axios.get(
          "https://api-gestion-ahil.onrender.com/inputs/65931333d7c90d26950f7332"
        );
        const buys = await axios.get(
          "https://api-gestion-ahil.onrender.com/business/buys/65931333d7c90d26950f7332"
        );
        const sales = await axios.get(
          "https://api-gestion-ahil.onrender.com/business/sales/65931333d7c90d26950f7332"
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

}

.pieChart {
  padding: 10px;
}
</style>
