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
  import searchbar from '../components/dashboard/home/searchBarComponent.vue'
  import resume from "../components/dashboard/home/resumeComponent.vue";
  import chart from '../components/dashboard/home/chartComponent.vue'
  export default {
    components: {
      resume,
      searchbar,
      chart,
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
  