<template>
  <div class="content">
    <!-- If your source-code lives in a variable called 'sourcecode' -->
    <aplayer v-if="playListReady" :list="musicList"
             :music="musicList[0]"
    />
    <div v-else>
      music player is loading ...
    </div>

    <div class="clearfix">
      <!--      <div></div>-->
      <a-input addonBefore="作者" placeholder="作者" v-model="artist"/>
      <a-input addonBefore="歌名" placeholder="歌名" v-model="title"/>
      <a-upload :file-list="fileList" :remove="handleRemove" :before-upload="beforeUpload" accept="audio/*">
        <a-button>
          <a-icon type="upload"/>
          Select File
        </a-button>
      </a-upload>
      <a-button
          type="primary"
          :disabled="fileList.length === 0"
          :loading="uploading"
          style="margin-top: 16px"
          @click="handleUpload"
      >
        {{ uploading ? 'Uploading' : 'Start Upload' }}
      </a-button>
    </div>
  </div>
</template>
<script>
import Aplayer from 'vue-aplayer'

export default {
  components: {
    Aplayer
  },
  data() {
    return {
      playListReady: false,
      musicList: [],
      fileList: [],
      uploading: false,
      filename: "",
      artist: "",
      title: "",
      fileExtend: ".mmp"
    };
  },
  mounted() {
    this.getAllMusic();
  },
  methods: {
    getAllMusic() {
      this.$axios.get('/music/list/all').then(resp => {
        this.musicList = resp.data.data
        if (this.musicList.length > 0) {
          this.playListReady = true
        }
      })
    },
    handleRemove(file) {
      const index = this.fileList.indexOf(file);
      const newFileList = this.fileList.slice();
      newFileList.splice(index, 1);
      this.fileList = newFileList;
    },
    beforeUpload(file) {
      this.fileList = [...this.fileList, file];
      let filename = this.fileList[0].name
      let split = filename.split('-')
      this.artist = split[0]
      this.title = split[1]

      let pos = filename.lastIndexOf(".");
      this.fileExtend = filename.substring(pos, filename.length)

      return false;
    },
    handleUpload() {
      const {fileList} = this;
      console.log(fileList);
      const formData = new FormData();
      let file = fileList[0]
      formData.append('file', file);
      formData.append('title', this.title)
      formData.append('artist', this.artist)
      formData.append('pic', 'none')
      formData.append('fileExtend', this.fileExtend)

      this.uploading = true;
      let url = '/music/upload';
      this.$axios.post(url, formData)
          .then(() => {
            this.fileList = [];
            this.uploading = false;
            console.log('upload successfully.');
          })
          .catch(() => {
            this.uploading = false;
            console.log('upload failed.');
          });
    },
  }
}
</script>
<style>
.content {
  background-color: wheat;
}
</style>
