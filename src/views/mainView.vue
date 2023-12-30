<template>
  <div class="view-main">
    <router-link to="/sales">
      <mainCategoryComponent class="categoryComponent">
        <template v-slot:main> Ventas </template>
      </mainCategoryComponent>
    </router-link>

    <mainCategoryComponent class="categoryComponent">
      <template v-slot:main>Compras</template>
    </mainCategoryComponent>

    <mainCategoryComponent class="categoryComponent">
      <template v-slot:main>Gastos</template>
    </mainCategoryComponent>

    <router-link to="/stock">
      <mainCategoryComponent class="categoryComponent">
        <template v-slot:main>Stock</template>
      </mainCategoryComponent>
    </router-link>
  </div>
</template>

<script>
import mainCategoryComponent from "../components/mainComponents/mainCategoryComponent.vue";
import secondaryCategory from "../components/mainComponents/secondaryCategoryComponent.vue";
export default {
  components: {
    mainCategoryComponent,
    secondaryCategory,
  },
};
</script>

<style scoped>
.view-main {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 15px;
  row-gap: 15px;
  padding: 15px;
  margin-top: 50px;
}

.categoryComponent {
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out,
    background-color 0.3s ease-in-out;
}

.categoryComponent:hover {
  transform: scale(1.05); /* Cambia el tamaño al pasar el cursor */
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
  background-color: #046499;
}
</style>
