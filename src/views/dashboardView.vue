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
          <a href="#" @click="togglePage('buys')"><i class="bi bi-bag-dash"></i> Compras</a>
          <a href="#" @click="togglePage('stock')" ><i class="bi bi-box-seam"></i> Stock</a>

          <a href=""><i class="bi bi-bar-chart"></i> Informe</a>
          <a href=""
            ><i class="bi bi-person-arms-up"></i> Asistente inteligente</a
          >
        </div>
      </div>
    </div>

    <div class="pages-container">
      <home-page v-if="homePage"></home-page>
      <sale-page v-if="salesPage"></sale-page>
      <buy-page v-if="buysPage"></buy-page>
      <stock-page v-if="stockPage"></stock-page>
    </div>
  </div>
</template>

<script>
import buyPage from "@/pages/buyPage.vue";
import homePage from "../pages/homePage.vue";
import salePage from "../pages/salePage.vue";
import stockPage from '../pages/stockPage.vue'
import sidebar from "../components/dashboard/sidebarComponent.vue";

export default {
  components: {
    sidebar,
    homePage,
    salePage,
    buyPage,
    stockPage
  },
  data() {
    return {
      homePage: true,
      salesPage: false,
      buysPage:false,
      stockPage:false
    };
  },
  methods: {
  
    togglePage(page) {
      this.homePage = page === "home";
      this.salesPage = page === "sales";
      this.buysPage= page === 'buys'
      this.stockPage= page=== 'stock'
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
