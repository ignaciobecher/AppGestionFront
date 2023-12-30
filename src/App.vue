<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <navbarComponent></navbarComponent>
  <router-view></router-view>
</template>


<script>
import navbarComponent from "@/components/navbar/navbarComponent.vue";
export default {
  components:{
    navbarComponent,

  }
}
</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap');


*{font-family: 'Ubuntu', sans-serif;}
</style>