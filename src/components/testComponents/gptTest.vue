<template>
  <input
    v-model="userInput"
    @keyup.enter="sendMessage(userInput)"
    placeholder="Escribe un mensaje..."
  />
  <button @click="sendMessage(userInput)">Enviar</button>
</template>

<script>
import OpenAI from "openai";

export default {
  data() {
    return {
      userInput: "",
    };
  },
  methods: {
    async sendMessage(userMessage) {
      try {
        const openai = new OpenAI({
          organization: import.meta.env.VITE_ORG_ID,
          apiKey: import.meta.env.VITE_OPENAI_KEY,
          dangerouslyAllowBrowser: true,
        });

        const completion = await openai.chat.completions.create({
          messages: [
            {
              role: "system",
              content:
                "You are an assistant designed to help with business tasks such as analyzing sales data, generating reports, managing emails, and automating administrative tasks. You must return the data formated for an easy reading. You have to make a chart for the data",
            },
            {
              role: "user",
              content:
                "Analize this and give me a resume and some metrics" +
                userMessage,
            },
          ],
          model: "gpt-4",
          // response_format: { type: "json_object" },
        });
        console.log(completion.choices[0].message.content);
        this.responseArray = completion.choices[0].message.content;
      } catch (error) {
        console.error("Error al enviar mensaje al asistente:", error);
      }
    },
    async extractText() {
      const openai = new OpenAI({
        organization: import.meta.env.VITE_ORG_ID,
        apiKey: import.meta.env.VITE_OPENAI_KEY,
        dangerouslyAllowBrowser: true,
      });
      const response = await openai.chat.completions.create({
        model: "gpt-4-vision-preview",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Return JSON document with data. Only return JSON not other text.",
              },
              {
                type: "image_url",
                image_url: {
                  url: "data:image/png;base64,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",
                },
              },
            ],
          },
        ],
        max_tokens: 500,
      });
      console.log(response.choices[0].message.content);
    },
    async analizeText(data) {
      try {
        const openai = new OpenAI({
          organization: import.meta.env.VITE_ORG_ID,
          apiKey: import.meta.env.VITE_OPENAI_KEY,
          dangerouslyAllowBrowser: true,
        });

        const completion = await openai.chat.completions.create({
          model: "gpt-3.5-turbo-0125",
          response_format: { type: "json_object" },
          messages: [
            {
              role: "system",
              content:
                "Eres un asistente virtual para negocios diseñado para analizar datos y devolver metricas y resumenes en JSON"
            },
            {
              role: "user",
              content: "Analiza esto " + data,
            },
          ],
        });
        return completion.choices[0].message.content;
      } catch (error) {
        console.error("Error al enviar mensaje al asistente:", error);
      }
    },
  },
  mounted() {},
};
</script>
