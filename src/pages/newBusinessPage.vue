<template>
  <div class="mainContainer">
    <h1>Bienvenido a Adminia</h1>
    <div class="register-business">
      <h2>Nuevo negocio</h2>
      <form @submit.prevent="createNewBusiness" class="login-form">
        <div class="form-group">
          <label for="name">Nombre:</label>
          <input
            v-model="data.name"
            type="text"
            placeholder="Ingresa el nombre de tu negocio"
            required
          />
        </div>
        <div class="form-group">
          <label for="name">Rubro:</label>
          <input
            v-model="data.rubro"
            type="text"
            placeholder="Ingresa tu rubro"
            required
          />
        </div>
        <div class="form-group">
          <label for="name">Teléfono:</label>
          <input
            v-model="data.phone"
            type="text"
            placeholder="Ingresa tu número sin espacios ni guiones"
            required
          />
        </div>
        <div class="form-group">
          <label for="address">Dirección:</label>
          <input
            v-model="data.address"
            type="text"
            placeholder="Ingresa tu dirección"
            required
          />
        </div>

        <div class="form-group">
          <label for="email">Ciudad:</label>
          <input
            v-model="data.city"
            type="text"
            placeholder="Ingresa tu ciudad"
            required
          />
        </div>
        <div class="form-group">
          <label for="email">Correo electrónico:</label>
          <input
            v-model="data.email"
            type="email"
            placeholder="Ingresa tu correo"
            required
          />
        </div>

        <div class="form-group">
          <label for="email">Usuario:</label>
          <input
            v-model="data.username"
            type="text"
            placeholder="Ingresa tu nombre de usuario"
            required
          />
        </div>
        <div class="form-group">
          <label for="email">Contraseña:</label>
          <input
            v-model="data.password"
            type="password"
            placeholder="Ingresa tu contraseña"
            required
          />
        </div>
        <button type="submit">
          <p
            v-if="loading === false"
            style="margin-top: 10px; font-weight: 500; font-size: 20px"
          >
            Crear negocio
          </p>
          <spinner v-if="loading === true"></spinner>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import spinner from "@/components/visuals/spinner.vue";

export default {
  components: {
    spinner,
  },
  data() {
    return {
      data: {
        name: "",
        address: "",
        email: "",
        rubro: "",
        phone: "",
        city: "",
        username: "",
        password: "",
      },
      loading: false,
    };
  },
  methods: {
    async createNewBusiness() {
      try {
        this.loading = true;
        const newBusiness = await axios.post("https://api-gestion-ahil.onrender.com/business", {
          name: this.data.name,
          address: this.data.address,
          email: this.data.email,
          telephone: this.data.phone,
          rubro: this.data.rubro,
          city: this.data.city,
        });
        console.log("Negocio creado: ", newBusiness);

        const businessId = newBusiness.data._id;
        console.log("BusinessId: ", businessId);
        localStorage.setItem("businessId", businessId);

        const email = await axios.post(`https://api-gestion-ahil.onrender.com/email`, {
          email: this.data.email,
          businessId: businessId,
        });

        console.log("Mail enviado: ", email);

        const user = await axios.post(
          `https://api-gestion-ahil.onrender.com/auth/register/${businessId}`,
          {
            username: this.data.username,
            password: this.data.password,
            businessId: businessId,
            email: this.data.email,
            role: "manager",
          }
        );

        console.log("Usuario creado: ", user);
        this.loading = false;
        window.alert(
          "Gracias por registrar tu negocio en Adminia, en tu mail te indicamos el siguiente paso"
        );

        this.$router.push("/register");
        this.data.name = "";
        this.data.address = "";
        this.data.email = "";
        return businessId;
      } catch (error) {
        this.loading = false;

        window.alert("El email que estás intentando usar ya está registrado");
        window.location.reload()
        const businessId = localStorage.getItem("businessId");
        if (businessId) {
          await axios.delete(`https://api-gestion-ahil.onrender.com/business/${businessId}`);
        }
      }
    },
  },
};
</script>

<style scoped>
.mainContainer {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f0e7f7;
}

.register-business {
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
}

h1 {
  text-align: center;
}

h2 {
  margin-bottom: 20px;
}

.login-form .form-group {
  margin-bottom: 15px;
}

.login-form label {
  display: block;
  margin-bottom: 5px;
}

.login-form input[type="text"],
.login-form input[type="email"],
.login-form input[type="password"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.login-form button {
  background-color: #b28cc4;
  color: #fff;
  border: none;
  cursor: pointer;
  width: 100%;
}
</style>
