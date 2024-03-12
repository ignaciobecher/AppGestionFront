<template>
  <div class="searchbar-container">
    <p>Bienvenido {{ userName }}</p>

    <div class="input-container">
      <router-link class="router" to="/registerUser"
        ><a id="registerUser" class="nav-link" href="">
          Registrar nuevo usuario
          <i class="bi bi-arrow-right"></i>
        </a>
      </router-link>
    </div>
  </div>
</template>

<script>
import SimpleCrypto from "simple-crypto-js";
import axios from "axios";
import moment from "moment";
import { secretKey } from "../Auth/registerComponent.vue";
const simpleCrypto = new SimpleCrypto(secretKey);
export default {
  data() {
    return {
      userName: "",
    };
  },
  methods: {
    async getUserInfo() {
      try {
        const userId = localStorage.getItem("userId");
        const response = await axios.get(
          `https://api-gestion-ahil..onrender.com/auth/${userId}`
        );
        const user = response.data;

        const userName = user.username;
        this.userName = userName;
        console.log(user.businessId);
      } catch (error) {
        throw error;
      }
    },
    checkRoles() {
      try {
        const role = localStorage.getItem("role");
        const register = document.querySelector("#registerUser");

        const decipherRole = simpleCrypto.decrypt(role);

        if (
          decipherRole === "administrador" ||
          decipherRole === "user" 
        
        ) {
          register.classList.add("d-none");
        }
      } catch (error) {
        throw error;
      }
    },
    getDate() {
      const date = new Date();
      this.todayDate = date;
    },
    formatDate(date) {
      return moment(date).format("DD/MM/YYYY");
    },
  },
  mounted() {
    this.getUserInfo(), this.checkRoles();
  },
};
</script>

<style scoped>
.searchbar-container {
  display: flex;
  align-items: center;
  box-shadow: 0px 5px 5px -5px rgba(32, 32, 32, 0.5);
  justify-content: space-between;
}

.searchbar-container p {
  margin-left: 10px;
  margin-top: 10px;
  font-size: 25px;
  padding: 10px;
  font-weight: bolder;
}

.input-container {
  margin-right: 20px;
}
</style>