<template>
  <div class="userContainer">
    <h2>Usuarios</h2>

    <div class="table-responsive">
      <table class="table table-hover table-nowrap">
        <thead class="thead-light">
          <tr class="tableRow">
            <th scope="col">Nombre de usuario</th>
            <th scope="col">Email</th>
            <th scope="col">Rol</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody class="table-body">
          <!-- *****************************TODAS LA VENTAS**************************************************** -->
          <tr @click="setId(user._id)" v-for="user in usersArray">
            <td>
              <span>{{ user.username }}</span>
            </td>

            <td>
              <span>{{ user.email }}</span>
            </td>
            <td>
              <span v-if="editing === false">{{ user.role }}</span>
              <select v-else name="" id="">
                <option value="">{{ user.role }}</option>
                <option value="manager">Propietario</option>
                <option value="administrador">Encargado</option>
                <option value="user">Vendedor</option>
              </select>
            </td>

            <td>
              <a> <i @click="deleteUser" class="bi bi-trash"></i></a>
            </td>
            <td>
              <!-- <a href="#">
                <i style="color: black" class="bi bi-pencil"></i>
              </a> -->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

const businessId = localStorage.getItem("businessId");
export default {
  data() {
    return {
      usersArray: [],
      userState: false,
      editing: false,
      userId: null,
    };
  },
  methods: {
    async getAllUsers() {
      try {
        const response = await axios.get(
          `https://api-gestion-ahil.onrender.com/auth/business/${businessId}`
        );
        const users = response.data;
        this.usersArray = users;
      } catch (error) {
        window.alert("Error al obtener tus usuarios, reintenta nuevamente");
      }
    },
    async deleteUser() {
      try {
        if (window.confirm("¿Esta seguro?")) {
          const response = await axios.delete(
            `https://api-gestion-ahil.onrender.com/auth/business/${businessId}/user/${this.userId}`
          );
          window.alert("Usuario eliminado");
          this.getAllUsers()
        }else{
            window.alert('Accion cancelada')
        }


      } catch (error) {
        window.alert('Error al eliminar usuario')
      }
    },
    setId(id) {
      this.userId = id;
      console.log(this.userId);
    },
  },
  mounted() {
    this.getAllUsers();
  },
};
</script>

<style scoped>
.userContainer {
  margin: 10px;
}

.table-responsive {
  background-color: #ffffff;
  box-shadow: 4px 4px 5px -4px rgba(0, 0, 0, 0.75);
}

.tableRow th {
  background-color: #ffffff;

  color: black;
}

select {
  width: 70%;
}

.tableRow td {
  background-color: #ffffff;

  color: black;
}

.table-body td {
  background-color: #ffffff;

  color: black;
}
</style>
