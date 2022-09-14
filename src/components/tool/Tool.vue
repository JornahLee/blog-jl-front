<template>
  <div>
    <a-radio-group v-model="toolType" size="default" @change="handleChange">
      <a-radio-button value="clipboard">
        clipboard
      </a-radio-button>
      <a-radio-button value="todo">
        Todo
      </a-radio-button>
      <a-radio-button value="notes">
        Notes
      </a-radio-button>
    </a-radio-group>
    <br/>
    <a-input v-model="passphrase" style="width: 100px" type="password" @pressEnter="getArticleById(article.id)"/>
    <a-button @click="getArticleById(article.id)">reload</a-button>
    <br/>
    <div id="myVditor"></div>
  </div>
</template>
<script>
import Vditor from 'vditor';
import 'vditor/dist/index.css';

export default {
  name: "Tool",
  data() {
    return {
      userState: this.$store.state,
      contentEditor: {},
      badPassphrase: false,
      toolType: 'clipboard',
      article: {id: 1},
      passphrase: this.$store.state.passphrase | 1234
    };
  },
  mounted() {
    if (!this.userState.isLogin) {
      this.$message
      this.$router.push(`/login`)
    }
    this.initEditor();
  },
  methods: {
    handleChange() {
      switch (this.toolType) {
        case "clipboard":
          this.article.id = 1;
          break;
        case "todo":
          this.article.id = 2;
          break;
        case "notes":
          this.article.id = 3;
          break;
        default :
          this.article.id = 1;
      }
      // console.log(this.article);
      this.getArticleById(this.article.id)
    },
    getArticleById(id) {
      this.$api.getArticleById(id, this.$store.state.passphrase).then(resp => {
        let article = resp.data.data
        this.article = article
        this.contentEditor.setValue(article.content)
        document.title = '(Blog) ' + article.title
        this.badPassphrase = resp.status === 206
      })
    },
    saveTitleAndContent: function () {
      if (this.badPassphrase) {
        this.$message.error({content: '错误的passphrase，无法保存'})
        return;
      }
      this.article.content = this.contentEditor.getValue()
      this.article.version++
      let params = this.article
      params.passphrase = this.passphrase
      this.$api.saveOrUpdateArticle(params).then(resp => {
        const {id} = resp.data.data
        if (this.article.id === undefined) {
          this.$router.push('/edit/' + id)
        }
        this.$message.success({
          content: '保存成功...', key: 'key', duration: 1,
        });
      })
    },
    initEditor: function () {
      this.contentEditor = new Vditor('myVditor', {
        height: document.documentElement.clientHeight * (75 / 100),
        toolbarConfig: {
          pin: true,
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
          this.getArticleById(this.article.id)
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
  },
  watch: {
    passphrase(newVal, oldVal) {
      this.$store.updatePassphrase(newVal)
    },
    badPassphrase(newVal, oldVal) {
      if (newVal) {
        // console.log(this.contentEditor);
        this.contentEditor.disabled()
      } else {
        this.contentEditor.enable()
      }

    }
  },
  destroyed() {
    this.passphrase = null
    this.$store.updatePassphrase(null)
  }
};
</script>
