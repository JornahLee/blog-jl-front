<template>
  <div>
    <router-link to="/index">
      <div class="home">
        <div>Jornah Lee</div>
        <div>Love Life!</div>
      </div>
    </router-link>
    <div class="search-bar">
      <my-search></my-search>
    </div>
    <div class="xxx-bar">
      <div class="to-login" v-if="!isLogin">
        <router-link to="/login">登录</router-link>
      </div>
      <div class="manage-drop" v-else>
        <a-dropdown>
          <a class="ant-dropdown-link">
            {{ username }}
          </a>
          <a-menu slot="overlay">
            <a-menu-item>
              <router-link to="/edit/-1">新文章</router-link>
            </a-menu-item>
            <a-menu-item>
              <router-link to="/music">音乐</router-link>
            </a-menu-item>

            <a-menu-item>
              <a @click="toTodoList">
                <a-icon type="carry-out"/>
              </a>
            </a-menu-item>

            <a-menu-item>
              <a @click="logout">注销</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
      <div class="show-recent">
        <a-icon type="history"/>
      </div>
      <div class="to-articleList">
        <router-link to="/articleList/true">
          <a-icon type="home"/>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import MySearch from "../MySearch";

export default {
  name: 'MobileHeader',
  components: {
    MySearch
  },
  props: ['isLogin', 'username'],
  methods: {
    logout() {
      this.$store.resetState()
      this.$message.success({content: "注销成功"})
    },
    toTodoList() {
      this.$router.push('/articleList/false');
      this.timer = setTimeout(() => {
        let todoCateId = 40;
        this.$bus.$emit('selectArticleByCondition', 'byCate', todoCateId);
      }, 200)
    }
  }
}
</script>

<style>

.home {
  width: 25%;
  height: 50px;
  font-size: 16px;
  color: white;
  background-color: rgb(43, 43, 43);
  float: left;
}


.search-bar {
  margin-top: 10px;
  margin-left: 20px;
  float: left;
  width: 35%;
  z-index: 9999;
  background-color: yellow;
}

.xxx-bar {
  margin-right: 20px;
}

.to-articleList, .manage-drop, .to-login, .show-recent {
  float: right;
  margin-left: 10px;
  margin-top: 20px;
}

</style>
