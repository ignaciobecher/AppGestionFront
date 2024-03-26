<template>
  <div style="background-color: #ebe3ec !important">
    <router-link to="/">
      <i style="font-size: 30px; margin-left: 10px" class="bi bi-arrow-left">
      </i>
    </router-link>
  </div>
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
        <button>
          <a
            target="_blank"
            href="https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=2c9380848e681d84018e7b53f2c60ad4"
          >
            Seleccionar plan Emprendedor
          </a>
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
        <button>
          <a
            target="_blank"
            href="https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=2c9380848e681d84018e7b52ff880ad3"
            >Seleccionar plan Pyme</a
          >
        </button>
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
        <button>
          <a
            target="_blank"
            href="https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=2c9380848e681dc3018e7b502f760b34"
            >Seleccionar plan Empresa</a
          >
        </button>
      </div>
    </div>
    <div style="text-align: center; margin-top: 40px">
      <router-link to="/pagar/registrar">
        <button style="width: 30%">Ya pague!</button>
      </router-link>
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
  methods: {},
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

button a {
  color: white;
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
