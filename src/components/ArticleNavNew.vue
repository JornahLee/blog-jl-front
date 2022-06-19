<template>
  <div class="left-bar">
    <div :style="{ marginTop: '16px' }">
      <a-radio-group default-value="all" size="small" @change="changeArticleList">
        <a-radio-button value="all">
          所有
        </a-radio-button>
        <a-radio-button value="byCate">
          分类
        </a-radio-button>
        <a-radio-button value="byTag">
          标签
        </a-radio-button>
      </a-radio-group>
    </div>
    <hr/>
    <a-radio-group class="item-radio-group" @change="changeList">
      <div v-show="selected==='byTag'">
        <a-radio-button :value="tag.id" v-for="tag in tags" :key="tag.id">
          {{ tag.name }}
        </a-radio-button>
      </div>
      <div v-show="selected==='byCate'">
        <a-radio-button :value="cate.id" v-for="cate in categories" :key="cate.id">
          {{ cate.name }}
        </a-radio-button>
      </div>
    </a-radio-group>

  </div>
</template>
<script>
export default {
  name: '',
  data() {
    return {
      selected: 'all',
      tags: [],
      categories: []
    }
  },
  methods: {
    changeArticleList: function (e) {
      let type = e.target.value;
      this.selected = type
      if ('byCate' === type) {
        this.getAllCategory()
      } else if ('byTag' === type) {
        this.getAllTag();
      }else if ('all' === type){
        this.$router.push('/articleList/all')
      }
    },
    changeList: function (e) {
      this.$router.push(`/articleList/${this.selected}/${e.target.value}`)
    },
    getAllTag: function () {
      let url = '/blog/meta/tag/list'
      this.$axios.get(url).then(resp => {
        this.tags = resp.data.data
      })
    },
    getAllCategory: function () {
      let url = '/blog/meta/category/list'
      this.$axios.get(url).then(resp => {
        this.categories = resp.data.data
      })
    }
  }
}
</script>

<style>
.left-bar {
  float: right;
}

.item-radio-group {
  margin-right: 30px;
  width: 200px;
  float: right;
}
</style>
