// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// import Antd from 'ant-design-vue';
// import 'ant-design-vue/dist/antd.css';

// import Vue from 'vue';
import App from './App';
// import axios from 'axios'

import 'ant-design-vue/lib/input/style/css'
import 'ant-design-vue/lib/modal/style/css'
import 'ant-design-vue/lib/radio/style/css'
import 'ant-design-vue/lib/back-top/style/css'
import 'ant-design-vue/lib/spin/style/css'
import 'ant-design-vue/lib/pagination/style/css'
import 'ant-design-vue/lib/anchor/style/css'


import 'ant-design-vue/lib/button/style/css'
import Button from 'ant-design-vue/lib/button';

Vue.use(Button);


import 'ant-design-vue/lib/upload/style/css'
import Upload from 'ant-design-vue/lib/upload';

Vue.use(Upload);

import 'ant-design-vue/lib/form-model/style/css'
import FormModel from 'ant-design-vue/lib/form-model';

Vue.use(FormModel);


import Affix from 'ant-design-vue/lib/affix';
import 'ant-design-vue/lib/affix/style/css'

Vue.use(Affix);

import Dropdown from 'ant-design-vue/lib/dropdown';
import 'ant-design-vue/lib/dropdown/style/css'

Vue.use(Dropdown);

import Menu from 'ant-design-vue/lib/menu';
import 'ant-design-vue/lib/menu/style/css'

Vue.use(Menu);

import Icon from 'ant-design-vue/lib/icon';
import 'ant-design-vue/lib/icon/style/css'

Vue.use(Icon);

import Select from 'ant-design-vue/lib/select';
import 'ant-design-vue/lib/select/style/css'

Vue.use(Select);

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

import message from 'ant-design-vue/lib/message'
import 'ant-design-vue/lib/message/style/css'
Vue.prototype.$message = message;
message.config({
    top: `50px`,
    duration: 1,
    maxCount: 3,
});



Vue.config.productionTip = false
import myAxios from './components/config/myAxios'

Vue.prototype.$axios = myAxios

import store from './components/store'

Vue.prototype.$store = store

import bus from '@/components/bus/eventBus.js'

Vue.prototype.$bus = bus

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

Vue.filter('joinStrBefore', function (source, param) {
    return param + source;
})

Vue.filter('defaultValue', function (source, defaultValue) {
    if (source === undefined || source == null) {
        return defaultValue;
    }
    return source;
})

// Vue.use(Antd);
import router from '@/components/router'

new Vue({
    el: '#app',
    components: {App},
    router,
    template: '<App/>',
});
