// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
// import Antd from 'ant-design-vue';
import App from './App';
// import 'ant-design-vue/dist/antd.css';
import axios from 'axios'
import 'ant-design-vue/lib/button/style/css'
import 'ant-design-vue/lib/input/style/css'
import 'ant-design-vue/lib/modal/style/css'
import 'ant-design-vue/lib/radio/style/css'
import 'ant-design-vue/lib/back-top/style/css'
import 'ant-design-vue/lib/spin/style/css'
import 'ant-design-vue/lib/pagination/style/css'
import 'ant-design-vue/lib/anchor/style/css'
import {BackTop, Input, Modal, Radio, Spin, Pagination,Anchor} from 'ant-design-vue';

Vue.use(Input);
Vue.use(Modal);
Vue.use(Radio);
Vue.use(BackTop);
Vue.use(Spin);
Vue.use(Pagination);
Vue.use(Anchor);

const ajax = axios.create({
    baseURL: 'http://132.232.81.70:8089'  // 配置请求路由前缀
})
Vue.config.productionTip = false
// Vue.prototype.$ajax = ajax  两种定义都可以,使用时调用对应的变量
Vue.prototype.$axios = ajax
Vue.prototype.$defaultEmpty = function (input) {
    return input == null ? "" : input;
}

Vue.config.productionTip = false;

// Vue.use(Antd);
import router from '@/components/router'

new Vue({
    el: '#app',
    components: {App},
    router,
    template: '<App/>',
});
