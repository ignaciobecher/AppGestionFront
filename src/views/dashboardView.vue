<template>
  <div class="dashboard-container">
    <div class="sidebar-container">
      <div class="sidebar">
        <div class="img-logo">
          <img style="width: 150px; " src="../assets/3.png" alt="" />
          <p>{{ businessName }}</p>
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
            ><i class="bi bi-person-arms-up"></i> Asistente </a
          >
          <a @click="logoutUser" href="#"
            ><i class="bi bi-person-arms-up"></i> Cerrar sesion </a
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
import axios from "axios";

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
      businessName:''
    };
  },
  methods: {
    async getBusinessInfo(){
      try {
        const businessId=localStorage.getItem('businessId')
        const response=await axios.get(`http://localhost:3000/business/${businessId}`)
        const business=response.data

        const name=business.name

        this.businessName=name
      } catch (error) {
        throw error
      }
    },
    togglePage(page) {
      this.homePage = page === "home";
      this.salesPage = page === "sales";
      this.outPage = page === "buys";
      this.stockPage = page === "stock";
      this.inputPage = page === "inputs";
      this.informPage = page === "inform";
    },
    logoutUser() {
      // Eliminar el token del localStorage
      localStorage.removeItem('userToken');
      localStorage.removeItem('businessId')
      localStorage.removeItem('userId')
      this.$router.push('/register');
    },
  },
  mounted(){
    this.getBusinessInfo()
  }
};
</script>

<style scoped>
.dashboard-container {
  display: grid;
  grid-template-columns: 20% 80%;
  width: 100%;
  background-color: #f0e7f7;

}

.sidebar-container {
  background-color: #262042;
  border-right: 1px solid rgb(55, 54, 54);

}



.pages-container {
  background-color: #f0e7f7;
  height: 100%;
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
  justify-content: center;
  row-gap: 30px;
}

.nav-links i {
  font-size: 25px;
}

.nav-links {
  a {
    font-size: 25px;
    text-decoration: none;
    color: white;
    font-weight: 400;
    transition: color 0.5s, font-size 0.5s;
    width: 100%;
    padding-left: 20px;
  }
}

.nav-links a:hover {
  color: #5c39f5;
  background-color: #5c39f5;
  color: white;
  font-size: 26px;
}

.active {
  color: #5c39f5 !important;
}
</style>
