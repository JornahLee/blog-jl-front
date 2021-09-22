<template>
  <div class="wrapper">
    <div class="header">
      <div class="home">
        <div>Jornah Lee</div>
        <div>Love Life!</div>
      </div>
      <div class="tool-bar">搜索</div>
    </div>
    <div class="container">
      <div class="left">
        <div class="left-inner">
        </div>
        <div class="right-inner">
        </div>
      </div>
      <div class="center">
        <div class="article-title">{{ articleTitle }}</div>
        <hr/>
        <div class="article-content">
          <vue-markdown class="markdown" :source="articleContent" :toc-anchor-link-symbol="''"
                        :toc="true" :toc-first-level="1"></vue-markdown>
        </div>
        <hr/>
        <div> 上一篇 下一篇</div>
      </div>
      <div class="right-bar">
        <Category :toc="articleCategory"></Category>
      </div>

    </div>
    <div class="footer">
      <div>
        <div>© 2019 - 2020 Jornah Lee</div>
        <div>蜀ICP备20012827号-1</div>
      </div>
      <a-back-top/>
    </div>
  </div>
</template>

<script>
import Category from '@/components/Category'
import VueMarkdown from 'vue-markdown'
import axios from 'axios'
import markdownIt from 'markdown-it'
import toc from 'markdown-it-toc-and-anchor'

export default {
  name: 'MyLayout',
  components: {
    Category, VueMarkdown
  },
  data() {
    return {
      articleContent: "loading",
      articleTitle: "loading",
      articleCategory: {}
    }
  },
  mounted() {
    axios
        .get('http://localhost:8088/v2/article/get/64')
        .then(response => {
          console.log(response);
          this.articleContent = response.data.data.content;
          this.articleCategory = this.getToc(this.articleContent);
          this.articleTitle = response.data.data.title;
        })
  },
  methods: {
    getToc: function (markdownText) {
      let retToc;
      markdownIt({
        html: true,
        linkify: true,
        typographer: true,
      })
          .use(toc, {
            tocCallback: function (tocMarkdown, tocArray, tocHtml) {
              retToc = tocArray;
            }
          })
          .render(markdownText)
      return retToc;
    }
  }
}
// window.onload = function (){
//   if (window.screen.width < 400) {
//     console.log(document.getElementById("side-bar"));
//     document.getElementById("side-bar").remove();
//   }
// }
</script>

<style>
.wrapper {
  background-color: rgb(241, 242, 245);
}

.header {
  width: 100%;
  position: fixed;
  top: 0;
  height: 50px;
  /*line-height: 100px;*/
  background-color: #ffffff;
  text-align: center;
  font-size: 16px;
  clear: both;
  border-top: 1px solid #000000;
  /*border: 1px solid #e0d8d8;*/
}

.header > .home {
  width: 10%;
  height: 50px;
  font-size: 16px;
  color: white;
  background-color: rgb(43, 43, 43);
  float: left;
}

.header > .tool-bar {
  float: right;
}

.container {
  margin-top: 50px;
}

.left {
  float: left;
  width: 20%;
  height: 200px;
  /*background-color: #FF0000;*/
  margin-right: 5px;
}

.left-inner {
  float: left;
  width: 60%;
  /*height: 200px;*/

  /*background-color: #b213de;*/
}

.right-inner {
  float: left;
  width: 30%;
  /*height: 200px;*/
  /*border: solid deeppink;*/
  /*background-color: #2713de;*/
}

.center {
  float: left;
  width: 65%;
  /*height: 2000px;*/
  /*background-color: #008000;*/
  /*padding: 10px;*/
  padding: 50px;
  background-color: #ffff;
  border: 1px solid #e0d8d8;
}

.center > .article-title {
  text-align: center;
  font-size: 30px;
}

.right-bar {
  float: right;
  width: 13%;
  /*height: 200px;*/
  /*background-color: #5F9EA0;*/
  position: fixed;
  /*border: 1px solid #e0d8d8;*/
  top: 100px;
  right: 10px;

}

.footer {
  width: 100%;
  height: 50px;
  /*line-height: 50px;*/
  /*background-color: #FFFF00;*/
  text-align: center;
  font-size: 10px;
  clear: both;
  border: 1px solid #e0d8d8;
}


</style>
