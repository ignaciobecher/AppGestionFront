<template>
  <div class="dashboard-container">
    <div class="sidebar-container">
      <sidebar></sidebar>
    </div>

    <div class="resume-container">
      <div class="title">
        <h1 style="grid-area: 1/1/2/3">Bienvenido CuyoCode</h1>
      </div>

      <div class="resume">
        <resume></resume>
      </div>

      <div class="graphics">
        
      </div>
    </div>
  </div>
</template>

<script>
import sidebar from "../components/dashboard/sidebarComponent.vue";
import resume from "../components/dashboard/resumeComponent.vue";
export default {
  components: {
    sidebar,
    resume,
  },
};
</script>

<style scoped>
.dashboard-container {
  display: grid;
  grid-template-columns: 20% 80%;
  width: 100%;
  height: 100%;
}

.sidebar-container {
  background-color: #292a31;
  border-right: 1px solid rgb(55, 54, 54);
}


.resume-container {
  background-color: #292a31;
  color: white;
}

.title {
  background-color: #292a31;
  color: white;
  margin: 10px;
}
.resume{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
}


</style>
