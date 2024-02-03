<template>
    <div>
        <inputsComponent></inputsComponent>
        <randomInputsComponent></randomInputsComponent>
    </div>
</template>

<script>
import inputsComponent from '../components/dashboard/inputs/inputComponent.vue'
import randomInputsComponent from '@/components/dashboard/inputs/randomInputsComponent.vue';
export default {
    components:{
        inputsComponent,
        randomInputsComponent
    }
}
</script>