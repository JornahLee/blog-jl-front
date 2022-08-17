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

export default {
  data() {
    return {
      formInline: {
        username: 'jornah',
        password: 'jornahlee',
      },
      sharedState: this.$store.state
    };
  },
  methods: {
    handleSubmit(e) {
      this.login(this.username, this.password)
    },
    login(username, password) {
      let url = '/blog/user/login';
      let config = {
        headers: {"Authorization": ""}
      };
      this.$axios.post(url, this.formInline, config).then(resp => {
        let {accessToken, username, screenName, email} = resp.data.data
        this.$store.setIsLogin(true)
        this.$store.setUsername(username)
        this.$store.setToken(accessToken)
        this.$router.push("/index")
        this.$message.success({content:"登录成功"})
      })

    }
  },
};
</script>
