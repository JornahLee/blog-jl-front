<template>
  <div>
    <div class="edit-title">
      <a-input size="large" placeholder="这里是标题" v-model="article.title" addonBefore="标题"/>
    </div>
    <div class="info">
      <article-descrip :article="article" :is-in-detail="true" :is-editing="true"
                       v-if="articleLoaded "></article-descrip>
    </div>
    <div id="vditor"></div>
  </div>
</template>

<script>
// import Vditor from 'vditor';
// import 'vditor/dist/index.css';
import ArticleDescrip from "../blog/ArticleDescrip";
import MD5 from 'js-md5';
import timeUtil from '../../utils/timeUtil'

export default {
  name: "Edit",
  components: {ArticleDescrip},
  data() {
    return {
      article: {
        title: '',
        content: '',
      },
      previousContent: '',
      articleLoaded: false,
      contentEditor: {},
      editorLoaded: true,
      saving: false,
      autoSaveEnable: true,
      workingInterval: null,
    }
  },
  props: ['articleId'],
  mounted() {
    this.getHeight();
    this.initEditor();
    if (this.editorLoaded) {
      this.getArticle(this.articleId)
    }
    this.autoSaveIntervalSetup(this.autoSaveEnable)
  },
  methods: {
    saveTitleAndContent: function (isAutoSave) {
      this.article.content = this.contentEditor.getValue()
      const emptyReg = /^\s*$/i
      if (emptyReg.test(this.article.title) || emptyReg.test(this.article.content)) {
        this.$message.warning("请输入标题或者内容")
        return;
      }
      this.previousContent = this.article.content
      const key = 'updatable';
      this.$message.loading({content: '保存中...', key});
      let params = {
        id: this.article.id,
        title: this.article.title,
        content: this.article.content,
        type: 'ESSAY',
        version: ++this.article.version || 0
      }
      this.saving = true;
      this.$api.saveOrUpdateArticle(params).then(resp => {
        const {id} = resp.data.data
        if (this.article.id === undefined) {
          this.$router.push('/edit/' + id)
        }
        this.$message.success({
          content: isAutoSave ? '自动保存成功...' : '保存成功...',
          key,
          duration: isAutoSave ? 0.5 : 1,
        });
      }).catch(err => {
        this.$message.error({content: isAutoSave ? '自动保存失败' : '保存失败', key, duration: 1});
      }).finally(() => {
        this.saving = false
      })
    },
    getArticle: function (id) {
      if (id < 0) {
        return;
      }
      this.$api.getArticleById(id, this.$store.state.passphrase).then(resp => {
        let article = resp.data.data
        const defaultArticle = {
          title: '',
          content: '',
          version: 0
        }
        article = (article === null || Object.keys(article).length === 0) ? defaultArticle : article;
        this.previousContent = article.content
        this.article = article
        this.contentEditor.setValue(article.content)
        this.$bus.$emit('articleEditMetaInit', article)
        document.title = '(Blog) ' + article.title
        this.articleLoaded = true
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
          this.editorLoaded = true
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
          },
          {
            name: 'autoSave',
            tip: '自动保存',
            className: 'auto-save',
            icon: '<svg t="1660719130535" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6547" width="200" height="200"><path d="M510.407736 960.414823c-60.290131 0-118.797663-11.81714-173.898609-35.122939-53.199643-22.50148-100.970646-54.706973-141.983735-95.720062s-73.218582-88.784092-95.720062-141.983735c-23.305799-55.101969-35.122939-113.608477-35.122939-173.898609 0-60.290131 11.81714-118.797663 35.122939-173.898609 22.50148-53.200666 54.706973-100.970646 95.720062-141.983735 41.013089-41.014112 88.784092-73.218582 141.983735-95.721085 55.101969-23.305799 113.608477-35.122939 173.898609-35.122939s118.797663 11.81714 173.898609 35.122939c53.199643 22.502503 100.970646 54.706973 141.983735 95.721085 41.013089 41.013089 73.218582 88.784092 95.720062 141.983735 23.305799 55.100946 35.122939 113.608477 35.122939 173.898609 0 60.290131-11.81714 118.797663-35.122939 173.898609-22.50148 53.199643-54.706973 100.970646-95.720062 141.983735s-88.784092 73.218582-141.983735 95.720062C629.205399 948.597683 570.697867 960.414823 510.407736 960.414823zM510.407736 130.408095c-102.377692 0-198.627826 39.868009-271.0206 112.260783-72.392774 72.392774-112.260783 168.642908-112.260783 271.0206s39.868009 198.627826 112.260783 271.0206c72.39175 72.392774 168.642908 112.260783 271.0206 112.260783 102.377692 0 198.62885-39.868009 271.0206-112.260783s112.260783-168.642908 112.260783-271.0206-39.868009-198.627826-112.260783-271.0206S612.786451 130.408095 510.407736 130.408095z" p-id="6548"></path><path d="M704.347796 512.541329 512.731664 512.541329 512.731664 292.051589 411.414117 292.051589 411.414117 613.858876 704.347796 613.858876Z" p-id="6549"></path></svg>',
            click: (event, vditor) => {
              this.autoSaveEnable = !this.autoSaveEnable
              let className = vditor.toolbar.elements.autoSave.className;
              if (!this.autoSaveEnable) {
                className = className.replace("auto-save", "auto-save-disable")
              } else {
                className = className.replace("auto-save-disable", "auto-save")
              }
              vditor.toolbar.elements.autoSave.className = className
            },
          },
          {
            name: 'dateAndWeather',
            tip: '时间日期',
            icon: '<svg t="1663124487750" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3231" width="200" height="200"><path d="M960 128H833c0-53-43-96-96-96h-16c-53 0-96 43-96 96H400c0-26.5-10.7-50.5-28.1-67.9C354.5 42.7 330.5 32 304 32h-16c-53 0-96 43-96 96H64c-35.3 0-64 28.6-64 64v736c0 35.3 28.7 64 64 64h896c35.3 0 64-28.7 64-64V192c0-35.4-28.7-64-64-64z m-271 8c0-22.1 17.9-40 40-40s40 17.9 40 40v80c0 22.1-17.9 40-40 40-11 0-21-4.5-28.3-11.7C693.5 237 689 227 689 216v-80z m-433 0c0-22.1 17.9-40 40-40s40 17.9 40 40v80c0 22.1-17.9 40-40 40-11 0-21-4.5-28.3-11.7C260.5 237 256 227 256 216v-80z m704 760c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V448h896v448z" p-id="3232"></path><path d="M96 512h256v160H96zM96 704h256v160H96zM384 512h256v160H384zM384 704h256v160H384zM672 512h256v160H672zM672 704h256v160H672z" p-id="3233"></path></svg>',
            click: (event, vditor) => {
              let dateTimeFormat = timeUtil.dateTimeFormat(new Date(),'YYYY年mm月dd HH点MM分');
              this.contentEditor.insertValue(`\r\n ${dateTimeFormat} \r\n`)
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
      return document.documentElement.clientHeight * (percent / 100)
    },
    autoSaveIntervalSetup(enable) {
      if (enable) {
        this.workingInterval = setInterval(() => {
          console.log('trying auto save')
          if (MD5(this.contentEditor.getValue() || '') !== MD5(this.previousContent || '')) {
            console.log('do auto save')
            this.saveTitleAndContent(true)
          }
        }, 1000 * 30)
      } else {
        clearInterval(this.workingInterval)
      }
    }
  }, watch: {
    //监听路由变化
    '$route'(to, from) {
      if (to.path !== from.path) {
        this.getArticle(this.articleId)
      }
    },
    'autoSaveEnable'(to, from) {
      this.autoSaveIntervalSetup(to);
    }
  },
  destroyed() {
    console.log('destroyed to stop interval')
    this.autoSaveIntervalSetup(false);
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

.auto-save-disable {
  background-color: gray;
  /*border-radius: 500px;*/
  /*stroke: red;*/
}

.auto-save {
  /*background-color: #52c41a;*/
  /*border-radius: 100%;*/
  /*fill:red;*/
  /*stroke: red;*/
}

</style>
