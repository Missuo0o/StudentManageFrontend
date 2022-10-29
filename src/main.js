import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router'
import axios from "axios";


// 允许携带cookie
// axios.defaults.withCredentials = true
import BaiduMap from 'vue-baidu-map'


Vue.use(BaiduMap, {
    // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
    ak: 'EXDU3XqGfFuqUqYiA9dDZGbQ3DuWhwBW'
});
Vue.prototype.axios = axios;

Vue.use(ElementUI);

new Vue({
    el: '#app',
    render: h => h(App),
    router: router
});