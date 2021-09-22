<template>
  <div class="wrapper">
    <main-frame>
      <template v-slot:left>
        <div class="left-inner">
        </div>
        <div class="right-inner">
          <router-link to="/test">test</router-link>
          <router-link to="/detail">detail</router-link>
        </div>
      </template>

      <template v-slot:center>
        <router-view name="articleFrame"></router-view>
        <router-view name="c1"></router-view>
      </template>

      <template v-slot:right-bar>
        <router-view name="category"></router-view>
        <router-view name="c2"></router-view>
      </template>
    </main-frame>
  </div>
</template>

<script>
import Category from '@/components/Category'
import ArticleFrame from '@/components/blog/ArticleFrame'
import MainFrame from '@/components/MainFrame'

// 通过兄弟组件之间刷新数据，
// 但是我觉得这样不好，这样子打破封装了，不符合最少知识原则
export default {
  name: 'Detail',
  components: {
    MainFrame,
    Category, ArticleFrame
  }
}
</script>

<style>

.left-inner {
  float: left;
  width: 60%;
}

.right-inner {
  float: left;
  width: 30%;
  /*height: 200px;*/
  /*border: solid deeppink;*/
  /*background-color: #2713de;*/
}


</style>
