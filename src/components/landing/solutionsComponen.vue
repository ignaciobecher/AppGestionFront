<template>
  <div class="main">
    <div class="top">
      <h1>
        Soluciones para
        <span style="color: #9a3990">todo tipo de empresas.</span>
      </h1>
      <p>Usalo cuando quieras, donde quieras y en cualquier dispositivo.</p>
    </div>

    <div class="bottom">
      <div class="imageDiv">
        <img src="../../assets/solution.png" alt="" />
      </div>

      <div class="textDiv">
        <h4>
          Nuestro sistema de gestión se adapta a las necesidades de todo tipo de
          negocios, desde emprendimientos hasta grandes empresas.
        </h4>
        <button>
          <router-link style="color: white" to="/register">
            Prueba gratuita
          </router-link>
        </button>
        <p>Sin necesidad de tarjeta de crédito.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main {
  padding-top: 50px;
  background-color: #ebe3ec !important;
}
.main .top {
  text-align: center;
}

.main .top h1 {
  font-weight: bold;
  color: black;
}

.top p {
  font-weight: bold;
}

.bottom {
  display: flex;
  flex-direction: row;
  margin-right: 10px;
}

.bottom .textDiv {
  align-self: center;
}

.bottom h4 {
  font-weight: bold;
}

.bottom button {
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

.bottom p {
  font-weight: bold;
}

/* *************************************************CELULARES/TABLETS*********************************** */

@media (max-width: 768px) {
  .main {
    display: flex;
    flex-direction: column;
    padding-left: 20px;
  }

  .main .bottom {
    display: flex;
    flex-direction: column;
  }

  .bottom img {
    width: 100%;
  }
}
</style>
