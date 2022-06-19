<template>
  <div>
    <a-icon type="history" style="color: black" @click="getRecentRead"/>
    <a-drawer
        title="最近阅读"
        placement="right"
        :closable="false"
        :visible="showRecentRead"
        :after-visible-change="afterVisibleChange"
        @close="onClose"
    >
      <div v-for="item in recentRead" class="read-item">
        <router-link :to="'/detail/'+item.articleId">- {{ item.title }}</router-link>
        <div class="msg">{{ recentReadMsg(item.readDuration, item.startReadTime) }}</div>
      </div>
    </a-drawer>
  </div>
</template>

<script>
import timeUtil from '../../utils/timeUtil'

export default {
  components: {},
  data() {
    return {
      showRecentRead: false,
      recentRead: [],
    }
  }, methods: {
    afterVisibleChange(val) {
      console.log('showRecentRead', val);
    },
    onClose() {
      this.showRecentRead = false;
    },
    getRecentRead() {
      this.showRecentRead = true
      let url = '/blog/user/recently-read'
      this.$axios.get(url).then(resp => {
        this.recentRead = resp.data.data
        console.log(this.recentRead);
      })
    },
    recentReadMsg: function (readDuration, startReadTime) {
      let mileSeconds = new Date() - Date.parse(startReadTime)
      const readDurationStr = timeUtil.formatSeconds(readDuration)
      return `${timeUtil.formatSeconds(mileSeconds / 1000)}前，阅读${readDurationStr}`
    }
  }
}
</script>

<style>
.recent-read {
  /*绝对定位 不占位置*/
  position: absolute;
  right: 5px;
  z-index: 10;
  background-color: white;
  text-align: left;
  font-size: 12px;
  height: 20vh;
  width: 25vw;
  overflow: auto;
  border-radius: 10px;
  border: solid lightblue 2px;
  padding-top: 2px;
  padding-bottom: 2px;
}
.read-item{
  border-bottom: solid gray 1px;
}
.msg {
  font-size: 10px;
}

@media screen and (max-width: 400px) {
  .recent-read {
    width: 35vw;
  }
}

</style>
