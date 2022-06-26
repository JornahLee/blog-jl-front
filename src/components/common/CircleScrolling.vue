<template>
  <div class="demo-list">
    <div class="rowup">
      <div v-for="(item,index) in dataList" :key='index'>{{ item }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CircleScrolling",
  data() {
    return {
      marginTop: 0,     // 数据的margin-top
      timer: ''     // 定时器
    }
  },
  props: ['dataList'],
  created() {
    this.timer = setInterval(this.showNotice, 100)   //100表示间隔时间，数字越大滚得越快
  },
  methods: {
    // 数据循环滚动
  }
}
</script>

<style scoped>
@-webkit-keyframes rowup {
  0% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
  100% {
    -webkit-transform: translate3d(0, -78px, 0);
    transform: translate3d(0, -78px, 0);
  }
}
@keyframes rowup {
  0% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
  100% {
    -webkit-transform: translate3d(0, -78px, 0);
    transform: translate3d(0, -78px, 0);
  }
}

.demo-list{
  overflow: hidden;
}

.demo-list .rowup{
  -webkit-animation: 4s rowup linear infinite normal;
  animation: 4s rowup linear infinite normal;
  height: 50px;
}
</style>
