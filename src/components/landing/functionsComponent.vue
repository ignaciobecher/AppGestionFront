<template>
  <div class="main">
    <div class="top">
      <h2>
        La forma
        <span style="color: #9a3990">más facil de gestionar tu negocio.</span>
      </h2>
      <p>¡Descubri todas las herramientas que ayudan a cientos de negocios!</p>
    </div>
    <div class="bottom">
      <div class="imgDiv">
        <img src="../../assets/imgHero.png" alt="" />
      </div>

      <div class="listDiv">
        <h5>Aprovechá nuestra inteligencia artificial.</h5>
        <p>
          Con nuestra IA vas a poder analizar los datos de tu negocio como nunca
          lo hiciste
        </p>
        <h5>Utilizá todos nuestros códigos de barra.</h5>
        <p>
          En Adminiad contamos con los códigos de productos de todo el mundo,
          para que solo te ocupes de vender.
        </p>
        <h5>Controlá desde cualquier lugar.</h5>
        <p>
          Maneja tu stock desde tu casa, la playa o ese viaje con amigos, todo
          desde tu celular, en tiempo real.
        </p>
      </div>
    </div>

    <div style="text-align: center; padding-left: 10px; padding-right: 10px">
      <button>
        <router-link style="color: white" to="/register">
          Probar Adminiad gratis
        </router-link>
      </button>
    </div>
  </div>
</template>

<style scoped>
.main {
  background-color: #261f41;
  padding-top: 50px;
  padding-bottom: 30px;
}

.top {
  text-align: center;
  color: white;
}

.top h2 {
  font-weight: bold;
  font-size: 35px;
}

.top p {
  font-weight: 500;
}

.bottom {
  margin-top: 30px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 30px;
}

.imgDiv {
  margin-left: 20px;
}

.imgDiv img {
  width: 100%;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.5);
}

.listDiv {
  color: white;
  margin-left: 100px;
  margin-right: 100px;
}

.listDiv h5 {
  font-weight: bold;
  font-size: 25px;
}

button {
  background-color: #9a3990;
  color: white;
  border-radius: 25px;
  padding: 5px;
  font-weight: bold;
  font-size: 20px;
  width: 30%;
  transition: background-color 0.5s ease;
  border: none;
  margin: 0 auto;
}

button:hover {
  background-color: #312551;
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
  }

  .listDiv {
    margin: 20px;
  }

  button {
    width: 100%;
  }
}
</style>
