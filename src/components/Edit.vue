<template>
  <div>
    <div class="edit-title">
<!--      不知道为啥 :value="article.title" 为啥读不到， 明明data里都定义了 很奇怪-->
      <a-input size="large" placeholder="这里是标题" :value="article?article.title:''" addonBefore="标题"/>
    </div>
    <br/>
    <textarea id="simpleMde"></textarea>
  </div>
</template>

<script>
import SimpleMDE from 'simplemde/dist/simplemde.min.js'
import 'simplemde/dist/simplemde.min.css'

export default {
  name: "Edit",
  data() {
    return {
      article: {
        title: ""
      },
      simplemde: {}
    }
  },
  props: ['articleId'],
  mounted() {
    this.initEditor();
    if (this.articleId !== -1) {
      this.getArticle(this.articleId)
    }
  },
  // watch与methods的定义顺序很重要， 不然会导致watch不生效
  watch: {
    'article.content': {
      // 深度监听
      handler: function (val, oldVal) { /* ... */
        this.simplemde.value(val)
      },
      deep: true
    }
  },
  methods: {
    getArticle: function (id) {
      this.$axios.get('/blog/article/' + id).then(resp => {
        const {article} = resp.data.data
        this.article = article
      })
    }
    ,
    initEditor: function () {
      this.simplemde = new SimpleMDE({element: document.getElementById("simpleMde")})
      this.simplemde.codemirror.on("paste", this.handlePaste);
    }
    ,
    // 粘贴监听图片上传
    handlePaste: function (editor, event) {
      let clipboardData = event.clipboardData || window.clipboardData
      console.log(clipboardData) // 查看clipboardData
      console.log("clipboardData") // 查看clipboardData
      const items = clipboardData.items
      const types = clipboardData.types
      let file = null

      var text = clipboardData.getData('text/plain')
      console.log("text" + text);

      // 搜索剪切板items
      for (let i = 0; i < items.length; i++) {
        console.log(items[i])
        if (items[i].type.indexOf('image') !== -1) {
          file = items[i].getAsFile()
          // break
        } else {
          // clipboardData.clearData(items[i].type)
          var str = clipboardData.getData(items[i].type)
          console.log(str)
        }
      }

      // 搜索剪切板types
      for (let i = 0; i < types.length; i++) {
        console.log(types[i])
      }

      if (!file) {
        return
      }
      this.isPasteImg = true
      // 此时file就是我们的剪切板中的图片对象
      let form = new FormData()
      form.append('file', file)
      let config = {
        headers: {"Content-Type": "multipart/form-data"}
      };
      this.$axios.post("/admin/attach/upload", form, config).then(response => {
        let imgResponseUrl = response.data.data
        let codeMirror = editor.doc.cm
        let startPoint = codeMirror.getCursor("start");
        codeMirror.replaceRange(`![](http://${imgResponseUrl})`, {
          line: startPoint.line,
          ch: startPoint.ch
        });
      });
    }
  }
}
</script>

<style>

.edit-title {
  text-align: center;
  font-size: 30px;
}

</style>
