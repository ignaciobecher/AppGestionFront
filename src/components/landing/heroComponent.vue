<template>
  <div class="main">
    <div class="left">
      <div class="wrapper">
        <h1>
          El unico sistema de <span>gestión</span> con
          <span class="typing-demo"> inteligencia artificial</span>
        </h1>
        <h4>
          Administra tu negocio, controla tu inventario y accede con un click a
          reportes inteligentes de tu negocios
        </h4>
        <button>Prueba gratuita</button>
        <p>
          Accede a todas las funciones de Adminia sin limitaciones. Más de 500
          negocios ya utilizan nuestros servicios.
        </p>
      </div>
    </div>
    <div class="right">
      <img src="../../assets/imgHero.png" alt="" />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.main {
  background-color: #ebe3ec;
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding-left: 20px;
  padding-top: 50px;
}

.main .left{
  margin-right: 20px
}

.main .left h1 {
  text-align: left;
  font-weight: bold;
}

.main .left span {
  color: #9a3990;
}

.main .left button {
  background-color: #312551;
  color: white;
  border-radius: 25px;
  padding: 10px;
  font-weight: 500;
  width: 100%;
}

.main .right img {
  width: 100%;
}

.typing-demo {
  animation: typing 2s steps(22), blink 0.5s step-end infinite alternate;
  border-right: 3px solid;
}

@keyframes typing {
  from {
    width: 0;
  }
}

@keyframes blink {
  50% {
    border-color: transparent;
  }
}
</style>
