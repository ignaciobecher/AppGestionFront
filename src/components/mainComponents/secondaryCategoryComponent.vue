<template>
    <div class="main-container">
      <h1>
        <slot name="second"> </slot>
      </h1>
    </div>
  </template>
  
  
  <style scoped>
  
  .main-container{
    display: flex; /* Usa flexbox */
    justify-content: center; /* Centra horizontalmente */
    align-items: center; /* Centra verticalmente */
    background-color: #0c86be;
    width: 100%;
    border-radius: 15px;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(5px);
    padding: 20px;
    height: 100px; /* Añade una altura para demostración */
  }
  
  h1{
    font-size: 50px;
    color: white;
  }
  
  </style>