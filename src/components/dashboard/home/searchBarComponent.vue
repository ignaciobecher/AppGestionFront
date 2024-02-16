<template>
  <div class="searchbar-container">
    <p>Bienvenido </p>
    <div class="input-container">
      <input placeholder="Buscar... " type="search" />
      <i class="bi bi-search"></i>
    </div>
    <div class="date"></div>
  </div>
</template>

<script>
import moment from "moment";
export default {
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
  align-items: center;
  box-shadow: 0px 5px 5px -5px rgba(32, 32, 32, 0.5);
}

.searchbar-container p {
  margin-left: 10px;
  margin-top: 10px;
  font-size: 25px;
  padding: 10px;
  font-weight: bolder;
}

.input-container {
  position: relative;
  margin-left: 500px; /* Puedes ajustar este valor según sea necesario */
}

.input-container input {
  border: 1px solid #574f7a;
  padding: 10px;
  padding-left: 30px; /* Añadimos espacio a la izquierda para el icono */
  width: 350px;
}

.input-container i {
  position: absolute;
  right: 10px; /* Ajusta la posición del icono dentro del input */
  top: 50%;
  transform: translateY(-50%);
  color: blueviolet;
}

.date {
  margin-left: 170px;
}
</style>
