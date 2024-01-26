<template>
  <div class="sales-container">
    <div class="productsContainer">
      <productComponent v-if="salesVisibility"></productComponent>
      <salesListComponent v-if="listVisibility"></salesListComponent>
    </div>

    <div>
      <button @click="changeVisibilityFunction" class="ventas-button">
        Ventas
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
    };
  },
  methods: {
    changeVisibilityFunction() {
      this.salesVisibility = !this.salesVisibility;
      this.listVisibility = !this.listVisibility;
    },
  },
};
</script>

<style scoped>
.sales-container {
  display: grid;
  grid-template-columns: 90% 10%;
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
