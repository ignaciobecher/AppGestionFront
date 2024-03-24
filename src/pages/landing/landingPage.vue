<template>
    <navbarComponent></navbarComponent>
    <heroComponent></heroComponent>
    <solutionsComponenVue></solutionsComponenVue>
    <AssistantComponent></AssistantComponent>
    <functionsComponent></functionsComponent>
    <pricesComponent></pricesComponent>
    <footerComponent></footerComponent>
</template>

<script>
import AssistantComponent from '@/components/landing/assistantComponent.vue';
import navbarComponent from '../../components/landing/navbarComponent.vue'
import heroComponent from '@/components/landing/heroComponent.vue';
import solutionsComponenVue from '@/components/landing/solutionsComponen.vue';
import functionsComponent from '@/components/landing/functionsComponent.vue';
import pricesComponent from '@/components/landing/pricesComponent.vue'
import footerComponent from '@/components/landing/footerComponent.vue';

export default {
    components:{
    navbarComponent,
    heroComponent,
    solutionsComponenVue,
    AssistantComponent,
    functionsComponent,
    pricesComponent,
    footerComponent
}
}
</script>


<style scoped></style>