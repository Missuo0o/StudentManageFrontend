import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router'
import axios from "axios";


// 允许携带cookie
// axios.defaults.withCredentials = true
import BaiduMap from 'vue-baidu-map'
import VForm from 'vform-builds' //引入VForm3库
import 'vform-builds/dist/VFormDesigner.css' //引入VForm样式
import MD5 from 'js-md5';
import echarts from 'echarts'

Vue.use(BaiduMap, {
    // ak 是在Baidu Map开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
    ak: 'EXDU3XqGfFuqUqYiA9dDZGbQ3DuWhwBW'
});

Vue.prototype.axios = axios;
Vue.prototype.md5 = MD5;
Vue.prototype.echarts = echarts
Vue.use(VForm)  //全局注册VForm3(同时注册了v-form-designe、v-form-render等组件)
Vue.use(ElementUI);

new Vue({
    el: '#app',
    render: h => h(App),
    router: router,
    beforeCreate() {
        Vue.prototype.$bus = this
    }
});
