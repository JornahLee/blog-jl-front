<template>
  <a-anchor class="anchorContainer">
    <a-anchor-link :class="item.level|joinStr('anchor')" v-for="(item,index) in toc" :key="index"
                   :title="item.content" :href="item.anchor|joinStr('#')"/>
  </a-anchor>
</template>

<script>
import bus from '@/components/bus/eventBus.js'
import markdownIt from 'markdown-it'
import toc from 'markdown-it-toc-and-anchor'

export default {
  data() {
    return {
      toc: {}
    }
  },
  mounted() {
  },
  created() {
    bus.$on('share', val => {
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
  },
  filters: {
    joinStr(str2, str1) {
      return str1 + str2;
    }
  }
}
</script>

<style>
.anchorContainer {
  text-align: left;
  margin-left: 5px;
}

.anchor1 {
}

.anchor2 {
  text-indent: 10px;
}

.anchor3 {
  text-indent: 20px;
}

</style>
