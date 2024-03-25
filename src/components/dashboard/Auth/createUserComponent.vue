<template>
  <div class="main-container">
    <div class="register-user">
      <a href="#" @click="showLogin">
        <router-link to="/home">
          <i style="font-size: 20px" class="bi bi-arrow-left"></i>
        </router-link>
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
            placeholder="Usuario"
            autocomplete="username"
          />
        </div>

        <div class="form-group">
          <label for="email">Correo electrónico:</label>
          <input
            autocomplete="email"
            type="email"
            id="email"
            placeholder="Email"
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
            placeholder="Contraseña"
            v-model="formData.password"
            required
          />
        </div>
        <div class="selectDiv">
          <label for="role">Rol de usuario:</label>
          <select v-model="formData.role" name="" id="">
            <option value="">Seleccione un rol</option>
            <option value="manager">Propietario</option>
            <option value="administrador">Encargado</option>
            <option value="user">Vendedor</option>
          </select>
        </div>
        <div class="btn-container">
          <button type="submit">Crear usuario</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import SimpleCrypto from "simple-crypto-js";
const businessId = localStorage.getItem("businessId");
export const secretKey = SimpleCrypto.generateRandom(256);

export default {
  data() {
    return {
      formData: {
        username: "",
        email: "",
        password: "",
        businessId: "",
        role: "",
      },
      error: "",
      registerState: true,
      globalBusinessId: "",
    };
  },
  methods: {
    async registerUser() {
      try {
        const user = await axios.post(
          `https://api-gestion-ahil.onrender.com/auth/register/${businessId}`,
          {
            username: this.formData.username,
            password: this.formData.password,
            email: this.formData.email,
            businessId: businessId,
            role:this.formData.role,
          }
        );
        console.log(user);
        if(!user){
          window.alert('¡Usuario o email en uso, prueba con otros!')
        }

        console.log("businessId", businessId);
        console.log(this.formData.role);

        this.formData.username = "";
        this.formData.email = "";
        this.formData.password = "";
        alert("Usuario registrado correctamente");
        this.$router.push("/home");
      } catch (error) {
        window.alert('¡Usuario o email en uso, prueba con otros!')

      }
    },

    showRegister() {
      this.registerState = true;
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
}

.selectDiv select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
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
