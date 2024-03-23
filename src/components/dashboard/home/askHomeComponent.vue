<template>
  <div class="main-container">
    <div class="inner-container">
      <h4>
        Asistente virtual

        <a href="">
          ¿Como usar el asistente virtual de Adminia?
          <i
            style="font-size: 12px; cursor: pointer"
            class="bi bi-question-circle"
          ></i
        ></a>
      </h4>

      <input
        v-model="question"
        type="text"
        placeholder="Ingresar pregunta al asistente virtual"
      />

      <div class="inner" style="display: flex">
        <button @click="askGpt">Enviar</button>
      </div>
      <div
        v-if="loading === true"
        style="display: flex; justify-content: center; margin-top: 20px"
      >
        <spinner> </spinner>
      </div>

      <p v-if="loading === false" v-html="formattedResponse()"></p>
      <button v-if="showPrint === true" @click="printResponse">Imprimir</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import spinner from "@/components/visuals/spinner.vue";
const businessId = localStorage.getItem("businessId");

export default {
  components: {
    spinner,
  },
  data() {
    return {
      question: "",
      respuesta: "",
      information: [],
      loading: false,
      showPrint: false,
    };
  },
  methods: {
    formattedResponse() {
      return this.respuesta.split("*").join("*<br/><br/>");
    },
    async askGpt() {
      try {
        if (this.question === "") {
          window.alert("Tu pregunta no puede estar vacia");
          return;
        }
        this.loading = true;
        this.information = await this.getBusinessData();
        const response = await axios.post(`http://localhost:3000/chat-gpt/`, {
          message: this.question,
          info: this.information,
        });
        const data = response.data;

        this.respuesta = data;
        this.loading = false;
        this.showPrint = true;
      } catch (error) {
        throw error;
      }
    },
    async getBusinessData() {
      try {
        const businessId = localStorage.getItem("businessId");

        const response = await axios.get(
          `http://localhost:3000/business/${businessId}`
        );
        const businessInfo = response.data;
        return businessInfo;
      } catch (error) {
        throw error;
      }
    },
    generateResponseContent() {
      const currentDate = new Date();
      const day = currentDate.getDate().toString().padStart(2, "0");
      const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
      const year = currentDate.getFullYear();
      const formattedDate = `${day}/${month}/${year}`;
      let contentHTML = `
    <h2>Consulta al asistente</h2>
    <h5>Fecha: ${formattedDate}</h5>

  `;
      const responseContent = this.respuesta;
      contentHTML += responseContent;
      return contentHTML;
    },
    printResponse() {
      const responseContent = this.generateResponseContent();

      const printWindow = window.open("", "_blank");
      printWindow.document.write(responseContent);
      printWindow.document.close();
      printWindow.print();
    },
  },
  mounted() {
    // this.getBusinessData()
  },
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

.inner-container a {
  font-size: 12px;
}
</style>
