<template>
    <div class="businessContainer" v-for="item in business" :key="item.id">
      <h1>Negocio:</h1>
      <ul >
        <li>
          <strong>Nombre:</strong> {{ item.name }}
        </li>
        <li>
          <strong>Categoría:</strong> {{ item.category }}
        </li>
        <li>
          <strong>Dirección:</strong> {{ item.address }}
        </li>
        <li>
          <strong>Email:</strong> {{ item.email }}
        </li>
        <h5>Productos</h5>
        <ul>
          <li v-for="(product, index) in item.products" :key="index">
            {{ product }}
          </li>
        </ul>
        

        <h5>Ventas</h5>
        <ul>
          <li v-for="(sale,index) in item.sales" :key="index">
            {{ sale}}
          </li>
        </ul>
        
        <h5>Compras</h5>
        <ul>
          <li v-for="(buy,index) in item.buys" :key="index">
            {{ buy }}
          </li>
        </ul>

        <h5>Egresos</h5>
        <ul>
          <li v-for="(output, index) in item.outputs" :key="index">
            {{ output }}
          </li>
        </ul>
        <h5>Ingresos</h5>
        <ul>
          <li v-for="(input,index) in item.inputs" :key="index">
            {{ input }}
          </li>
        </ul>
        
      </ul>
    </div>

   
  </template>
  
  <script>

  export default {
  
  };
  </script>
  
  <style scoped>
 
  ul {
    list-style: none;
    padding-left: 0;
  }
  
  li {
    margin-bottom: 5px;
  }

  .businessContainer{
    border: 1px solid black;
    margin: 10px;
    width: 70%;
    padding: 20px;
  }
  </style>
  