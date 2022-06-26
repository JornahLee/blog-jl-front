<template>
  <div class="index-wrapper">
    <div class="stats-info">
      <scrolling-text :data-list="statsInfoStrList"></scrolling-text>
<!--      <circle-scrolling :data-list="statsInfoStrList"></circle-scrolling>-->
    </div>
    <br/>
    <a-spin tip="Loading..." v-if="loading"></a-spin>
    <div class="article" v-for="article in articleList">
      <div>
        <router-link :to="'/detail/'+article.id">
          <div class="title">{{ article.title }}</div>
        </router-link>
        <div class="meta">
          <span>创建 <a-icon type="calendar"/>: {{ article.created |dateFormat }} | </span>
          <span>更新 <a-icon type="calendar"/>: {{ article.updated |dateFormat }} | </span>
          <span>浏览: {{ article.hits }}</span>
        </div>
      </div>
      <div class="article-summary">
        <vue-markdown class="markdown" :source="article.content"
        ></vue-markdown>
      </div>
      <hr/>
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

export default {
  components: {
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
  methods: {
  }
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
  padding: 20px;
  text-align: left;
}


.title {
  font-size: 20px;
  color: black;
  font-weight: bold;
  /*text-align: left;*/
}

.article {
  margin-top: 20px;
}

.more {
  color: black;
  text-decoration: underline;
  font-size: 20px;
  text-align: right;
}

.stats-info {
  /*高度必须和字体高度一直， 不然div移除再新增，会导致屏幕闪烁*/
  height: 20px;
  font-size: 20px;
  text-align: right;
}


</style>
