<template>
  <div class="edit-left-side">
    <div class="item">
      <div class="label">分类:</div>
      <div class="input-box">
        <a-select show-search style="width: 100%" placeholder="文章分类" v-model="form.cate"
                  :filter-option="filterOption">
          <a-select-option v-for="cate in meta.categories" :key="cate.id.toString()">
            {{ cate.name }}
            <a style="float: right" @click="deleteCate(cate.id)">
              <a-icon type="close"/>
            </a>
          </a-select-option>
        </a-select>
      </div>
      <div class="input-box">
        <a-input size="small" class="new-cate" placeholder="+" v-model="form.newCateName" @pressEnter="newCate"/>
      </div>
    </div>
    <div class="item">
      <div class="label">标签:</div>
      <div class="input-box">
        <a-select mode="tags" style="width: 100%" placeholder="文章标签" v-model="form.tags">
          <a-select-option v-for="tag in meta.tags" :key="tag.id.toString()">
            {{ tag.name }}
          </a-select-option>
        </a-select>
      </div>
    </div>
    <div class="input-box">
      <a-input size="small" class="new-cate" placeholder="+" v-model="form.newTagName" @pressEnter="newCate"/>
    </div>
    <div class="item">
      <div class="label" hidden="true"></div>
      <div class="input-box">
        <a-button @click="saveMetaInfo">
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
      },
      form: {
        cate: '',
        tags: [],
        newCateName: '',
        newTagName: ''
      }
    }
  },
  mounted() {
    this.getAllTag();
    this.getAllCategory();
  },
  methods: {
    save() {
      console.log(this.form);
    },
    getAllTag: function () {
      let url = '/blog/meta/tag/list'
      this.$api.getSiteInfo().then(resp => {
        this.meta.tags = resp.data.data.tagList
      })
    },
    getAllCategory: function () {
      this.$api.getSiteInfo().then(resp => {
        this.meta.categories = resp.data.data.cateList
      })
    },
    filterOption(input, option) {
      return (
          option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      );
    },
    newCate(e) {
      let cateName = this.form.newCateName;
      let url = '/blog/meta/category/' + cateName
      this.$axios.put(url).then(resp => {
        this.form.newCateName = '';
        this.$message.success("新增分类成功:" + resp.data.data.name)
        this.getAllCategory()
      })
    },
    //todo 这里暂时不实现，因为还要涉及要该分类下还有文章的情况
    deleteCate(cateId) {
      this.meta.categories.forEach((value, index, array) => {
        if (value.id === cateId) {
          array.splice(index, 1)
        }
      })
    },
    saveMetaInfo() {
      const url = '/blog/meta/save'
      let params = {
        articleId: this.article.id,
        cateId: this.form.cate,
        tagIds: this.form.tags,
      }
      console.log(params);
      this.$axios.post(url, params).then(resp => {
        this.$message.success("保存文章数据成功")
      })

    }
  },
  created() {
    this.$bus.$on('articleEditMetaInit', article => {
      console.log('articleEditMetaInit');
      console.log(article);
      console.log('articleEditMetaInit');
      this.article = article
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

.new-cate:focus {
  width: 100%;
  transition: width 0.5s;
}

.new-cate {
  width: 25px;
}
</style>
