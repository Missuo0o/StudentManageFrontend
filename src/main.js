import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router'
import axios from "axios";


// 允许携带cookie
axios.defaults.withCredentials = true

Vue.prototype.axios = axios;

Vue.use(ElementUI);

new Vue({
    el: '#app',
    render: h => h(App),
    router: router
});