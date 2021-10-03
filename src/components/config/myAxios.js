// 用了cdn 不用import axios
import store from '../store/index'

let defaultToken = `eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjEsImlhdCI6MTYzMzIzMzE4MSwiZXhwIjoxNjM1ODI1MTgxfQ.Pp82sTvaVWIyOYuMDIj7FvcQeAeJHaio4g_dT8zYXIA`
axios.interceptors.request.use(
    config => {
        config.baseURL = 'http://localhost:8089'
        // config.baseURL = 'http://132.232.81.70:8089'
        const token = store.state.token
        if (token) {
            // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers['Authorization'] = token;
        } else {
            config.headers['Authorization'] = defaultToken;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
axios.interceptors.response.use(resp => {
    // let apiResp=resp.data
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
        console.error({message: '服务器被吃了⊙﹏⊙∥'});
    } else if (resp.status === 403) {
        console.error({message: '权限不足,请联系管理员!'});
    } else if (resp.status === 401) {
        console.error({message: '未登录!'});
        store.resetState()
    }else{
        console.error({message: '未知错误!'});
    }
    return Promise.resolve(err);
})

export default axios;
