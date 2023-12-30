<template>
  <div class="methods">
    <select id="metodosPago">
      <option value="tarjeta">Efectivo</option>
      <option value="paypal">Transferencia</option>
      <option value="transferencia">Debito/Credito</option>
      <option value="efectivo">Cuenta corriente</option>
    </select>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.methods {
  margin: 15px;
}

.methods select {
  padding: 15px;
  border-radius: 10px;
  width: 80%;
}
</style>
