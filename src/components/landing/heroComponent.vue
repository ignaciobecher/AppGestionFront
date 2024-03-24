<template>
  <div class="main">
    <div class="left">
      <div class="wrapper">
        <h1>
          El unico sistema de <span>gestión</span> con
          <span class="typing-demo"> </span>
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
export default {
  mounted() {
    const typingDemo = document.querySelector('.typing-demo');
    const text = 'inteligencia artificial';
    let index = 0;
    const typingSpeed = 50; // Ajusta la velocidad de escritura aquí (en milisegundos)

    function type() {
      if (index < text.length) {
        typingDemo.textContent += text.charAt(index);
        index++;
        setTimeout(type, typingSpeed);
      }
    }

    type();
  }
};
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
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.5);
}

.typing-demo {
  border-right: 3px solid;
}
</style>
