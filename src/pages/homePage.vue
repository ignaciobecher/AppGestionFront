<template>
  <div class="resume-container">
    <div class="title">
      <searchbar></searchbar>
    </div>

    <div class="resume">
      <resume></resume>
    </div>

    <div class="graphics">
      <chart></chart>
     
    </div>
  </div>
</template>

<script>
import searchbar from "../components/dashboard/home/searchBarComponent.vue";
import resume from "../components/dashboard/home/resumeComponent.vue";
import chart from "../components/dashboard/home/chartComponent.vue";
export default {
  components: {
    resume,
    searchbar,
    chart,
  },
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
  grid-template-columns: 1fr 1fr 1fr;
}

.graphics {
  width: 50%;
}
</style>
