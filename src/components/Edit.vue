<template>
  <div>
    <div class="edit-title">
      <a-input size="large" placeholder="这里是标题" v-model="article.title" addonBefore="标题"/>
    </div>
    <div class="info">
      <article-descrip :article="article" :is-in-detail="true" :is-editing="true"></article-descrip>
    </div>
    <div id="vditor"></div>
  </div>
</template>

<script>
import Vditor from 'vditor';
import 'vditor/dist/index.css';
import ArticleDescrip from "./blog/ArticleDescrip";

export default {
  name: "Edit",
  components: {ArticleDescrip},
  data() {
    return {
      article: {
        title: '',
        content: ''
      },
      contentEditor: {},
      saving: false
    }
  },
  props: ['articleId'],
  mounted() {
    this.getHeight();
    this.initEditor();
    this.getArticle(this.articleId)
  },
  methods: {
    handleChange(value) {
      console.log(`selected ${value}`);
    },
    saveTitleAndContent: function () {
      this.article.content = this.contentEditor.getValue()
      const emptyReg = /^\s*$/i
      if (emptyReg.test(this.article.title) || emptyReg.test(this.article.content)) {
        this.$message.warning("请输入标题或者内容")
        return;
      }


      const key = 'updatable';
      this.$message.loading({content: '保存中...', key});
      let params = {
        id: this.article.id,
        title: this.article.title,
        content: this.article.content
      }
      this.saving = true;
      this.$api.saveOrUpdateArticle(params).then(resp => {
        const {id} = resp.data.data
        if (this.article.id === undefined) {
          this.$router.push('/edit/' + id)
        }
        this.$message.success({content: '保存成功...', key, duration: 1});
      }).catch(err => {
        this.$message.success({content: '保存失败', key, duration: 1});
      }).finally(() => {
        this.saving = false
      })
    },
    getArticle: function (id) {
      this.$axios.get('/blog/article/' + id).then(resp => {
        let article = resp.data.data
        const defaultArticle = {
          title: '',
          content: ''
        }
        article = (article === null || Object.keys(article).length === 0) ? defaultArticle : article;
        this.article = article
        this.contentEditor.setValue(article.content)
        this.$bus.$emit('articleEditMetaInit', article)
      })
    }
    ,
    initEditor: function () {
      this.contentEditor = new Vditor('vditor', {
        height: this.getHeight(75),
        toolbarConfig: {
          pin: true,
        },
        outline: {
          enable: true
        },
        upload: {
          accept: 'image/*,.mp3, .wav, .rar',
          token: 'test',
          url: 'http://api.ilearn.space:8089/admin/attach/upload',
          linkToImgUrl: '/api/upload/fetch',
          filename(name) {
            return name.replace(/[^(a-zA-Z0-9\u4e00-\u9fa5\.)]/g, '').replace(/[\?\\/:|<>\*\[\]\(\)\$%\{\}@~]/g, '').replace('/\\s/g', '')
          },
        },
        cache: {
          enable: false,
        },
        after: () => {
          this.getArticle(this.articleId)
        },
        toolbar: [
          "strike",
          "link",
          "|",
          "list",
          "ordered-list",
          "check",
          "outdent",
          "indent",
          "|",
          "insert-before",
          "insert-after",
          "|",
          "upload",
          "table",
          "|",
          "undo",
          "redo",
          "|",
          "fullscreen",
          "edit-mode",
          {
            name: "more",
            toolbar: [
              "both",
              "code-theme",
              "content-theme",
              "export",
              "outline",
              "preview",
              "devtools",
              "info",
              "help",
            ],
          },
          {
            hotkey: '⇧⌘S',
            name: 'save',
            tipPosition: 's',
            tip: '保存',
            className: 'right',
            icon: '<svg t="1659849637866" class="icon" viewBox="0 0 1073 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4376" width="200" height="200"><path d="M190.526479 1023.999744h691.891719a190.782735 190.782735 0 0 0 191.038991-190.526479V190.526479A190.782735 190.782735 0 0 0 882.802582 0h-691.891719A190.782735 190.782735 0 0 0 0 190.526479v642.946786a190.782735 190.782735 0 0 0 190.526479 190.526479z m0-939.563329h25.625619v259.203139a145.809773 145.809773 0 0 0 146.06603 145.681645h350.942855A145.809773 145.809773 0 0 0 858.458244 343.639554V84.436415h24.344338a106.218192 106.218192 0 0 1 106.218192 106.090064v642.946786a106.34632 106.34632 0 0 1-106.218192 106.090063h-691.891719a106.218192 106.218192 0 0 1-106.090063-106.090063V190.526479a106.090064 106.090064 0 0 1 105.705679-106.090064z m110.446419 6.406405h474.073955v252.796734a61.373358 61.373358 0 0 1-61.24523 61.24523H362.218128a61.24523 61.24523 0 0 1-61.24523-61.24523z" fill="#4D4D4D" p-id="4377"></path><path d="M693.81364 397.197098a42.154144 42.154144 0 0 0 42.282272-42.154144v-153.753715a42.282272 42.282272 0 0 0-84.436415 0v153.753715A42.154144 42.154144 0 0 0 693.81364 397.197098z" fill="#4D4D4D" p-id="4378"></path></svg>',
            click: () => {
              this.saveTitleAndContent()
            },
          }],
      })
    }
    ,
    // 粘贴监听图片上传
    handlePaste: function (editor, event) {
      let clipboardData = event.clipboardData || window.clipboardData
      const items = clipboardData.items
      const types = clipboardData.types
      let file = null

      // 搜索剪切板items
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          file = items[i].getAsFile()
        }
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
    },
    deleteArticle() {
      this.$api.deleteArticle(this.articleId).then(resp => {
        this.$message.success("删除成功")
      })
    },
    getHeight(percent) {
      const ret = document.documentElement.clientHeight * (percent / 100)
      console.log(ret)
      return ret
    }
  }, watch: {
    //监听路由变化
    '$route'(to, from) {
      if (to.path !== from.path) {
        this.getArticle(this.articleId)
      }
    }
  }
}
</script>

<style>

.edit-title {
  text-align: center;
  font-size: 30px;
}

/*.info {*/
/*  height: 32px;*/
/*  margin-top: 5px;*/
/*  margin-bottom: -5px;*/
/*}*/


.form-element {
  float: right;
}

#saveButton {
  color: dodgerblue;
}

#vditor {
  height: 60%
}
</style>
