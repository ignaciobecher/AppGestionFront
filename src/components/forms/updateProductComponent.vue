<template>
  <form action="" class="update-form">
    <div class="form-group">
      <label for="product">Producto</label>
      <slot name="productName"></slot>
    </div>

    <div class="form-group">
      <label for="description">Descripción</label>
      <slot name="productDescription"></slot>
    </div>

    <div class="form-group">
      <label for="quantity">Cantidad</label>
      <slot name="productQuantity"></slot>
    </div>

    <div class="form-group">
      <label for="price">Precio</label>
      <slot name="productPrice"></slot>
    </div>

    <div class="form-group">
      <label for="barcode">Código de barras</label>
      <slot name="productBarcode"></slot>
    </div>

    <div class="form-actions">
      <slot name="cancelBtn"></slot>
      <slot name="confirmBtn"></slot>
    </div>
  </form>
</template>



<style scoped>
.update-form {
  width: 60%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.form-group {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  width: 80%;
}

label {
  font-size: 18px;
  margin-bottom: 5px;
}

input {
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 16px;
  width: 100%;
}

.btn-cancel,
.btn-confirm {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-right: 10px;
}

.btn-cancel {
  background-color: #ccc;
  color: #333;
}

.btn-confirm {
  background-color: #007bff;
  color: #fff;
}
</style>
