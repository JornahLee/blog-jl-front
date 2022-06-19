<template>
  <div class="index-wrapper">
    <div class="summary">
      <pre>
      累计文章：xxx
      累计时长：xxx
      加油：
      </pre>
    </div>
    <br/>
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
      <div class="article-content">
        <vue-markdown class="markdown" :source="article.content"
        ></vue-markdown>
      </div>
      <hr/>
    </div>
    <div>文章列表</div>
  </div>
</template>
<script>
import VueMarkdown from 'vue-markdown'

export default {
  components: {
    VueMarkdown
  },
  data() {
    return {
      articleList: []
    }
  },
  mounted() {
    this.getRecommend()
  },
  methods: {
    getRecommend() {
      let url = '/blog/article/list/recommended'
      let params = {size: 10}
      this.$axios.get(url, {params})
          .then(response => {
            const {data} = response.data
            this.articleList = data
          })
    }
  }
}
</script>
<style>
.index-wrapper {
  padding: 20px;
  text-align: left;
}

.summary {
  border-radius: 10px;
  border: solid 2px;
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

h1, h2 {
  font-size: 15px;
  font-weight: normal;
}
</style>
