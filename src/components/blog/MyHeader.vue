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
              <a @click="logout">注销</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
      <div class="other-drop">
        <a-dropdown>
          <a class="ant-dropdown-link">
            <a-icon type="menu"/>
          </a>
          <a-menu slot="overlay">
            <a-menu-item>
              <router-link to="/about">关于</router-link>
            </a-menu-item>
            <a-menu-item>
              <router-link to="/archive">归档</router-link>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
        <!--          <router-link to="/edit/-1">新文章</router-link>-->
      </div>
      <div class="to-articleList">
        <router-link to="/articleList/all">
          <a-icon type="home"/>
        </router-link>
      </div>

      <div v-if="isLogin" class="to-todoList">
        <router-link to="/articleList/byCate/40">
          <a-icon type="carry-out"/>
        </router-link>
      </div>
      <div class="show-recent">
        <a-icon type="history"/>
      </div>
    </div>
  </div>
</template>

<script>
import MySearch from "../MySearch";

export default {
  name: 'MyHeader',
  components: {
    MySearch
  },
  props:['isLogin','username'],
  methods: {
    logout() {
      this.$store.resetState()
      this.$message.success({content: "注销成功"})
    }
  }
}
</script>

<style>


.home {
  width: 20%;
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
  width: 20%;
  z-index: 9999;
}

.xxx-bar {
  margin-right: 20px;
}
.to-articleList, .manage-drop, .other-drop, .to-login, .to-todoList, .show-recent {
  float: right;
  margin-left: 20px;
  margin-top: 20px;
}

</style>
