<template>
  <div class="main-container">
    <div v-if="mailForm" class="register-user">
      <a href="#">
        <router-link to="/register">
          <i style="font-size: 20px" class="bi bi-arrow-left"></i>
        </router-link>
      </a>
      <h2>Recuperar contraseña</h2>
      <form @submit.prevent="registerUser">
        <div class="form-group">
          <label for="password">Ingresa tu email:</label>
          <input
            type="email"
            autocomplete="current-password"
            id="password"
            placeholder="Email..."
            v-model="formData.email"
            required
          />
        </div>
        <div class="btn-container">
          <button type="submit" @click="sendEmail">
            <p v-if="loading === false" style="margin: 0">Enviar</p>
            <spinner v-if="loading === true"></spinner>
          </button>
          <a style="margin-top: 20px; font-size: 15px"
            >En los próximos minutos recibiras un código a tu email para poder
            reestablecer tu contraseña.</a
          >
        </div>
      </form>

      <p v-if="error" class="error">{{ error }}</p>
    </div>

    <div v-if="codeForm" class="register-user">
      <a href="#" @click="changeToEmail">
        <i style="font-size: 20px" class="bi bi-arrow-left"></i>
      </a>
      <h2>Ingresa el código</h2>
      <form @submit.prevent="registerUser">
        <div class="form-group">
          <input
            type="text"
            autocomplete="current-password"
            id="password"
            placeholder="Código..."
            v-model="code"
            required
          />
        </div>
        <div class="btn-container">
          <button type="submit" @click="changeToPassword">Continuar</button>
          <a style="margin-top: 20px; font-size: 15px"
            >Comprueba tu carpeta de spam si todavia no ves el código en tu
            casilla de correo. Enviar nuevo código</a
          >
        </div>
      </form>

      <p v-if="error" class="error">{{ error }}</p>
    </div>

    <div v-if="passwordForm" class="register-user">
      <a href="#" @click="changeToEmail">
        <i style="font-size: 20px" class="bi bi-arrow-left"></i>
      </a>
      <h2>Nueva contraseña</h2>
      <form @submit.prevent="registerUser">
        <div class="form-group">
          <label for="password">Ingresa tu nueva contraseña:</label>
          <input
            type="password"
            autocomplete="current-password"
            id="password"
            placeholder="Contraseña..."
            v-model="formData.password"
            required
          />
        </div>

        <div class="btn-container">
          <button @click="changePassword" type="submit">
            Restaurar contraseña
          </button>
        </div>
      </form>

      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import spinner from "@/components/visuals/spinner.vue";

const businessId = localStorage.getItem("businessId");
export const secretKey = "password.key,asd123@";

export default {
  components: {
    spinner,
  },
  data() {
    return {
      formData: {
        email: "",
        password: "",
      },
      code: "",
      error: "",
      mailForm: true,
      codeForm: false,
      passwordForm: false,
      globalBusinessId: "",
      loading: false,
    };
  },
  methods: {
    async sendEmail() {
      try {
        this.loading = true;
        const response = await axios.post(
          `https://api-gestion-ahil.onrender.com/email/restore/password`,
          {
            email: this.formData.email,
          }
        );
        const data = response.data;
        this.changeToCode();
        localStorage.setItem("code", data);
        localStorage.setItem("email", this.formData.email);
        this.loading = false;
      } catch (error) {
        window.alert("Error al enviar el código");
        this.loading = false;
      }
    },
    async changePassword() {
      try {
        const codeFromLs = localStorage.getItem("code");
        const emailFromLs = localStorage.getItem("email");

        console.log("Email", emailFromLs);
        console.log("Codigo:", codeFromLs);

        const response = await axios.put(
          `https://api-gestion-ahil.onrender.com/auth/users/${emailFromLs}/password`,
          {
            password: this.formData.password,
            clientCode: codeFromLs,
          }
        );

        console.log("Contraseña", response.data);
        if (response.data) {
          window.alert("Contraseña actualizada");
          this.$router.push("/home");
          localStorage.removeItem("email");
          localStorage.removeItem("code");
        }
      } catch (error) {
        window.alert("Error al cambiar contraseña");
        this.$router.push("/home");
      }
    },
    changeToEmail() {
      this.mailForm = true;
      this.codeForm = false;
      this.passwordForm = false;
    },
    changeToCode() {
      this.mailForm = false;
      this.codeForm = true;
      this.passwordForm = false;
    },
    changeToPassword() {
      this.mailForm = false;
      this.codeForm = false;
      this.passwordForm = true;
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
