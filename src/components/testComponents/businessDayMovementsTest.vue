<template>
    <div>
        <ul v-for="(movement,index) in movements.sales" :key="index">
            <li>{{ movement.total }}</li>
        </ul>
    </div>
</template>


<script>
import axios from 'axios';
export default {
    data(){
        return{
            movements:[]
        }
    },
    methods:{
        async getAllMovements(){
            const result= await axios.get(`http://localhost:3000/business/65931333d7c90d26950f7332/transactions/today`) 
            const allMovements=result.data
            this.movements=allMovements
        }
    },
    mounted(){
        this.getAllMovements()
    }
}
</script>


<style scoped>
</style>


