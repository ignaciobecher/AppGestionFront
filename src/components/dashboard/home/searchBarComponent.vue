<template>
  <div class="searchbar-container">
    <p>{{ title }}</p>
    <input placeholder="Buscar..." type="search" />
    <div class="date">
    <p style="color: white">{{ formatDate(todayDate) }}</p>
  </div>
  </div>

  
</template>

<script>
import moment from "moment";
export default {
  props:{
    title:{
      type:String,
      default:"Busqueda rapida: "
    }
  }
  ,
  methods: {
    getDate() {
      const date = new Date();
      this.todayDate = date;
    },
    formatDate(date) {
      return moment(date).format("DD/MM/YYYY");
    },
  },
  created() {
    this.getDate();
  },
};
</script>

<style scoped>
.searchbar-container {
  display: flex;
  align-items: center; /* Alinear verticalmente los elementos */
}

.searchbar-container p {
  margin-right: 10px; /* Ajustar márgenes si es necesario */
  margin-top: 10px;
  font-size: 20px;
  padding: 10px;
  font-weight: bolder;
}

.searchbar-container input {
  margin-left: 20px; /* Ajustar márgenes si es necesario */
  width: 50%;
  border-radius: 15px;
  border: 1px solid #574f7a;
  padding: 10px;
}
.date{
    margin-left: 170px;
}
</style>
