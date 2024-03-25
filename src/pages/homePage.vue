<template>
  <div class="resume-container">
    <!-- Condición para mostrar firstLogin solo si no ha iniciado sesión antes -->
    <firstLogin v-if="!loggedBefore"></firstLogin>
    <div class="title">
      <searchbar></searchbar>
    </div>

    <div class="resume">
      <resume></resume>
    </div>

    <div class="graphics">
      <chart></chart>
      <askHomeComponent></askHomeComponent>
    </div>
  </div>
</template>

<script>
import searchbar from "../components/dashboard/home/searchBarComponent.vue";
import resume from "../components/dashboard/home/resumeComponent.vue";
import chart from "../components/dashboard/home/chartComponent.vue";
import askHomeComponent from "@/components/dashboard/home/askHomeComponent.vue";
import firstLogin from "@/components/visuals/firstLogin.vue";
export default {
  components: {
    resume,
    searchbar,
    chart,
    askHomeComponent,
    firstLogin
  },
  data() {
    return {
      loggedBefore: false // Inicialmente, se asume que el usuario no ha iniciado sesión antes
    };
  },
  created() {
    this.hasLoggedBefore();
  },
  methods: {
    hasLoggedBefore() {
      try {
        // Verificar si el indicador está en localStorage
        const loggedBefore = localStorage.getItem('loggedBefore');
        if (loggedBefore) {
          // Si el indicador existe, establecer la variable de datos correspondiente
          this.loggedBefore = true;
        } else {
          // Si el indicador no existe, marcarlo en localStorage
          localStorage.setItem('loggedBefore', 'true');
        }
      } catch (error) {
        console.error('Error al acceder al almacenamiento local:', error);
      }
    }
  }
};
</script>

<style scoped>
.resume-container {
  color: white;
  background-color: #f0e7f7;
}

.title {
  background-color: #ffffff;
  color: black;
}
.resume {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr ;
}

.graphics {
  display: grid;
  grid-template-columns: 1fr 1fr;
}


/* //RESPONSIVE PARA TELEFONO-****************************************************************** */
@media screen and (max-width: 768px){
  .resume{
    display: grid;
    grid-template-columns: 1fr;
  }

  .graphics{
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
  }
}


</style>
