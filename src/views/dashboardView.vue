<template>
  <nav id="navbar" class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">{{ businessName }}</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a id="homeIdNav" class="nav-link" href="#" @click="togglePage('home')">Inicio </a>
        </li>
        <li class="nav-item">
          <a id="saleIdNav" class="nav-link" href="#" @click="togglePage('sales')">Ventas</a>
        </li>

        <li class="nav-item">
          <a id="inputIdNav" class="nav-link" href="#" @click="togglePage('inputs')"
            >Ingresos</a
          >
        </li>

        <li class="nav-item">
          <a id="outputIdNav" class="nav-link" href="#" @click="togglePage('buys')">Gastos</a>
        </li>

        <li class="nav-item">
          <a id="productIdNav" class="nav-link" href="#" @click="togglePage('stock')"
            >Productos</a
          >
        </li>

        <li class="nav-item">
          <a id="informIdNav" class="nav-link" href="#" @click="togglePage('inform')">Informe</a>
        </li>
        <li>
          <a id="noteIdNav" class="nav-link" href="#" @click="togglePage('notes')"> Notas</a>
        </li>
        <li>
          <a id="userIdNav" class="nav-link" href="#" @click="togglePage('user')"> Usuarios</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" @click="logoutUser">Cerrar sesión</a>
        </li>
      </ul>
    </div>
  </nav>

  <div class="dashboard-container">
    <div id="main" class="sidebar-container">
      <div class="sidebar">
        <div class="img-logo">
          <p>{{ businessName }}</p>
        </div>
        <p style="color: white; margin-left: 20px; font-size: 10px">
          {{ bussId }}
        </p>

        <div class="nav-links">
          <a id="homeId" class="nav-link" href="#" @click="togglePage('home')">
            <i class="bi bi-house"></i> Inicio</a
          >
          <a id="saleId" class="nav-link" href="#" @click="togglePage('sales')">
            <i class="bi bi-cart"></i> Ventas</a
          >
          <a
            id="inputId"
            class="nav-link"
            href="#"
            @click="togglePage('inputs')"
          >
            <i class="bi bi-arrow-down-left-circle"></i> Ingresos</a
          >

          <a
            id="outputId"
            class="nav-link"
            href="#"
            @click="togglePage('buys')"
          >
            <i class="bi bi-arrow-up-right-circle"></i> Gastos</a
          >

          <a
            id="productId"
            class="nav-link"
            href="#"
            @click="togglePage('stock')"
            ><i class="bi bi-box-seam"></i> Productos</a
          >
          <a
            id="informId"
            class="nav-link"
            href="#"
            @click="togglePage('inform')"
            ><i class="bi bi-bar-chart"></i> Informe</a
          >
          <a id="noteId" class="nav-link" href="#" @click="togglePage('note')">
            <i class="bi bi-card-checklist"></i> Notas</a
          >
          <a id="userId" class="nav-link" href="#" @click="togglePage('user')">
            <i class="bi bi-people"></i> Usuarios</a
          >
          <a @click="logoutUser" href="#"
            ><i class="bi bi-x-circle"></i> Cerrar sesion
          </a>
        </div>
      </div>
    </div>

    <div  class="pages-container">
      <home-page v-if="homePage"></home-page>
      <sale-page v-if="salesPage"></sale-page>
      <inputs-page v-if="inputPage"></inputs-page>
      <out-puts-page v-if="outPage"></out-puts-page>
      <stock-page v-if="stockPage"></stock-page>
      <inform-page v-if="informPage"></inform-page>
      <notes-page v-if="notePage"></notes-page>
      <users-page v-if="userPage"></users-page>
    </div>
  </div>
</template>

<script>
import usersPage from "@/pages/userPage.vue";
import notesPage from "@/pages/notesPage.vue";
import informPage from "../pages/informPage.vue";
import inputsPage from "@/pages/inputsPage.vue";
import outPutsPage from "@/pages/outPutsPage.vue";
import homePage from "../pages/homePage.vue";
import salePage from "../pages/salePage.vue";
import stockPage from "../pages/stockPage.vue";
import axios from "axios";
import SimpleCrypto from "simple-crypto-js";
import { secretKey } from "@/components/dashboard/Auth/registerComponent.vue";

