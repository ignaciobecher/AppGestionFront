<template>
  <div class="main">
    <div class="left">
      <ul>
        <li><a href="#" >Inicio</a></li>
        <li><a href="#">Funcionalidades</a></li>
        <li><a href="#">Planes</a></li>
        <li>
          <router-link to="/register">
            <a href="#">Iniciar sesión</a>
          </router-link>
        </li>
        <li>
          <router-link to="/business">
            <a href="#">Registrarse</a>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="center">
      <div style="display: flex">
        <img style="width: 100px" src="../../assets/logoNav.png" alt="" />
        <h4 style="align-self: center">Adminiad</h4>
      </div>
      <p>
        Adminiad es tu software de gestion personal que te ayuda en las tareas de
        tu negocio, con Adminiad deja el papel y las horas perdidas en el pasado.
      </p>
    </div>

    <div class="right">
      <p>Comunicate con nosotros</p>
      <button>
        <a href="mailto:cuyosoftware@gmail.com">Comunicate</a>
      </button>
      <a href="mailto:">clientes@adminiad.com</a>
      <br>
      <a href="mailto:">ventas@adminiad.com</a>
      <p>Desarrollado por:</p>
      <img style="width: 100px" src="../../assets/logoCuyo.png" alt="" /><a
        style="font-weight: bold"
        target="_blank"
        href="https://www.cuyocode.tech"
        >CuyoCode</a
      >
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    
  },
};
</script>

<style scoped>
.main {
  display: grid;
  grid-template-columns: 25% 50% 25%;
  padding-top: 60px;
  background-color: #312551;
  color: white;
}

.left ul {
  list-style: none;
}

.left li {
  margin-top: 10px;
}

.right p {
  font-weight: bold;
  align-self: center;
}

.right button {
  background-color: #9a3990;
  color: white;
  border-radius: 25px;
  padding: 5px;
  font-weight: bold;
  font-size: 15px;
  width: 50%;
  transition: background-color 0.5s ease;
  border: none;
  margin: 0 auto;
}

.right a{
  color: white;
}
button:hover {
  background-color: #312551;
  border: 1px solid white
}

.left li a {
  color: white;
  font-weight: bold;
  margin-top: 10px;
}

/*********************************************CELULARES********************************************************* */
@media (max-width: 768px) {
  .main {
    display: flex;
    flex-direction: column;
  }

  .main .center {
    margin-left: 20px;
  }

  .main .right {
    margin-left: 20px;
  }
}
</style>
