<template>
  <div class="article-frame-wrapper" :key="articleId">
    <div class="article-title">{{ article.title }}</div>
    <div class="meta-info">
      <span>分类: x </span>|
      <span>标签: x </span>|
      <span>创建: {{ article.created|dateFormat }} </span>|
      <span>更新: {{ article.updated|dateFormat }}</span>|
      <span>状态: {{ article.status }}</span>|
      <router-link :to="article.id|joinStrBefore('/edit/')" v-if="sharedState.isLogin">编辑</router-link>
    </div>
    <hr/>
    <div class="article-content">
      <vue-markdown class="markdown" id="searchRoot" :source="article.content" :toc-anchor-link-symbol="''"
                    :toc="true" :toc-first-level="1"></vue-markdown>
    </div>
    <hr/>
    <div>
      <div>分类:
        <span v-if="this.category!==null">
          <router-link :to="'/articleList/byCate/'+this.category.id">{{ this.category.name }}</router-link>
        </span>
        <span v-else>无</span>
      </div>
      <div>标签:
        <span v-if="this.tags!==null && tags.length>0">
          <span v-for="tag in tags">{{ tag.name }}</span>
        </span>
        <span v-else>无</span>
      </div>
    </div>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import Prism from "prismjs"; //引入插件

export default {
  name: 'ArticleFrame',
  components: {
    VueMarkdown
  },
  props: ['articleId', 'headLineStr']
  ,
  data() {
    return {
      article: {
        content: "loading",
        title: "loading"
      },
      category: null,
      tags: null,
      sharedState: this.$store.state
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    searchInPage() {
      let searchRoot = document.getElementById('searchRoot')
      for (let child of searchRoot.children) {
        if (child.innerText.search(this.headLineStr) > -1) {
          this.timer = setTimeout(() => {
            child.scrollIntoView({
              behavior: "smooth", // 默认 auto
              block: "center", // 默认 center
              inline: "nearest", // 默认 nearest
            })
          }, 500)
          return;
        }
      }
    },
    sendMsg() {
      this.$bus.$emit('share', this.article.content)
    },
    getData() {
      this.getArticleData();
      this.getArticleMetaInfo();
    },
    getArticleData() {
      let url = '/blog/article/' + this.articleId
      this.$axios.get(url)
          .then(response => {
            this.article = response.data.data
            this.sendMsg();
            this.timer = setTimeout(() => {
              this.searchInPage()
              Prism.highlightAll()
            }, 200)
          })
    },
    getArticleMetaInfo() {
      let url = `/blog/article//meta/${this.articleId}`
      this.$axios.get(url)
          .then(response => {
            console.log(response);
            const {category, tags} = response.data.data
            this.category = category
            this.tags = tags
          })
    }
  }, watch: {
    //监听路由变化
    '$route'(to, from) {
      if (to.path !== from.path) {
        this.getData();
      }
    }
  },
}
</script>

<style>
.article-frame-wrapper {
  background-color: #ffff;
  /*border: 1px solid #e0d8d8;*/
  padding: 40px;
  min-height: 70vh;
}

@media screen and (max-width: 400px) {
  .article-frame-wrapper {
    padding-left: 10px;
  }
}

.article-title {
  text-align: center;
  font-size: 30px;
}

.meta-info {
  text-align: center;
}

.article-content {

}

.hitCtx {
  background-color: yellow;
}


</style>
