<template>
  <div>
    <div class="edit-title">
      <a-input size="large" placeholder="这里是标题" v-model="article.title" addonBefore="标题"/>
    </div>
    <div class="info">
      <div class="display-info">
        <a-tag class="display-info-item">创建
          <a-icon type="calendar"/>
          : {{ article.created|defaultValue(new Date())|dateTimeFormat }}
        </a-tag>
        <a-tag class="display-info-item">更新
          <a-icon type="calendar"/>
          : {{ article.updated|defaultValue(new Date())|dateTimeFormat }}
        </a-tag>
        <router-link :to="'/detail/'+article.id" v-if="article.id">
          <a-tag color="green">详情页</a-tag>
        </router-link>
        <a-tag @click="saveTitleAndContent" color="green"><span>保存</span></a-tag>
        <a-tag @click="deleteArticle" v-if="article.id" color="green"><span>删除</span></a-tag>
      </div>
    </div>
    <div id="vditor"></div>
  </div>
</template>

<script>
import Vditor from 'vditor';
import 'vditor/dist/index.css';

export default {
  name: "Edit",
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
      console.log(this.article.title);
      console.log(emptyReg.test(this.article.title));
      console.log(this.article.content);
      console.log(emptyReg.test(this.article.content));
      if (emptyReg.test(this.article.title) || emptyReg.test(this.article.content)) {
        this.$message.warning("请输入标题或者内容")
        return;
      }

      let url = '/blog/article/saveOrUpdate'
      const key = 'updatable';
      this.$message.loading({content: '保存中...', key});
      let params = {
        id: this.article.id,
        title: this.article.title,
        content: this.article.content
      }
      this.saving = true;
      this.$axios.post(url, params).then(resp => {
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
          "headings",
          "italic",
          "strike",
          "link",
          "|",
          "list",
          "ordered-list",
          "check",
          "outdent",
          "indent",
          "|",
          "quote",
          "line",
          "code",
          "inline-code",
          "insert-before",
          "insert-after",
          "|",
          "upload",
          "record",
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
            icon: '<svg t="1589994565028" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2808" width="32" height="32"><path d="M506.6 423.6m-29.8 0a29.8 29.8 0 1 0 59.6 0 29.8 29.8 0 1 0-59.6 0Z" fill="#0F0F0F" p-id="2809"></path><path d="M717.8 114.5c-83.5 0-158.4 65.4-211.2 122-52.7-56.6-127.7-122-211.2-122-159.5 0-273.9 129.3-273.9 288.9C21.5 562.9 429.3 913 506.6 913s485.1-350.1 485.1-509.7c0.1-159.5-114.4-288.8-273.9-288.8z" fill="#FAFCFB" p-id="2810"></path><path d="M506.6 926c-22 0-61-20.1-116-59.6-51.5-37-109.9-86.4-164.6-139-65.4-63-217.5-220.6-217.5-324 0-81.4 28.6-157.1 80.6-213.1 53.2-57.2 126.4-88.8 206.3-88.8 40 0 81.8 14.1 124.2 41.9 28.1 18.4 56.6 42.8 86.9 74.2 30.3-31.5 58.9-55.8 86.9-74.2 42.5-27.8 84.3-41.9 124.2-41.9 79.9 0 153.2 31.5 206.3 88.8 52 56 80.6 131.7 80.6 213.1 0 103.4-152.1 261-217.5 324-54.6 52.6-113.1 102-164.6 139-54.8 39.5-93.8 59.6-115.8 59.6zM295.4 127.5c-72.6 0-139.1 28.6-187.3 80.4-47.5 51.2-73.7 120.6-73.7 195.4 0 64.8 78.3 178.9 209.6 305.3 53.8 51.8 111.2 100.3 161.7 136.6 56.1 40.4 88.9 54.8 100.9 54.8s44.7-14.4 100.9-54.8c50.5-36.3 108-84.9 161.7-136.6 131.2-126.4 209.6-240.5 209.6-305.3 0-74.9-26.2-144.2-73.7-195.4-48.2-51.9-114.7-80.4-187.3-80.4-61.8 0-127.8 38.5-201.7 117.9-2.5 2.6-5.9 4.1-9.5 4.1s-7.1-1.5-9.5-4.1C423.2 166 357.2 127.5 295.4 127.5z" fill="#141414" p-id="2811"></path><path d="M353.9 415.6m-33.8 0a33.8 33.8 0 1 0 67.6 0 33.8 33.8 0 1 0-67.6 0Z" fill="#0F0F0F" p-id="2812"></path><path d="M659.3 415.6m-33.8 0a33.8 33.8 0 1 0 67.6 0 33.8 33.8 0 1 0-67.6 0Z" fill="#0F0F0F" p-id="2813"></path><path d="M411.6 538.5c0 52.3 42.8 95 95 95 52.3 0 95-42.8 95-95v-31.7h-190v31.7z" fill="#5B5143" p-id="2814"></path><path d="M506.6 646.5c-59.6 0-108-48.5-108-108v-31.7c0-7.2 5.8-13 13-13h190.1c7.2 0 13 5.8 13 13v31.7c0 59.5-48.5 108-108.1 108z m-82-126.7v18.7c0 45.2 36.8 82 82 82s82-36.8 82-82v-18.7h-164z" fill="#141414" p-id="2815"></path><path d="M450.4 578.9a54.7 27.5 0 1 0 109.4 0 54.7 27.5 0 1 0-109.4 0Z" fill="#EA64F9" p-id="2816"></path><path d="M256 502.7a32.1 27.5 0 1 0 64.2 0 32.1 27.5 0 1 0-64.2 0Z" fill="#EFAFF9" p-id="2817"></path><path d="M703.3 502.7a32.1 27.5 0 1 0 64.2 0 32.1 27.5 0 1 0-64.2 0Z" fill="#EFAFF9" p-id="2818"></path></svg>',
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
      const url = '/blog/article/' + this.articleId
      this.$axios.delete(url).then(resp => {
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

.info {
  height: 32px;
  margin-bottom: 5px;
}

.display-info {
  float: left;
  margin-top: 10px;
}

.display-info-item {
  margin-right: 5px;
}


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
