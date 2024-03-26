<template>
  <div id="my-template">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#" style="font-weight: 500">
        <img
          src="../../assets/logoNav.png"
          width="50"
          height="50"
          alt=""
        />Adminiad
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link to="/">
              <a class="nav-link" href="#">INICIO</a>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/funcionalidades">
              <a class="nav-link" href="#">FUNCIONALIDADES</a>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link to="/precios">
              <a class="nav-link" href="#">PLANES</a>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link to="/register">
              <a class="nav-link" href="#">INGRESAR</a>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link to="/business">
              <a class="nav-link" href="#">REGISTRARSE</a>
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  methods: {},
};
</script>

<style scoped>
.navbar {
  background-color: #ebe3ec !important;
  padding-left: 20px;
}

.nav-link {
  color: black !important;
  font-weight: 500;
  transition: color 0.5s ease; /* Agregar transición suave */
}

.nav-link:hover {
  color: #9a3990 !important; /* Cambiar el color al hacer hover */
}

.form-inline {
  background-color: white;
  display: flex;
  margin-left: 190px;
}
</style>
