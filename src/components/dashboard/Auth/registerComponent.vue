<template>
  <div v-if="registerState" class="register-user">
    <h2>Registrar Usuario</h2>
    <form @submit.prevent="registerUser">
      <div class="form-group">
        <label for="username">Nombre de usuario:</label>
        <input type="text" id="username" v-model="formData.username" required />
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
      <button type="submit">Registrar</button>
      <button @click="showLogin" type="submit">Ir a login</button>

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
      <button type="submit">Iniciar</button>
      <button @click="showRegister">Ir a registrar</button>
      
    </form>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
import axios from "axios";
import { useRouter } from "vue-router";

export default {
  data() {
    return {
      formData: {
        username: "",
        email: "",
        password: "",
      },
      error: "",
      loginState: true,
      registerState: false,
      globalBusinessId:''
    };
  },
  methods: {
    async registerUser() {
      try {
        const businessId=localStorage.getItem('businessId')
        const user = await axios.post(
          `http://localhost:3000/auth/register/${businessId}`,
          {
            username: this.formData.username,
            password: this.formData.password,
            email: this.formData.email,
            businessId:businessId
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
        const user = await axios.post("http://localhost:3000/auth/login", {
          email: this.formData.email,
          password: this.formData.password,
        });
        const userData = user.data;
       
        if (userData.token) {
          localStorage.setItem("userToken", userData.token);
          this.$router.push("/home");
          const businessId=userData.user.businessId
          const userId=userData.user._id
          localStorage.setItem('userId',userId)
          localStorage.setItem('businessId',businessId)
        } else {
          window.alert("Credenciales incorrectas");
          localStorage.removeItem('userToken')
        }
      } catch (error) {
        throw error;
      }
    },

    showRegister() {
      this.loginState = false;
      this.registerState = true;
    },
    showLogin(){
      this.loginState = true;
      this.registerState = false;
    }
  },
};
</script>

<style scoped>
.register-user {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
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
</style>
