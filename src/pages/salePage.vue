<template>
    <div class="sales-container">
        <searchBarComponent class="searchbar" title="Buscar producto:"></searchBarComponent>
        <productComponent class="product"></productComponent>
    </div>
</template>


<script>
import searchBarComponent from '@/components/dashboard/home/searchBarComponent.vue';
import productComponent from '@/components/dashboard/sales/productComponent.vue';
export default {
    components:{
        searchBarComponent,
        productComponent
    }
}
</script>

<style scoped>
.searchbar{
    margin: 10px;
}

.product{
}
</style>