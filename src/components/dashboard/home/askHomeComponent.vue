<template>
  <div class="main-container">
    <div class="inner-container">
      <h4>Asistente virtual <i style="font-size: 15px; cursor: pointer;" class="bi bi-question-circle"></i></h4>
    
      <input
        v-model="question"
        type="text"
        placeholder="Ingresar pregunta al asistente virtual"
      />
      
      <button @click="askGpt">Enviar</button>
      <p v-html="formattedResponse()"></p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
const businessId = localStorage.getItem("businessId");

export default {
  data() {
    return {
      question: "",
      respuesta:'',
      information: [],
    };
  },
  methods: {
    formattedResponse() {
      return this.respuesta.split('*').join('*<br/><br/>');
    },
    async askGpt() {
      try {
        this.information=await this.getBusinessData()
        
        console.log('Pregunta: ',this.question);
        console.log('Informacion: ',this.information);

        const response = await axios.post(
          `http://localhost:3000/chat-gpt/${this.question}`,
          {
            info: this.information,
          }
        );
        const data = response.data;

        this.respuesta=data

       
      } catch (error) {
        throw error;
      }
    },
    async getBusinessData() {
      try {
        const response = await axios.get(
          `http://localhost:3000/business/${businessId}`
        );
        const businessInfo = response.data;
        return businessInfo
      } catch (error) {
        throw error;
      }
    },
  },
  mounted(){
    // this.getBusinessData()
  }
};
</script>

<style scoped>
.main-container {
  color: black;
  margin-left: 10px;
  margin-right: 10px;
  background-color: #ffffff;
  box-shadow: 5px 5px 5px -5px rgba(0, 0, 0, 0.75);
  overflow-y: auto;
  max-height: 312px;
}

.inner-container {
  margin: 10px;
  
}
.inner-container input {
  width: 100%;
}

.inner-container button {
  margin-top: 10px;
  width: 100%;
  border: none;
  border-radius: 0%;
  background-color: #b28cc4;
  font-size: 20px;
  font-weight: 500;
}
</style>
