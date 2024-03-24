<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#" style="font-weight: 500">
        <img
          src="../../assets/logoNav.png"
          width="50"
          height="50"
          alt=""
        />Adminia
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
            <a class="nav-link" href="#">INICIO</a>
          </li>
          <li class="nav-item">
            <a @click="scrollToFunctionalities" class="nav-link" href="#"
              >FUNCIONALIDADES</a
            >
          </li>

          <li class="nav-item">
            <a @click="scrollToPlanes" class="nav-link" href="#">PLANES</a>
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
  methods: {
    scrollToFunctionalities() {
      // Verificar si estamos en la parte superior de la página
      if (window.scrollY === 0) {
        const yOffset = 1300;
        window.scrollTo({
          top: yOffset,
          behavior: "smooth", // smooth scrolling animation
        });
      }
    },
    scrollToPlanes() {
      if (window.scrollY === 0) {
        const yOffset = 1900;
        window.scrollTo({
          top: yOffset,
          behavior: "smooth", 
        });
      }
    },
    
  },
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
