<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">
        <img
          src="../../assets/logoNav.png"
          class="d-inline-block align-top"
          width="60"
          alt=""
          style="margin-right: 200px"
        />
      </a>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <a class="nav-link" href="#">INICIO</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">FUNCIONALIDADES</a>
          </li>

          <li class="nav-item">
            <a class="nav-link" href="#">PLANES</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">CONTACTO</a>
          </li>

          <div class="loginDiv">
            <li class="nav-item">
              <router-link to="/register">
                <a class="nav-link" href="#">INGRESAR</a>
              </router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">|</a>
            </li>
            <li class="nav-item">
              <router-link to="/business">
                <a class="nav-link" href="#">CREAR CUENTA</a>
              </router-link>
            </li>
          </div>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {};
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

.loginDiv {
  background-color: white;
  display: flex;
  margin-left: 190px;
}
</style>
