<template>
  <div class="product-container">
    <div class="prices">
      <h4> <slot name="name"></slot> </h4>
      <h5><slot name="quantity"></slot></h5>
      <h5><slot name="price"></slot></h5>
      
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data(){
    return{
      products:[],
    }
  },
  methods:{
 
  }
 
};
</script>

<style scoped>
.product-container {
  margin: 15px;
  border-radius: 15px;
  padding: 15px;
  background-color: #7e31df;
  color: white;
}
.prices {
  display: flex;
  gap: 50px;
}
</style>
