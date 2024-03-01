<template>
  <div class="searchbar-container">
    <p>Bienvenido {{ userName }}</p>

    <div class="input-container">
    </div>
    <div class="date">
      <img style="width: 100px" src="../../../assets/3.png" alt="" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
export default {
  data() {
    return {
      userName: "",
    };
  },
  methods: {
    async getUserInfo() {
      try {
        const userId = localStorage.getItem("userId");
        const response = await axios.get(
          `http://localhost:3000/auth/${userId}`
        );
        const user = response.data;

        const userName = user.username;
        this.userName = userName;
        console.log(user.businessId);
      } catch (error) {
        throw error;
      }
    },
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
  mounted() {
    this.getUserInfo();
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
  margin-left: 400px; /* Puedes ajustar este valor según sea necesario */
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
  margin-left: 200px;
}
</style>
