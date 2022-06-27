<template>
  <div class="box">
    <div class="box-right">
      <ul :class="{top:istop}">
        <li v-for="data in dataList">
          <span> {{ data }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Scrolling',
  props: ['dataList'],
  data() {
    return {
      istop: false
    }
  },
  methods: {
    showBox() {
      // 该方法开始运行时，让该类名可以使用
      this.istop = true;
      setTimeout(() => {
        this.dataList.push(this.dataList[0])
        this.dataList.shift()
        // 运行到内部延时器时，让该类名不能使用
        this.istop = false
      }, 5000)
    }
  },
  created() {
    setInterval(this.showBox, 2000)
  }

}
</script>

<style scoped>

li {
  list-style: none;
}

.box-right {
  height: 30px;
  overflow: hidden;
}

li {
  line-height: 30px;
}

.top {
  transition: all 0.8s;
  margin-top: -30px;
}

</style>
