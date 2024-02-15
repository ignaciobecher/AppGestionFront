<template>
  <div class="dashboard-container">
    <div class="sidebar-container">
      <div class="sidebar">
        <div class="img-logo">
          <img style="width: 150px" src="../assets/3.png" alt="" />
          <p>Cuyo Software</p>
        </div>

        <div class="nav-links">
          <a href="#" @click="togglePage('home')"
            ><i class="bi bi-house"></i> Inicio
          </a>
          <a href="#" @click="togglePage('sales')"
            ><i class="bi bi-cart"></i> Ventas</a
          >
          <a href="#" @click="togglePage('inputs')"
            ><i class="bi bi-arrow-down-left-circle"></i> Ingresos</a
          >
          <a href="#" @click="togglePage('buys')"
            ><i class="bi bi-arrow-up-right-circle"></i> Gastos</a
          >
          <a href="#" @click="togglePage('stock')"
            ><i class="bi bi-box-seam"></i> Productos</a
          >

          <a href="#" @click="togglePage('inform')"
            ><i class="bi bi-bar-chart"></i> Informe</a
          >
          <a href=""
            ><i class="bi bi-person-arms-up"></i> Asistente inteligente</a
          >
        </div>
      </div>
    </div>

    <div class="pages-container">
      <home-page v-if="homePage"></home-page>
      <sale-page v-if="salesPage"></sale-page>
      <inputs-page v-if="inputPage"></inputs-page>
      <out-puts-page v-if="outPage"></out-puts-page>
      <stock-page v-if="stockPage"></stock-page>
      <inform-page v-if="informPage"></inform-page>
    </div>
  </div>
</template>

<script>
import informPage from "../pages/informPage.vue";
import inputsPage from "@/pages/inputsPage.vue";
import outPutsPage from "@/pages/outPutsPage.vue";
import homePage from "../pages/homePage.vue";
import salePage from "../pages/salePage.vue";
import stockPage from "../pages/stockPage.vue";

export default {
  components: {
    homePage,
    salePage,
    outPutsPage,
    stockPage,
    inputsPage,
    informPage,
  },
  data() {
    return {
      homePage: true,
      salesPage: false,
      outPage: false,
      stockPage: false,
      inputPage: false,
      informPage: false,
    };
  },
  methods: {
    togglePage(page) {
      this.homePage = page === "home";
      this.salesPage = page === "sales";
      this.outPage = page === "buys";
      this.stockPage = page === "stock";
      this.inputPage = page === "inputs";
      this.informPage = page === "inform";
    },
  },
};
</script>

<style scoped>
.dashboard-container {
  display: grid;
  grid-template-columns: 20% 80%;
  width: 100%;
  height: 100%;
}

.sidebar-container {
  background-color: #292a31;
  border-right: 1px solid rgb(55, 54, 54);
}

.pages-container {
  background-color: #292a31;
  color: white;
}

.img-logo {
  p {
    margin-left: 10px;
    font-size: 30px;
    color: white;
  }
}
.nav-links {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 10px;
  row-gap: 30px;
}

.nav-links i {
  font-size: 25px;
}

.nav-links {
  a {
    font-size: 20px;
    text-decoration: none;
    color: white;
    font-weight: lighter;
    transition: color 0.5s, font-size 0.5s;
  }
}

.nav-links a:hover {
  color: #5c39f5;
  font-size: 22px;
}

.active {
  color: #5c39f5 !important;
}
</style>
