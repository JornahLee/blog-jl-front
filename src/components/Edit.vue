<template>
  <textarea id="simpleMde"></textarea>
</template>

<script>
import SimpleMDE from 'simplemde/dist/simplemde.min.js'
import 'simplemde/dist/simplemde.min.css'

export default {
  name: "Edit",
  mounted() {
    this.editor();
  }
  ,
  methods: {
    imvue: function () {
      console.log("imvue");
    }
    ,
    editor: function () {
      var simplemde = new SimpleMDE({element: document.getElementById("simpleMde")});
      simplemde.codemirror.on("paste", this.handlePaste);
    },
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
        let imgResponseUrl=response.data.data
        let codeMirror=editor.doc.cm
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
