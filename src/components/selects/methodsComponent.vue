<template>
  <div class="methods">
    <select id="metodosPago">
      <option value="efectivo">Efectivo</option>
      <option value="transferencia">Transferencia</option>
      <option value="cheque">Debito/Crédito</option>
      <option value="cuenta_corriente">Cuenta corriente</option>
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
