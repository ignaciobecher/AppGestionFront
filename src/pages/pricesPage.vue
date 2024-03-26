<template>
  <div class="main">
    <div class="top">
      <h2>Planes pensados para tu negocio.</h2>
    </div>

    <div class="bottom">
      <div class="card">
        <h3>EMPRENDEDOR</h3>
        <p>$10.000 <br />MENSUAL</p>

        <ul>
          <li>
            <i class="bi bi-check-lg"></i>
            100 productos en stock
          </li>

          <li>
            <i class="bi bi-check-lg"></i>
            300 ventas
          </li>

          <li>
            <i class="bi bi-check-lg"></i>
            1 usuario
          </li>

          <li>
            <i class="bi bi-check-lg"></i>
            Soporte por email
          </li>
        </ul>
        <button @click="generateLinkEmprendedor">
          Seleccionar plan Emprendedor
        </button>
      </div>

      <div class="card">
        <h3>PYME</h3>
        <p>$20.000 <br />MENSUAL</p>

        <ul>
          <li>
            <i class="bi bi-check-lg"></i>
            500 productos en stock
          </li>

          <li>
            <i class="bi bi-check-lg"></i>
            1000 ventas
          </li>

          <li>
            <i class="bi bi-check-lg"></i>
            3 usuarios
          </li>

          <li>
            <i class="bi bi-check-lg"></i>
            Soporte por email y WhatsApp
          </li>
        </ul>
        <button @click="generateLinkPyme">Seleccionar plan Pyme</button>
      </div>

      <div class="card">
        <h3>EMPRESA</h3>
        <p>$40.000<br />MENSUAL</p>

        <ul>
          <li>
            <i class="bi bi-check-lg"></i>
            5000 productos en stock
          </li>

          <li>
            <i class="bi bi-check-lg"></i>
            Ventas ilimitadas
          </li>

          <li>
            <i class="bi bi-check-lg"></i>
            10 usuarios
          </li>

          <li>
            <i class="bi bi-check-lg"></i>
            Soporte por email y WhatsApp 24/7
          </li>
        </ul>
        <button @click="generateLinkEmpresa">Seleecionar plan Empresa</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      linkEmprendedor: "",
      linkPyme: "",
      linkEmpresa: "",
      link: "",
    };
  },
  methods: {
    async generateLinkEmprendedor() {
      try {
        const data = {
          price: 100,
          name: "Plan Emprendedor Adminiad",
          redirectSucces: "https://www.google.com/search?q=success",
          redirectFail: "https://www.google.com/search?q=failed",
        };

        const response = await axios.post("https://api-gestion-ahil.onrender.com/uala", data);
        console.log(response.data.links.checkoutLink);
        const link = response.data.links.checkoutLink;
        window.location.href = link;
      } catch (error) {
        console.error(error);
        window.alert("Error al generar el enlace");
      }
    },
    async generateLinkPyme() {
      try {
        const data = {
          price: 50,
          name: "Plan Pyme Adminiad",
          redirectSucces: "https://www.google.com/search?q=success",
          redirectFail: "https://www.google.com/search?q=failed",
        };

        const response = await axios.post("https://api-gestion-ahil.onrender.com/uala", data);
        const link = response.data.links.checkoutLink;
        window.location.href = link;
      } catch (error) {
        console.error(error);
        window.alert("Error al generar el enlace");
      }
    },
    async generateLinkEmpresa() {
      try {
        const data = {
          price: 15,
          name: "Plan Empresa Adminiad",
          redirectSucces: "https://www.google.com/search?q=success",
          redirectFail: "https://www.google.com/search?q=failed",
        };

        const response = await axios.post("https://api-gestion-ahil.onrender.com/uala", data);
        const link = response.data.links.checkoutLink;
        window.location.href = link;
      } catch (error) {
        console.error(error);
        window.alert("Error al generar el enlace");
      }
    },
  },
};
</script>

<style scoped>
.main {
  background-color: #ebe3ec !important;
  padding-top: 50px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 30px;
  height: 100vh;
}

.top {
  text-align: center;
}

.top h2 {
  font-weight: bold;
  font-size: 35px;
}

.bottom {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 10px;
  margin-top: 30px;
}

.card {
  border-radius: 25px;
  padding: 10px;
}

.card h3 {
  text-align: center;
  font-weight: bold;
}

.card p {
  text-align: center;
  font-weight: bold;
}

.card ul {
  list-style: none;
}

.card i {
  color: green;
}

button {
  background-color: #312551;
  color: white;
  border-radius: 25px;
  padding: 5px;
  font-weight: bold;
  font-size: 15px;
  transition: background-color 0.5s ease;
  border: none;
}

button:hover {
  background-color: #9a3990;
}

.box {
  margin-top: 30px;
  background-color: #312551;
  border-radius: 25px;
  padding: 20px;
  color: white;
  display: flex;
  flex-direction: row;
}

.box img {
  width: 100px;
}

.box h3 {
  align-self: center;
}

.box a {
  align-self: center;
  margin-left: 10px;
}

/*********************************************CELULARES********************************************************* */
@media (max-width: 768px) {
  .main {
    display: flex;
    flex-direction: column;
  }

  .bottom {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
  }

  button {
    width: 100%;
  }

  .box {
    display: flex;
    flex-direction: column;
  }

  .box a {
    margin: 0;
  }
}
</style>
