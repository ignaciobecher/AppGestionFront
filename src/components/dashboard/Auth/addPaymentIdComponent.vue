<template>
  <div class="main-container">
    <div v-if="form === true" class="register-user">
      <a href="#">
        <router-link to="/pagar">
          <i style="font-size: 20px" class="bi bi-arrow-left"></i>
        </router-link>
      </a>
      <h2>Registrar pago</h2>
      <div class="form-group">
        <label>Número de operación:</label>

        <input
          type="string"
          required
          v-model="operationNumber"
          placeholder="Ingresa tu número de operación"
        />
        <p style="font-size: 10px">
          Tu número de operación es el número con el que Mercado Pago identifica
          tu compra, podes encontrarlo en tu comprobante de pago, en la parte
          superior
        </p>
      </div>

      <div class="btn-container">
        <button @click="checkOperationNumber">
          <p v-if="loading === false" style="margin: 0">Continuar</p>
          <spinner v-if="loading === true"></spinner>
        </button>
      </div>
    </div>
    <div v-if="loader === true" class="loader-container">
      <div class="loader-content">
        <img style="width: 200px" src="../../../assets/logoNav.png" alt="" />
        <p>Espera mientras validamos tu pago</p>
        <spinner style="width: 50px; height: 50px"></spinner>
      </div>
    </div>

    <div v-if="loaded === true" class="loader-container">
      <div class="loader-content">
        <img style="width: 200px" src="../../../assets/logoNav.png" alt="" />
        <p>
          ¡Gracias por esperar! Ya sos parte de Adminiad, ahora solo ingresa con
          tu email y contraseña
        </p>
        <button @click="goToRegister">Ingresar</button>
      </div>
    </div>
  </div>
</template>

<script>
import spinner from "@/components/visuals/spinner.vue";
import axios from "axios";
export default {
  data() {
    return {
      form: true,
      loader: false,
      loaded: false,
      loading: false,
      operationNumber: null,
    };
  },
  components: {
    spinner,
  },
  methods: {
    async checkOperationNumber() {
      try {
        const businessId = localStorage.getItem("businessId");
        if (
          this.operationNumber === "" ||
          this.operationNumber === null 
        ) {
          window.alert("Debes ingresar tu número de operación");
          return;
        }

        if(this.operationNumber.length < 11 && this.operationNumber.length > 11){
          window.alert("Tu número de operación debe tener 11 digitos emitidos por Mercado Pago");
          return;
        }
        const response = await axios.put(
          `http://localhost:3000/business/${businessId}`,
          {
            operationId: this.operationNumber,
          }
        );
        const data = response.data;


        this.loader = true;
        this.form = false;

        setTimeout(() => {
          this.loader = false;
          this.loaded = true;
        }, 3500);

        console.log(this.operationNumber);
      } catch (error) {
        window.alert(
          "Error al validar tu pago, intenta nuevamente o ponte en contacto con atención al cliente"
        );
      }
    },
    goToRegister() {
      this.$router.push("/register");
    },
  },
};
</script>

<style scoped>
.main-container {
  display: flex;
  justify-content: center; /* Centra horizontalmente */
  align-items: center; /* Centra verticalmente */
  height: 100vh;
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
  width: 100%;
  margin-top: 10px;
  border-radius: 0%;
  background-color: #b28cc4;
  font-size: 20px;
  font-weight: 500;
}

.loader-container {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5); /* Fondo semitransparente */
}

.loader-content {
  display: flex;
  flex-direction: column;
  align-items: center; /* Centra verticalmente */
  justify-content: center; /* Centra horizontalmente */
}

.loader-container button {
  border: none;
  width: 30%;
  margin-top: 10px;
  border-radius: 0%;
  background-color: #b28cc4;
  font-size: 20px;
  font-weight: 500;
}
</style>
