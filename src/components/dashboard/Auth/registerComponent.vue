<template>
  <div class="main-container">
    <div v-if="registerState" class="register-user">
      <a href="#" @click="showLogin">
        <i style="font-size: 20px" class="bi bi-arrow-left"></i>
      </a>
      <h2>Registrar Usuario</h2>
      <form @submit.prevent="registerUser">
        <div class="form-group">
          <label for="username">Nombre de usuario:</label>
          <input
            type="text"
            id="username"
            v-model="formData.username"
            required
            autocomplete="username"
          />
        </div>
        <div class="form-group">
          <label for="username">Número de identificación de negocio:</label>
          <input
            type="text"
            id="username"
            v-model="formData.businessId"
            required
          />
        </div>
        <div class="form-group">
          <label for="email">Correo electrónico:</label>
          <input
            autocomplete="email"
            type="email"
            id="email"
            v-model="formData.email"
            required
          />
        </div>
        <div class="form-group">
          <label for="password">Contraseña:</label>
          <input
            type="password"
            autocomplete="current-password"
            id="password"
            v-model="formData.password"
            required
          />
        </div>
        <div class="btn-container">
          <button type="submit">Registrarte</button>
        </div>
      </form>
      <p v-if="error" class="error">{{ error }}</p>
    </div>

    <div v-if="loginState" class="register-user">
      <h2>Iniciar sesion</h2>
      <form @submit.prevent="loginUser">
        <div class="form-group">
          <label for="email">Correo electrónico:</label>
          <input type="email" v-model="formData.email" required />
        </div>
        <div class="form-group">
          <label for="password">Contraseña:</label>
          <input
            type="password"
            autocomplete="current-password"
            v-model="formData.password"
            required
          />
        </div>

        <p>
          ¿Todavia no te registraste?
          <a href="#" @click="showRegister">Hace click acá para registrarte </a>
        </p>

        <div class="btn-container">
          <button type="submit">Iniciar</button>
        </div>
        <p style="margin-top: 20px">
          <router-link to="/business">
            <a href=""> Registrar nuevo negocio </a>
          </router-link>
        </p>
      </form>
      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
const businessId = localStorage.getItem("businessId");

export default {
  data() {
    return {
      formData: {
        username: "",
        email: "",
        password: "",
        businessId: "",
      },
      error: "",
      loginState: true,
      registerState: false,
      globalBusinessId: "",
    };
  },
  methods: {
    async registerUser() {
      try {
        const user = await axios.post(
          `http://localhost:3000/auth/register/${this.formData.businessId}`,
          {
            username: this.formData.username,
            password: this.formData.password,
            email: this.formData.email,
            businessId: this.formData.businessId,
          }
        );

        this.formData.username = "";
        this.formData.email = "";
        this.formData.password = "";
        alert("Usuario registrado correctamente");
        this.loginState = true;
        this.registerState = false;
      } catch (error) {
        this.error = error.message;
      }
    },
    async loginUser() {
      try {
        localStorage.removeItem("userToken");
        localStorage.removeItem("businessId");
        localStorage.removeItem("userId");
        const user = await axios.post("http://localhost:3000/auth/login", {
          email: this.formData.email,
          password: this.formData.password,
        });
        const userData = user.data;

        if (userData.token) {
          localStorage.setItem("userToken", userData.token);
          this.$router.push("/home");
          const businessId = userData.user.businessId;
          const userId = userData.user._id;
          localStorage.setItem("userId", userId);
          localStorage.setItem("businessId", businessId);
        } else {
          window.alert("Credenciales incorrectas");
          localStorage.removeItem("userToken");
        }
      } catch (error) {
        throw error;
      }
    },

    showRegister() {
      this.loginState = false;
      this.registerState = true;
    },
    showLogin() {
      this.loginState = true;
      this.registerState = false;
    },
  },
};
</script>

<style scoped>
.main-container {
  background-color: #f0e7f7;
  height: 100vh;
  padding-top: 50px;
}
.register-user {
  max-width: 400px;
  height: 520px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 5px 5px 5px -5px rgba(0, 0, 0, 0.75);
}

.register-user h2 {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.error {
  color: red;
  margin-top: 10px;
}

.btn-container {
  display: flex;
  flex-direction: column;
}
.btn-container button {
  border: none;
  margin-top: 10px;
  border-radius: 0%;
  background-color: #b28cc4;
  font-size: 20px;
  font-weight: 500;
}
</style>
