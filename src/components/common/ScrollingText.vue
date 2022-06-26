<template>
  <div class="demo-list">
    <div class="rowup">
      <transition name="test-fade">
        <div :key="index">
          {{ dataList[index] }}
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "ScrollingText",
  data() {
    return {
      index: 0,
    }
  },
  props: ['dataList'],
  mounted() {
    setInterval(() => {
      if (this.index === this.dataList.length - 1) {
        this.index = 0
      } else {
        this.index += 1
      }
    }, 2000)
  }
}
</script>

<style scoped>
.test-fade-enter-active{
  transition: opacity 2s;
}

.test-fade-enter {
  opacity: 0;
}
</style>
