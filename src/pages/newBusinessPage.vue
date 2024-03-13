<template>
  <div class="mainContainer">
    <h1>Bienvenido a Adminia</h1>
    <div class="register-business">
      <h2>Nuevo negocio</h2>
      <form @submit.prevent="createNewBusiness" class="login-form">
        <div class="form-group">
          <label for="name">Nombre:</label>
          <input v-model="data.name" type="text" required />
        </div>
        <div class="form-group">
          <label for="name">Rubro:</label>
          <input v-model="data.rubro" type="text" required />
        </div>
        <div class="form-group">
          <label for="name">Teléfono:</label>
          <input v-model="data.phone" type="text" required />
        </div>
        <div class="form-group">
          <label for="address">Dirección:</label>
          <input v-model="data.address" type="text" required />
        </div>

        <div class="form-group">
          <label for="email">Ciudad:</label>
          <input v-model="data.city" type="text" required />
        </div>
        <div class="form-group">
          <label for="email">Correo electrónico:</label>
          <input v-model="data.email" type="email" required />
        </div>

        <div class="form-group">
          <label for="email">Usuario:</label>
          <input v-model="data.username" type="text" required />
        </div>
        <div class="form-group">
          <label for="email">Contraseña:</label>
          <input v-model="data.password" type="password" required />
        </div>
        <button type="submit">Crear negocio</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
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
    };
  },
  methods: {
    async createNewBusiness() {
      try {
        const newBusiness = await axios.post("https://api-gestion-ahil.onrender.com/business", {
          name: this.data.name,
          address: this.data.address,
          email: this.data.email,
          telephone: this.data.phone,
          rubro: this.data.rubro,
          city: this.data.city,
        });

        const businessId = newBusiness.data._id;
        localStorage.setItem("businessId", businessId);

        const email = await axios.post(`https://api-gestion-ahil.onrender.com/email`, {
          email: this.data.email,
          businessId: businessId,
        });

        if (newBusiness) {
          const user = await axios.post(
            `https://api-gestion-ahil.onrender.com/auth/register/${businessId}`,
            {
              username: this.data.username,
              password: this.data.password,
              email: this.data.email,
              role: "manager",
            }
          );
        }
        window.alert(
          "Gracias por registrar tu negocio en Adminia, en tu mail te indicamos el siguiente paso"
        );

        this.$router.push("/register");
        this.data.name = "";
        this.data.address = "";
        this.data.email = "";
        return businessId;
      } catch (error) {}
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
.login-form input[type="email"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.login-form button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
}

.login-form button:hover {
  background-color: #0056b3;
}
</style>
