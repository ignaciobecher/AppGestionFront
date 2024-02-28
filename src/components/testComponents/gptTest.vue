

<template>
  <div>
    <h1>Necesita estar logeado para acceder</h1>
    <button @click="goToLogin">Ir a logeo</button>
  </div>
</template>

<script>
export default {
  methods:{
    goToLogin(){
      this.$router.push('/register');

    }
  }
}
</script>