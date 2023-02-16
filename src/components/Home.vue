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
        <router-view name="userInfo"></router-view>
      </transition>
    </template>

    <template v-slot:center>
      <transition name="slide" mode="out-in">
        <router-view name="articleFrame"></router-view>
        <router-view name="tags"></router-view>
        <router-view name="archive"></router-view>
        <router-view name="articleList" :key="fullPath"></router-view>
        <router-view name="about"></router-view>
        <router-view name="c2"></router-view>
        <router-view name="c1"></router-view>
        <router-view name="edit" :key="fullPath"></router-view>
        <router-view name="index"></router-view>
        <router-view name="login"></router-view>
        <router-view name="tool"></router-view>
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
  computed: {
    fullPath() {
      return this.$route.fullPath
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
  },
  methods: {
    doReadStatistics(path) {
      if (/\/detail\/\d+/g.test(path) || /\/edit\/\d+/g.test(path)) {
        let readingArticleId = path.split('/').pop()
        if (!readingArticleId) {
          return;
        }
        let now = new Date().getTime()
        this.saveStatisticsResult(readingArticleId, now)
      }
    },
    saveStatisticsResult(id, startReadTime) {
      // 登录放云端，没登录放本地
      // 现在先放云端吧，也就我一个人用，肯定登录了的
      let url = '/blog/user/recently-read'
      this.$axios.put(url, {
        articleId: id,
        readDuration: 0,
        startReadTime: startReadTime / 1000
      }).then(response => {

      })
    }
  },
  watch: {
    '$route'(to, from) {
      this.doReadStatistics(to.path)
    }
  }
}
</script>

<style>

.slide-enter-active {
  transition: all .5s, opacity .5s;
}

.slide-enter {
  /*transform: translateY(-20px);*/
  transform: translateY(-20px);
  opacity: 0;
}


</style>
