import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import VueChartkick from 'vue-chartkick';
import 'chartkick/chart.js'
import axios from 'axios';

const app = createApp(App);

axios.interceptors.request.use(
    config=>{
        const token= localStorage.getItem('userToken')
        if(token){
            config.headers.Authorization=`Bearer ${token}`
        }
        return config
    },
    error=>{
        return Promise.reject(error)
    }
)

app.use(router);
app.use(VueChartkick)

app.mount('#app');
