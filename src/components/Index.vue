<template>
  <div class="index-wrapper">
    <div class="inner-header1">
      <a-tag color="green">
        <router-link :to="'/articleList/all'">所有文章</router-link>
      </a-tag>
    </div>
    <div class="stats-info inner-header2">
      <!--      <scrolling-text :data-list="statsInfoStrList"></scrolling-text>-->
      <!--      <circle-scrolling :data-list="statsInfoStrList"></circle-scrolling>-->
      <scrolling :data-list="statsInfoStrList"></scrolling>
    </div>
    <br/>
    <a-spin tip="Loading..." v-if="loading"></a-spin>
    <div class="article" v-for="article in articleList">
      <div>
        <router-link :to="'/detail/'+article.id">
          <div class="title">{{ article.title }}</div>
        </router-link>
        <div class="meta">
          <article-descrip :article="article" :is-index="true"></article-descrip>
        </div>
      </div>
      <div class="article-summary">
        <vue-markdown class="markdown" :source="article.content"
        ></vue-markdown>
      </div>
     <a-divider/>
    </div>
    <router-link :to="'/articleList/all'">
      <div class="more">
        查看更多
      </div>
    </router-link>
  </div>
</template>
<script>
import VueMarkdown from 'vue-markdown'
import ScrollingText from "./common/ScrollingText";
import CircleScrolling from "./common/CircleScrolling";
import Scrolling from "./common/Scrolling";
import ArticleDescrip from "./blog/ArticleDescrip";

export default {
  components: {
    ArticleDescrip,
    Scrolling,
    CircleScrolling,
    ScrollingText,
    VueMarkdown
  },
  data() {
    return {
      articleList: [],
      loading: true,
      statsInfoStrList: [],
    }
  },
  mounted() {
    this.$api.getIndexStatsInfo()
        .then(response => {
          const {data} = response.data
          this.statsInfoStrList = data;
        })
    this.$api.getRecommendList(10)
        .then(response => {
          const {data} = response.data
          this.articleList = data
          this.loading = false
        })
  },
  methods: {}
}
</script>

<style>
/*因为h1等标签 是VueMarkdown组件生成的， 使用style scoped无法对其生效，因此要使用全局的style */
.article-summary > .markdown > h1, .article-summary > .markdown > h2 {
  font-size: 15px;
  font-weight: normal;
}
</style>

<style scoped>

.index-wrapper {
  padding: 15px;
  text-align: left;
}
.inner-header1{
  float: left;
}
.inner-header2{
  float: right;
}

.title {
  font-size: 20px;
  color: black;
  font-weight: bold;
  text-align: center;
}

.article {
  margin-top: 20px;
}
.article-summary{
  margin-top: 10px;
}

.more {
  color: black;
  text-decoration: underline;
  font-size: 20px;
  text-align: right;
}

.stats-info {
  /*高度必须和字体高度一直， 不然div移除再新增，会导致屏幕闪烁*/
  /*height: 20px;*/
  font-size: 15px;
  text-align: right;
}


</style>
