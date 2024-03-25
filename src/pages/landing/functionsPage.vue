<template>
        <navbar></navbar>
        <functions></functions>
        <footerC></footerC>
</template>


<script>
import navbar from '../../components/landing/navbarComponent.vue'
import functions from  '../../components/landing/functionsComponent.vue'
import footerC from '../../components/landing/footerComponent.vue'

export default{
    components:{
        navbar,functions,footerC
    }
}
</script>