<template>
    <navbar></navbar>
    <planes></planes>
    <footerc></footerc>
</template>


<script>
import navbar from '../../components/landing/navbarComponent.vue'
import planes from  '../../components/landing/pricesComponent.vue'
import footerc from '../../components/landing/footerComponent.vue'

export default{
components:{
    navbar,planes,footerc
}
}
</script>