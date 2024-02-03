<template>
  <div class="sales-container">
    <div class="productsContainer">
      <productComponent v-if="salesVisibility"></productComponent>
      <salesListComponent v-if="listVisibility"></salesListComponent>
    </div>

    <div>
      <button @click="changeVisibilityFunction" class="ventas-button">
        {{ text }}
      </button>
    </div>
  </div>
</template>

<script>
import productComponent from "@/components/dashboard/sales/productComponent.vue";
import salesListComponent from "../components/dashboard/sales/salesListComponent.vue";
export default {
  components: {
    productComponent,
    salesListComponent,
  },
  data() {
    return {
      salesVisibility: true,
      listVisibility: false,
      text: "Detalle de ventas",
    };
  },
  methods: {
    changeVisibilityFunction() {
      if (this.salesVisibility) {
        this.text='Volver a ventas'
        this.salesVisibility=false
        console.log(this.salesVisibility);
        this.listVisibility=true
      } else if(!this.salesVisibility) {
        this.text = "Detalle de ventas";
        this.listVisibility=false
        this.salesVisibility=true
      }
    },
  },
};
</script>

<style scoped>
.sales-container {
  display: grid;
  grid-template-columns: 80% 20%;
}

.productsContainer {
  grid-column: 1;
}
.ventas-button {
  margin: 10px;
  padding: 8px;
  font-size: 15px;
  font-weight: bold;
  border: none;
  border-radius: 15px;
  width: 90%;
  grid-column: 2;
}
</style>
