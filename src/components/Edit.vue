<template>
  <div>
    <div class="edit-title">
      <a-input size="large" placeholder="这里是标题" v-model="article.title" addonBefore="标题"/>
    </div>
    <div class="info">
      <div class="display-info">
        <span class="display-info-item">创建: {{ article.created|defaultValue(new Date())|dateFormat }} </span>
        <span class="display-info-item">更新: {{ article.updated|defaultValue(new Date())|dateFormat }}</span>
        <router-link :to="'/detail/'+article.id" v-if="article.id">详情页</router-link>
        <a @click="saveTitleAndContent"> <span class="saveContent">保存</span></a>
        <a @click="deleteArticle" v-if="article.id"> <span class="saveContent">删除</span></a>

      </div>
    </div>
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
        title: '',
        content: ''
      },
      simplemde: {},
      saving: false
    }
  },
  props: ['articleId'],
  mounted() {
    this.initEditor();
    this.getArticle(this.articleId)
  },
  methods: {
    handleChange(value) {
      console.log(`selected ${value}`);
    },
    saveTitleAndContent: function () {
      this.article.content = this.simplemde.value()
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
        this.simplemde.value(article.content)
        this.$bus.$emit('articleEditMetaInit', article)
      })
    }
    ,
    initEditor: function () {
      this.simplemde = new SimpleMDE({
        element: document.getElementById("simpleMde"),
        spellChecker: false,
        forceSync: true, //  用v-model 监听不到，不知道为啥
        // 自定义 toolbar side by side有bug
      })
      const codemirror = this.simplemde.codemirror;
      // simplemde shortcut not support custom toolbar
      // so bind custom toolbar with shortcut
      const keys = codemirror.getOption("extraKeys");
      const ua = navigator.userAgent.toLowerCase();
      console.log(ua.search("mac"));
      if (ua.search("mac") !== -1) {
        console.log('mac os Shift-Cmd-S')
        keys["Shift-Cmd-S"] = () => {
          this.saveTitleAndContent()
        };
      } else {
        console.log('windows os Shift-Ctrl-S')
        keys["Shift-Ctrl-S"] = () => {
          this.saveTitleAndContent()
        };
      }

      codemirror.setOption("extraKeys", keys);

      codemirror.on("paste", this.handlePaste);
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
  /*background-color: #52c41a;*/
  /*border-bottom: solid black 1px;*/
}

.display-info {
  float: left;
  margin-top: 10px;
}

.display-info-item {
  margin-right: 5px;
}

.saveContent {
  border-radius: 5px;
  background-color: #edf8e8;
  padding: 1px;
}

.form-element {
  float: right;
}

#saveButton {
  color: dodgerblue;
}
</style>
