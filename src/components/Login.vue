<template>
  <a-form-model layout="horizontal" :model="formInline" @submit="handleSubmit" @submit.native.prevent>
    <a-form-model-item>
      <a-input v-model="formInline.username" placeholder="Username">
        <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)"/>
      </a-input>
    </a-form-model-item>
    <a-form-model-item>
      <a-input v-model="formInline.password" type="password" placeholder="Password">
        <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)"/>
      </a-input>
    </a-form-model-item>
    <a-form-model-item>
      <a-button
          type="primary"
          html-type="submit"
          :disabled="formInline.username === '' || formInline.password === ''"
      >
        登录
      </a-button>
    </a-form-model-item>
  </a-form-model>
</template>
<script>

import store from './store'

export default {
  data() {
    return {
      formInline: {
        username: 'jornah',
        password: 'jornahlee',
      },
      sharedState: store.state
    };
  },
  methods: {
    handleSubmit(e) {
      console.log(this.formInline);
      this.login(this.username, this.password)
    },
    login(username, password) {
      let url = '/blog/auth/login';
      let config = {
        headers: {"Authorization": ""}
      };
      this.$axios.post(url, this.formInline, config).then(resp => {
        console.log(resp.data.data);
        let {accessToken, username, screenName, email} = resp.data.data
        store.setIsLogin(true)
        store.setUsername(username)
        store.setToken(accessToken)
        this.$router.push("/index")
      })

    }
  },
};
</script>
