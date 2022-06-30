// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// import Antd from 'ant-design-vue';
// import 'ant-design-vue/dist/antd.css';

// import Vue from 'vue';
import App from './App';
// import axios from 'axios'
import timeUtil from './utils/timeUtil'

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

import Drawer from 'ant-design-vue/lib/drawer'
import 'ant-design-vue/lib/drawer/style/css'

Vue.use(Drawer);

import Tag from 'ant-design-vue/lib/tag'
import 'ant-design-vue/lib/tag/style/css'

Vue.use(Tag);

import Avatar from 'ant-design-vue/lib/avatar'
import 'ant-design-vue/lib/avatar/style/css'

Vue.use(Avatar);

import Carousel from 'ant-design-vue/lib/carousel'
import 'ant-design-vue/lib/carousel/style/css'

Vue.use(Carousel);

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

import api from './components/config/api'

Vue.prototype.$api = api


import store from './components/store'

Vue.prototype.$store = store

import bus from '@/components/bus/eventBus.js'

Vue.prototype.$bus = bus

Vue.config.productionTip = false;

// copy的别人的做法
Vue.filter('dateTimeFormat', function (dt) {
    return timeUtil.dateTimeFormat(dt, 'YYYY-mm-dd HH:MM:SS')
})

Vue.filter('dateFormat', function (dt) {
    return timeUtil.dateFormat(dt)
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
    mounted() {
        window.location.hash = '/'
    }
});
