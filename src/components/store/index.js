// 暴露一个全局单例公共对象， 记录登录状态

export default {
    debug: false,
    state: {
        isLogin: localStorage.getItem('isLogin'),
        username: localStorage.getItem('username'),
        email: localStorage.getItem('email'),
        token: localStorage.getItem('token'),
        passphrase: localStorage.getItem('passphrase'),

    },
    updatePassphrase(passphrase) {
        this.state.passphrase = passphrase
        localStorage.setItem('passphrase', passphrase)
    },
    resetState() {
        if (this.debug) console.log('store state reset')
        this.state.isLogin = false
        this.state.username = ''
        this.state.email = ''
        this.state.token = ''
        localStorage.removeItem('isLogin')
        localStorage.removeItem('username')
        localStorage.removeItem('token')
        localStorage.removeItem('email')
        localStorage.removeItem('passphrase')


    },
    setIsLogin(isLogin) {
        if (this.debug) console.log('setIsLogin triggered with ', isLogin)
        this.state.isLogin = isLogin
        localStorage.setItem('isLogin', isLogin)
    },
    setUsername(username) {
        if (this.debug) console.log('setUsername triggered with ', username);
        this.state.username = username
        localStorage.setItem('username', username)
    },
    setToken(token) {
        if (this.debug) console.log('token triggered with ', token);
        this.state.token = token
        localStorage.setItem('token', token)
    }
}
