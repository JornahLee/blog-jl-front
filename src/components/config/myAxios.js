// 用了cdn 不用import axios
import message from 'ant-design-vue/lib/message'
// 无法使用 this.$store， 因为这里访问不到 全局的vue对象
import store from '../store/index'

axios.interceptors.request.use(
    config => {
        // config.baseURL = 'http://localhost:8089'
        config.baseURL = 'http://132.232.81.70:8089'
        const token = store.state.token
        if (token) {
            // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers['Authorization'] = token;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
axios.interceptors.response.use(resp => {
    // let apiResp=resp.data.data
    // console.log(apiResp);
    // console.log(apiResp.length <= 0);
    // console.log(Object.keys(apiResp).length === 0);
    // if (apiResp.length <= 0 || Object.keys(apiResp).length === 0) {
    //     message.succcess({content: '这里啥也没有'})
    // }
    // console.log(resp);
    // console.log('resp');
    // if (resp.status && resp.status === 200 && resp.data.status === 'error') {
    //     console.error({message: resp.data.msg});
    //     return;
    // }
    return resp;
}, err => {
    let resp = err.response
    if (resp.status === 504 || resp.status === 404) {
        message.error({content: '服务器被吃了⊙﹏⊙∥'})
    } else if (resp.status === 403) {
        message.error({content: '权限不足,请联系管理员!'});
    } else if (resp.status === 401) {
        message.error({content: '未登录!'})
        store.resetState()
    } else {
        message.error({content: '未知错误!'});
    }
    return Promise.resolve(err);
})

export default axios;