export default {
  components: {
    homePage,
    salePage,
    outPutsPage,
    stockPage,
    inputsPage,
    informPage,
    notesPage,
    usersPage,
  },
  data() {
    return {
      homePage: true,
      salesPage: false,
      outPage: false,
      stockPage: false,
      inputPage: false,
      informPage: false,
      notePage: false,
      userPage: false,
      businessName: "",
      bussId: "",
      userRole: "",
    };
  },
  methods: {
    async getBusinessInfo() {
      try {
        const businessId = localStorage.getItem("businessId");
        const response = await axios.get(
          `http://localhost:3000/business/${businessId}`
        );
        const business = response.data;

        const name = business.name;
        const id = business.businessId;
        this.bussId = businessId;
        this.businessName = name;
      } catch (error) {
        throw error;
      }
    },
    checkRoles() {
      try {
        const simpleCrypto = new SimpleCrypto(secretKey);
        const role = localStorage.getItem("role");
        const decipherRole = simpleCrypto.decrypt(role);
        console.log("Role:", decipherRole);
        this.userRole = decipherRole;

        //Sidebar
        const informBtn = document.querySelector("#informId");
        const salesBtn = document.querySelector("#saleId");
        const outputsBtn = document.querySelector("#outputId");
        const inputsBtn = document.querySelector("#inputId");
        const productsBtn = document.querySelector("#productId");
        const notesBtn = document.querySelector("#noteId");
        const homeBtn = document.querySelector("#homeId");
        const userBtn=document.querySelector('#userId')


        //Navbar
        const informBtnNav = document.querySelector("#informIdNav");
        const salesBtnNav = document.querySelector("#saleIdNav");
        const outputsBtnNav = document.querySelector("#outputIdNav");
        const inputsBtnNav = document.querySelector("#inputIdNav");
        const productsBtnNav = document.querySelector("#productIdNav");
        const notesBtnNav = document.querySelector("#noteIdNav");
        const homeBtnNav = document.querySelector("#homeIdNav");
        const userBtnNav=document.querySelector('#userIdNav')

        if (decipherRole === "administrador") {
          informBtn.classList.add("disabled");
          informBtnNav.classList.add("disabled");
        } else if (decipherRole === "user") {
          //Sidebar
          homeBtn.classList.add("disabled");
          outputsBtn.classList.add("disabled");
          inputsBtn.classList.add("disabled");
          informBtn.classList.add("disabled");
          notesBtn.classList.add("disabled");
          informBtn.classList.add("disabled");
          userBtn.classList.add("disabled")
          //Navbar
          homeBtnNav.classList.add("disabled");
          outputsBtnNav.classList.add("disabled");
          inputsBtnNav.classList.add("disabled");
          informBtnNav.classList.add("disabled");
          notesBtnNav.classList.add("disabled");
          informBtnNav.classList.add("disabled");
          userBtnNav.classList.add("disabled")
          this.homePage = false;
        }
      } catch (error) {
        throw error;
      }
    },
    togglePage(page) {
      this.homePage = page === "home";
      this.salesPage = page === "sales";
      this.outPage = page === "buys";
      this.stockPage = page === "stock";
      this.inputPage = page === "inputs";
      this.informPage = page === "inform";
      this.notePage = page === "note";
      this.userPage = page === "user";
    },
    async logoutUser() {
      try {
        if (window.confirm("¿Esta seguro que desea cerrar sesion?")) {
          await this.$router.push("/register");
          localStorage.removeItem("userToken");
          localStorage.removeItem("businessId");
          localStorage.removeItem("userId");
          localStorage.removeItem("role");
          await this.$router.push("/register");

        }
      } catch (error) {
        console.error("Error al redirigir:", error);
      }
    },
  },
  mounted() {
    this.getBusinessInfo(), this.checkRoles();
  },
};
</script>

<style scoped>
.spinner-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.content-container {
  position: relative;
}
.dashboard-container {
  display: grid;
  grid-template-columns: 20% 80%;
  width: 100%;
  background-color: #f0e7f7;
  height: 100vh;
}

.sidebar-container {
  background-color: #262042;
  border-right: 1px solid rgb(55, 54, 54);
}

.pages-container {
  background-color: #f0e7f7;
  height: 100%;
  overflow-y: auto;
}

.img-logo {
  p {
    margin-left: 20px;
    font-size: 30px;
    font-weight: 500;
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

#navbar {
  display: none;
}

#main {
  display: block;
}

/* //RESPONSIVE PARA TELEFONO-****************************************************************** */
@media screen and (max-width: 768px) {
  .dashboard-container {
    display: grid;
    grid-template-columns: 1fr;
    width: 100%;
    background-color: #f0e7f7;
  }

  .pages-container {
    background-color: #f0e7f7;
  }

  #navbar {
    display: block;
  }

  #main {
    display: none;
  }
}
</style>
