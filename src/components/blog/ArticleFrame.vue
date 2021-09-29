<template>
  <div class="article-frame-wrapper" :key="articleId">
    <div class="article-title">{{ article.title }}</div>
    <div class="meta-info">
      <span>分类: x </span>|
      <span>标签: x </span>|
      <span>创建: {{ article.created|dateFormat }} </span>|
      <span>更新: {{ article.updated|dateFormat }}</span>|
      <span>状态: {{ article.status }}</span>|
      <router-link :to="article.id|joinStrBefore('/edit/')">编辑</router-link>
    </div>
    <hr/>
    <div class="article-content">
      <vue-markdown class="markdown" :source="article.content" :toc-anchor-link-symbol="''"
                    :toc="true" :toc-first-level="1"></vue-markdown>
    </div>
    <hr/>
    <div> 上一篇 下一篇</div>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import bus from '@/components/bus/eventBus.js'

export default {
  name: 'ArticleFrame',
  components: {
    VueMarkdown
  },
  props: ['articleId']
  ,
  data() {
    return {
      article: {
        content: "loading",
        title: "loading",
      }
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    sendMsg() {
      bus.$emit('share', this.article.content)
    },
    getData() {
      let url = '/blog/article/' + this.articleId
      console.log(url);
      this.$axios.get(url)
          .then(response => {
            const {article, tags, categories} = response.data.data
            this.article = article
            this.sendMsg();
          })
    }
  }
}
</script>

<style>
.article-frame-wrapper {
  background-color: #ffff;
  border: 1px solid #e0d8d8;
  padding-left: 50px;
  padding-top: 10px;
  min-height: 70vh;
}

.article-title {
  text-align: center;
  font-size: 30px;
}

.meta-info{
  text-align: center;
}

.article-content {

}


</style>
