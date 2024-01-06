<template>
  <form v-if="showForm" action="" class="expenses-form">
    <div class="form-group">
      <h3>Nuevo gasto</h3>
      <input type="text" placeholder="Referencia" />
      <input type="number" placeholder="Valor" />
      <input type="text" placeholder="Descripcion" />
      <button @click="showFormFunction" class="btn-cancel">Cancelar</button>
      <button class="btn-confirm">Confirmar</button>
    </div>
  </form>
</template>

<script>
export default {
    data(){
        return{
            showForm:false
        }
    },
    methods:{
        showFormFunction(){
          this.showForm = !this.showForm;
        }
    }
};
</script>

<style scoped>
.expenses-form {
  width: 40%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 5px;
  padding: 5px;
  background-color: grey;
  position: absolute;
  top: 10%;
  right: 30%;
}

.form-group {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  width:100%;
}

.expenses-form{
    h3{
        color: white;
    }
}

label {
  font-size: 18px;
}

input {
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 16px;
  margin-bottom: 5px;

  width: 100%;
}

.btn-cancel,
.btn-confirm {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.btn-cancel {
  background-color: #ccc;
  color: #333;
  margin-bottom: 5px;
}

.btn-confirm {
  background-color: #007bff;
  color: #fff;
}
</style>
