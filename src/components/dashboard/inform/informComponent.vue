<template>
  <div class="informContainer">
    <div style="background-color: #1a1a1a" class="info-container">
      <h1 style="color: white; font-size: 25px; font-weight: 400">
        <i style="color: green" class="bi bi-cash"></i> Balance actual
      </h1>
      <h1 style="color: white">123</h1>
      <div class="button-container">
        <button>Asistente virtual</button>
        <br />
      </div>
    </div>

    <div style="background-color: #1a1a1a" class="info-container">
      <h1 style="color: white; font-size: 25px; font-weight: 400">
        <i style="color: blue" class="bi bi-boxes"></i> Stock actual
      </h1>
      <h1 style="color: white">123 productos</h1>
      <div class="button-container">
        <button>Asistente virtual</button>
        <br />
      </div>
    </div>

    <div style="background-color: #1a1a1a" class="info-container">
      <h1 style="color: white; font-size: 25px; font-weight: 400">
        <i style="color: green" class="bi bi-bag"></i>Ventas de hoy
      </h1>
      <h1 style="color: white">123</h1>
      <div class="button-container">
        <button>Asistente virtual</button>
        <br />
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.informContainer {
  margin: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

.info-container {
  border-radius: 15px;
  padding: 10px;
  margin: 10px;
  transition: color 0.5s, font-size 0.5s;
}

.info-container:hover {
  color: #5c39f5;
  background-color: #292a31 !important;
  border: 1px solid white;
  font-size: 30px;
}

.info-container h1 {
  color: black;
}

.info-container button {
  background-color: #5c39f5;
  border: none;
  border-radius: 15px;
  padding: 5px;
  font-size: 15px;
  margin-bottom: 10px;
}

.info-container a {
  text-decoration: underline;
  color: black;
}
</style>
