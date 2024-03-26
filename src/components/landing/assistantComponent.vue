<template>
  <div class="main">
    <div class="textDiv">
      <h4>
        ¡Nuestro asistente con inteligencia artificial hace que todo sea más
        facil!
      </h4>
      <p>
        Somos el unico sistema de gestión en el mercado que cuenta con
        inteligencia artificial para ayudarte en tus tareas de todos los días,
        permitiendote delegarle tareas a Adminiad.
      </p>
      <button>
        <router-link style="color: white" to="/register">
          Prueba gratuita
        </router-link>
      </button>
      <p>Proba gratis, sin tarjeta.</p>
    </div>

    <div class="imgDiv">
      <img src="../../assets/assistant.png" alt="" srcset="" />
    </div>
  </div>
</template>

<style scoped>
.main {
  padding-top: 50px;
  background-color: #d79ddf !important;
  display: flex;
  flex-direction: row;
  padding-left: 20px;
  padding-right: 20px;
}
.main .textDiv {
  width: 50%;
}
.main .textDiv h4 {
  font-weight: bold;
}

.main p {
  font-weight: 600;
}

.main .textDiv button {
  background-color: #312551;
  color: white;
  border-radius: 25px;
  padding: 5px;
  font-weight: bold;
  font-size: 20px;
  width: 100%;
  transition: background-color 0.5s ease;
  border: none;
}

.main .textDiv button:hover {
  background-color: #9a3990;
}

.main .imgDiv {
  margin: 0 auto;
  width: 200px;
}

/* *************************************************CELULARES/TABLETS*********************************** */

@media (max-width: 768px) {
  .main {
    display: flex;
    flex-direction: column;
    padding-left: 20px;
  }

  .main .textDiv {
    width: 100%;
  }

  .main .imgDiv img {
    width: 100%;
  }
}
</style>
