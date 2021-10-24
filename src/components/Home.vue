<template>
  <main-frame>
    <template v-slot:header>
      <div v-if=""></div>

      <my-header v-if="windowWidth>600" class="my-header" :is-login="sharedState.isLogin"
                 :username="sharedState.username"/>
      <mobile-header v-else class="mobile-header"
                     :is-login="sharedState.isLogin" :username="sharedState.username"/>
    </template>

    <template v-slot:left>
      <transition name="slide" mode="out-in">
        <router-view name="editLeftSide"></router-view>
        <router-view name="articleNav"></router-view>
      </transition>
    </template>

    <template v-slot:center>
      <transition name="slide" mode="out-in">
        <router-view name="articleFrame"></router-view>
        <router-view name="tags"></router-view>
        <router-view name="archive"></router-view>
        <router-view name="articleList"></router-view>
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
import ArticleNav from "@/components/ArticleNav";
import EditLeftSide from "./admin/EditLeftSide";
import MyHeader from "./blog/MyHeader";
import MobileHeader from "./blog/MobileHeader";

export default {
  name: 'Home',
  data() {
    return {
      sharedState: this.$store.state,
      windowWidth: document.documentElement.clientWidth, //实时屏幕宽度
    }
  },
  components: {
    EditLeftSide,
    ArticleNav,
    MainFrame, Category, ArticleFrame,
    MyHeader, MobileHeader
  },
  mounted() {
    window.addEventListener('resize', () => {
      this.windowWidth = document.documentElement.clientWidth
    })
  }
}
</script>

<style>

.slide-enter-active {
  transition: all .5s;
}

.slide-enter /* .slide-leave-active below version 2.1.8 */
{
  transform: translateY(-20px);
}


</style>
