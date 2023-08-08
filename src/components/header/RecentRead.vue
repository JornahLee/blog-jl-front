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
      <li v-for="item in recentRead" class="read-item">
        <router-link :to="'/detail/'+item.articleId">{{ item.title }}</router-link>
        <span class="msg">{{ recentReadMsg(item.readDuration, item.startReadTime) }}</span>
<!--        <hr/>-->
      </li>
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
      this.$api.getRecentRead().then(resp => {
        this.recentRead = resp.data.data
        console.log(this.recentRead);
      })
    },
    recentReadMsg: function (readDuration, startReadTime) {
      let mileSeconds = new Date() - Date.parse(startReadTime)
      return `${timeUtil.formatSeconds(Math.ceil(mileSeconds / 1000))}前`
    }
  }
}
</script>

<style>
.msg {
  font-size: 10px;
}


</style>
