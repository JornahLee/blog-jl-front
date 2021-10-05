<template>
  <div class="edit-left-side">
    <div class="item">
      <div class="label">分类:</div>
      <div class="input-box">
        <a-select  show-search style="width: 100%" placeholder="文章分类"
                   :filter-option="filterOption"
                   @change="handleChange">
          <a-select-option v-for="cate in meta.categories" :key="cate.id.toString()">
            {{ cate.name }}
          </a-select-option>
        </a-select>
      </div>
    </div>
    <div class="item">
      <div class="label">标签:</div>
      <div class="input-box">
        <a-select mode="tags" style="width: 100%" placeholder="文章标签" @change="handleChange">
          <a-select-option v-for="tag in meta.tags" :key="tag.id.toString()">
            {{ tag.name }}
          </a-select-option>
        </a-select>
      </div>
    </div>
    <div class="item">
      <div class="label" hidden="true"></div>
      <div class="input-box">
        <a-button @click="save">
          保存
        </a-button>
      </div>
    </div>

  </div>

</template>
<script>
export default {
  data() {
    return {
      article: {
        title: '',
        status: 'none',
        created: new Date(),
        updated: new Date()
      },
      meta: {
        categories: [{id: 1, name: 'f1'}, {id: 2, name: 'f2'}, {id: 3, name: 'f3'}],
        tags: [{id: 1, name: 't1'}, {id: 2, name: 't2'}, {id: 3, name: 't3'}],
      }
    }
  },
  mounted() {
    this.getAllTag();
    this.getAllCategory();
  },
  methods: {
    save() {
      this.$bus.$emit('saveArticle', this.article.status, this.meta)
    },
    getAllTag: function () {
      let url = '/blog/meta/tag/list'
      this.$axios.get(url).then(resp => {
        this.meta.tags = resp.data.data
      })
    },
    getAllCategory: function () {
      let url = '/blog/meta/category/list'
      this.$axios.get(url).then(resp => {
        this.meta.categories = resp.data.data
      })
    },
    filterOption(input, option) {
      return (
          option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      );
    }
  },
  created() {
    this.$bus.$on('articleEditMetaInit', article => {
      console.log('articleEditMetaInit');
      console.log(article);
      console.log('articleEditMetaInit');
      // this.article = article
    })
  }
};
</script>
<style>
.edit-left-side {
  margin-top: 56px;
  margin-left: 30%;
  /*background-color: yellow;*/
  /*width: 100%;*/
  /*height: 100%;*/
}


.item {
  margin: 10px;
  /*background-color: #cb0909;*/
  /*width: 100%;*/
  /*height: 100px;*/
  /*padding: 20px;*/
  height: 50px;
}

.label {
  padding-top: 15px;
  float: left;
  width: 30%;
  text-align: right;
  /*margin-right: 10px;*/
}

.input-box {
  padding-top: 10px;
  float: right;
  width: 60%;
}

</style>
