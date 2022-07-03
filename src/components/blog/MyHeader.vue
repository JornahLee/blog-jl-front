<template>
  <div>
    <router-link to="/index">
      <div class="home">
        <div class="blog-name">Jornah's Blog</div>
      </div>
    </router-link>
    <div class="search-bar">
      <my-search></my-search>
    </div>
    <div class="xxx-bar">
      <div class="to-login" v-if="!isLogin">
        <router-link to="/login" > <a-icon type="user" style="color: black;" /></router-link>
      </div>
      <div class="manage-drop" v-else>
        <a-dropdown>
          <a class="ant-dropdown-link">
<!--            {{ username }}-->
            <a-icon type="user" style="color: black" />
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
            <a-icon type="menu" style="color: black"/>
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
      </div>
      <div v-if="isLogin" class="to-todoList">
        <todo></todo>
      </div>
      <recent-read class="show-recent"></recent-read>
      <div class="to-articleList">
        <router-link to="/articleList/all">
          <a-icon type="unordered-list" style="color: black;"/>
        </router-link>
      </div>
      <div class="to-articleList">
        <router-link to="/index">
          <a-icon type="home" style="color: black;"/>
        </router-link>
      </div>


    </div>
  </div>
</template>

<script>
import MySearch from "../MySearch";
import RecentRead from "../header/RecentRead";
import Todo from "../header/Todo"

export default {
  name: 'MyHeader',
  components: {
    RecentRead,
    MySearch,
    Todo
  },
  data() {
    return {}
  },
  props: ['isLogin', 'username'],
  methods: {
    logout() {
      this.$store.resetState()
      this.$router.go(0)
    }
  }
}
</script>

<style scoped>
.blog-name{
  margin-top: 8px;
  font-size: 20px;
}

.home {
  width: 20%;
  height: 50px;
  font-size: 16px;
  color: white;
  background-color: rgb(43, 43, 43);
  float: left;
  border-radius: 2px;
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
  margin-top: -8px;
  font-size: 20px;
  float: right;
}

.to-articleList, .manage-drop, .other-drop, .to-login, .to-todoList, .show-recent {
  float: right;
  margin-left: 15px;
  margin-top: 20px;

}

.xxx-bar, .to-login, .ant-dropdown-link {
  color: black;
}


</style>
