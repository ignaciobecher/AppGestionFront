<template>
  <div class="first-login-modal" v-if="showModal">
    <div class="modal-content">
      <h2>Bienvenido a Adminia</h2>
      <p>
        ¡Gracias por registrarte! Te damos la bienvenida a nuestra plataforma de
        gestión de negocios.
      </p>
      <p>
        Para que te familiarices con todas nuestras funciones, te ofrecemos una
        prueba gratuita de 7 días.
      </p>
      <p>
        No se te cobrará nada durante este período y podes cancelar en cualquier
        momento.
      </p>
      <button @click="closeModal">Continuar</button>
    </div>
  </div>
</template>

<script>

export default {
  
  data() {
    return {
      showModal: true
    };
  },
  methods: {
    closeModal() {
      this.showModal = false;
    },
    
   
  },
  created(){
  }
}
</script>

<style scoped>
.first-login-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  max-width: 400px;
  text-align: center;
  border-radius: 0%;
  border: none;
}

button {
  background-color: #5c39f5;
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-weight: 500;
  margin-top: 15px;
}

button:hover {
  background-color: #7d65e6;
}
</style>
