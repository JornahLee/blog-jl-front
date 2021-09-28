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
        <div class="to-admin">
          后台管理
        </div>
        <div class="to-about">
          <router-link to="/about">关于</router-link>
        </div>
        <div class="to-archive">
          <router-link to="/archive">归档</router-link>
        </div>
        <div class="to-blogPortal">
          <router-link to="/blogPortal">博客</router-link>
        </div>
        <div class="to-index">
          <router-link to="/xxxx">首页</router-link>
        </div>
        <div class="to-edit">
          <router-link to="/edit">编辑</router-link>
        </div>
      </div>
    </template>

    <template v-slot:left>
      <transition name="slide" mode="out-in">
        <my-nav></my-nav>
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

// 通过兄弟组件之间刷新数据，
// 但是我觉得这样不好，这样子打破封装了，不符合最少知识原则
export default {
  name: 'Detail',
  components: {
    MySearch,  MyNav,
    MainFrame, Category, ArticleFrame
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


.to-index, .to-blogPortal, .to-archive, .to-about, .to-admin {
  float: right;
  margin-left: 20px;
  margin-top: 20px;
}

</style>
