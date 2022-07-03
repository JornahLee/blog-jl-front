<template>
  <div>
    <a-icon type="carry-out" style="color: black" @click="e=>this.showDrawer = true"/>
    <a-drawer
        title="Todo"
        placement="right"
        :closable="false"
        :visible="showDrawer"
        :after-visible-change="afterVisibleChange"
        @close="onClose"
    >
      <ArticleList type="byCate" value="40"/>
    </a-drawer>
  </div>

</template>

<script>
import ArticleList from "../ArticleList";

export default {
  components: {ArticleList},
  data() {
    return {
      showDrawer: false,
    }
  }, methods: {
    afterVisibleChange(val) {
      console.log('showDrawer', val);
    },
    onClose() {
      this.showDrawer = false;
    },
  }
}
</script>

<style>

</style>
