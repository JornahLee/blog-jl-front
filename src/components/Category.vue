<template>
  <div v-if="toc.length >0 " class="cate">
    <div class="cate-title">目录</div>
    <hr/>
    <a-anchor wrapperClass="anchorContainer">
      <a-anchor-link :class="item.level|joinStrBefore('anchor')" v-for="(item,index) in toc" :key="index"
                     :title="item.content" :href="item.anchor|joinStrBefore('#')"/>
    </a-anchor>
  </div>
</template>

<script>

import markdownIt from 'markdown-it'
import toc from 'markdown-it-toc-and-anchor'

export default {
  data() {
    return {
      toc: []
    }
  },
  mounted() {
  },
  created() {
    this.$bus.$on('share', val => {
      this.toc = this.getToc(val);
    })
  }
  ,
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
</script>

<style>

.anchor1 {
}

.anchor2 {
  text-indent: 10px;
}

.anchor3 {
  text-indent: 20px;
}
.cate{
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  padding: 10px;
  border-radius: 10px;
}

.cate-title {
  text-align: left;
  margin-left: 10px;
  font-size: 20px;
}

.anchorContainer{
  max-height: 74vh;
  min-height: 60vh;
}

</style>
