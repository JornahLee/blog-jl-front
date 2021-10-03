<template>
  <main-frame>
    <template v-slot:header>
      <div>
        <div class="home">
          <div>Jornah Lee</div>
          <div>Love Life!</div>
        </div>
        <div class="search-bar">
          <my-search></my-search>
        </div>
        <div class="xxx-bar">
          <div class="to-login" v-if="!sharedState.isLogin">
            <router-link to="/login">登录</router-link>
          </div>
          <!--          <div v-else class="to-login">-->
          <!--            <router-link to="/login">{{ sharedState.username }}</router-link>-->
          <!--          </div>-->
          <div class="manage-drop" v-else>
            <a-dropdown>
              <a class="ant-dropdown-link">
                {{ sharedState.username }}
                <a-icon type="down"/>
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
                其他
                <a-icon type="down"/>
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

          <div class="to-blogPortal">
            <router-link to="/blogPortal">博客</router-link>
          </div>
          <div class="to-index">
            <router-link to="/index">首页</router-link>
          </div>
        </div>
      </div>
    </template>

    <template v-slot:left>
      <transition name="slide" mode="out-in">
        <!--        <my-nav></my-nav>-->
        <router-view name="editLeftSide"></router-view>
      </transition>
    </template>

    <template v-slot:center>
      <transition name="slide" mode="out-in">
        <router-view name="articleFrame"></router-view>
        <router-view name="tags"></router-view>
        <router-view name="archive"></router-view>
        <router-view name="portal"></router-view>
        <router-view name="about"></router-view>
        <router-view name="c2"></router-view>
        <router-view name="c1"></router-view>
        <router-view name="edit"></router-view>
        <router-view name="index"></router-view>
        <router-view name="music"></router-view>
        <router-view name="login"></router-view>
      </transition>

    </template>

    <template v-slot:right-bar>
      <!--        <transition name="slide">-->
      <router-view name="category"></router-view>
      <router-view name="blank"></router-view>
      <!--        </transition>-->
    </template>
  </main-frame>
</template>

<script>
import Category from '@/components/Category'
import ArticleFrame from '@/components/blog/ArticleFrame'
import MainFrame from '@/components/MainFrame'
import MyNav from "@/components/MyNav";
import MySearch from "./MySearch";
import EditLeftSide from "./admin/EditLeftSide";
import store from './store'

// 通过兄弟组件之间刷新数据，
// 但是我觉得这样不好，这样子打破封装了，不符合最少知识原则
export default {
  name: 'Detail',
  data() {
    return {
      sharedState: store.state
    }
  },
  components: {
    EditLeftSide,
    MySearch, MyNav,
    MainFrame, Category, ArticleFrame
  },
  mounted() {
  },
  methods: {
    logout() {
      store.resetState()
    }
  }
}
</script>

<style>

.left-inner {
  float: right;
  width: 60%;
}

.right-inner {
  float: right;
  width: 30%;
}

.slide-enter-active {
  transition: all .5s;
}

.slide-enter /* .slide-leave-active below version 2.1.8 */
{
  transform: translateY(-20px);
}

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


.to-index, .to-blogPortal, .manage-drop, .other-drop, .to-login {
  float: right;
  margin-left: 20px;
  margin-top: 20px;
}

.xxx-bar {
  margin-right: 20px;
}

</style>
