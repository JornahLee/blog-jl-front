<template>
  <div class="article-frame-wrapper">
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
import axios from "axios";


export default {
  name: 'Detail',
  components: {
    VueMarkdown
  },
  data() {
    return {
      articleContent: "loading",
      articleTitle: "loading"
    }
  },
  mounted() {
    axios
        .get('http://localhost:8088/v2/article/get/64')
        .then(response => {
          this.articleContent = response.data.data.content;
          this.articleTitle = response.data.data.title;
          this.sendMsg();
        })

  },
  methods: {
    sendMsg() {
      bus.$emit('share', this.articleContent)
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
