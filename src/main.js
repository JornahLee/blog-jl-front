// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// import Antd from 'ant-design-vue';
// import 'ant-design-vue/dist/antd.css';

// import Vue from 'vue';
import App from './App';
// import axios from 'axios'
import 'ant-design-vue/lib/button/style/css'
import 'ant-design-vue/lib/input/style/css'
import 'ant-design-vue/lib/modal/style/css'
import 'ant-design-vue/lib/radio/style/css'
import 'ant-design-vue/lib/back-top/style/css'
import 'ant-design-vue/lib/spin/style/css'
import 'ant-design-vue/lib/pagination/style/css'
import 'ant-design-vue/lib/anchor/style/css'

import Affix from 'ant-design-vue/lib/affix';
import 'ant-design-vue/lib/affix/style/css'

Vue.use(Affix);

import Input from 'ant-design-vue/lib/input';

Vue.use(Input);
import Modal from 'ant-design-vue/lib/modal';

Vue.use(Modal);
import BackTop from 'ant-design-vue/lib/back-top';
import Radio from 'ant-design-vue/lib/radio';
import Spin from 'ant-design-vue/lib/spin';
import Pagination from 'ant-design-vue/lib/pagination';
import Anchor from 'ant-design-vue/lib/anchor';

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

// copy的别人的做法
Vue.filter('dateFormat', function (dt) {
    let date = new Date(dt)
    let ret;
    let fmt = 'YYYY-mm-dd HH:MM:SS'
    const opt = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "H+": date.getHours().toString(),           // 时
        "M+": date.getMinutes().toString(),         // 分
        "S+": date.getSeconds().toString()          // 秒
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        }
    }
    return fmt;
})

Vue.filter('joinStrBefore', function (str2, str1) {
    return str1 + str2;
})

// Vue.use(Antd);
import router from '@/components/router'


new Vue({
    el: '#app',
    components: {App},
    router,
    template: '<App/>',
});
