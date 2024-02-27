<!-- <template>
  <div>
    <input @change="handleFileChange" type="file" />
    <button @click="analyzeImageWithOptic">Analyze Image</button>
  </div>
</template>

<script>
import * as Optiic from 'optiic';

export default {
  data() {
    return {
      selectedFile: null,
    };
  },
  methods: {
    handleFileChange(event) {
      this.selectedFile = event.target.files[0];
    },
    async analyzeImageWithOptic() {
      if (!this.selectedFile) {
        alert('Please select a file first.');
        return;
      }

      const optiic = new Optiic({
        apiKey: 'fcz5TzoOuwhaDgCb0jDaGeLgqcj2', // Asegúrate de usar tu propia API key
      });

      try {
        const formData = new FormData();
        formData.append('file', this.selectedFile);

        // Nota: Optiic puede requerir un formato específico de entrada, verifica la documentación para ajustes.
        const response = await optiic.process({
          image: formData, // Asegúrate de que esto cumpla con los requisitos de la API de Optiic.
        });

        console.log(response);
        // Procesa la respuesta aquí.
      } catch (error) {
        console.error('Error processing image with Optiic:', error);
        // Maneja el error aquí.
      }
    },
  },
};
</script> -->


<template>
  <div>
    <h1>Necesita estar logeado para acceder</h1>
    <button @click="goToLogin">Ir a logeo</button>
  </div>
</template>

<script>
export default {
  methods:{
    goToLogin(){
      this.$router.push('/register');

    }
  }
}
</script>