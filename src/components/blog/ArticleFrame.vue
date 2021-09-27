<template>
  <div class="article-frame-wrapper" :key="articleId">
    <div class="article-title">{{ articleTitle }}</div>
    <hr/>
    <div class="article-content">
      <vue-markdown class="markdown" :source="articleContent" :toc-anchor-link-symbol="''"
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
      articleContent: "loading",
      articleTitle: "loading"
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    sendMsg() {
      bus.$emit('share', this.articleContent)
    },
    getData() {
      let url = '/blog/article/' + this.articleId
      console.log(url);
      this.$axios .get(url)
          .then(response => {
            const {article, tags, categories,} = response.data.data
            this.articleContent = this.$defaultEmpty(article.content)
            this.articleTitle = this.$defaultEmpty(article.title)
            this.sendMsg();
          })
    }
  }
}
</script>

<style>
.article-frame-wrapper {
  background-color: white;
}

.article-title {
  text-align: center;
  font-size: 30px;
}

.article-content {

}


</style>
