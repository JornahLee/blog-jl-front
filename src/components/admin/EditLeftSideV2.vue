<template>
  <div class="edit-left-side">
    <a-checkable-tag @change="e=>this.managing=e" v-model="managing" v-if="this.$store.state.isLogin">管理
    </a-checkable-tag>
    <hr/>
    <div class="cate-container">
      <div v-if="managing">
        <a-tag closable class="my-tag"
               @close="deleteCate(cate.id)"
               v-if="index <= showLimit || showAllCate"
               v-for="(cate,index) in categories"
               :key="cate.id"> {{ cate.name }}
        </a-tag>
      </div>
      <div v-else>
        <a-checkable-tag class="my-tag" v-model="cate.checked"
                         v-if="index <= showLimit || showAllCate"
                         @change="status=>cancelOtherCate(cate,status)"
                         v-for="(cate,index) in categories"
                         :key="needRefreshSelectStatus"> {{ cate.name }}
        </a-checkable-tag>
      </div>
      <div v-if="managing">
        <a-input
            v-if="inputCateVisible"
            ref="input"
            type="text"
            size="small"
            :style="{ width: '78px' }"
            :value="inputCateValue"
            @change="handleCateInputChange"
            @blur="handleCateInputConfirm"
            @keyup.enter="handleCateInputConfirm"
        />
        <a-tag v-else style="background: #fff; borderStyle: dashed;" @click="showCateInput">
          <a-icon type="plus"/>
          New Cate
        </a-tag>
      </div>
      <div>
        <a-checkable-tag @change="e=>this.showAllCate=e" v-model="showAllCate">
          <span v-if="showAllCate">收起</span>
          <span v-else>更多...</span>
        </a-checkable-tag>
      </div>
    </div>
    <hr/>
    <div class="tag-container">
      <div v-if="managing">
        <a-tag closable calss="my-tag"
               @close="deleteTag(tag.id)"
               v-if="index <= showLimit || showAllTag"
               v-for="(tag,index) in tags" :key="tag.id">
          {{ tag.name }}
        </a-tag>
      </div>
      <div v-else>
        <a-checkable-tag calss="my-tag" v-model="tag.checked"
                         v-if="index <= showLimit || showAllTag"
                         @change="needRefreshSelectStatus++"
                         v-for="(tag,index) in tags" :key="needRefreshSelectStatus">
          {{ tag.name }}
        </a-checkable-tag>
      </div>
      <div v-if="managing">
        <a-input
            v-if="inputTagVisible"
            ref="input"
            type="text"
            size="small"
            :style="{ width: '78px' }"
            :value="inputTagValue"
            @change="handleTagInputChange"
            @blur="handleTagInputConfirm"
            @keyup.enter="handleTagInputConfirm"
        />
        <a-tag v-else style="background: #fff; borderStyle: dashed;" @click="showTagInput">
          <a-icon type="plus"/>
          New Tag
        </a-tag>
      </div>
      <div>
        <a-checkable-tag @change="e=>this.showAllTag=e" v-model="showAllTag">
          <span v-if="showAllTag">收起</span>
          <span v-else>更多...</span>
        </a-checkable-tag>
      </div>
    </div>
    <hr/>
    <a-button @click="saveMetaInfo">更新</a-button>
  </div>

</template>
<script>
export default {
  data() {
    return {
      article: {
        tags: [],
        cate: {}
      },
      showLimit: 10,
      showAllCate: false,
      showAllTag: false,
      categories: [],
      tags: [],
      managing: false,
      needRefreshSelectStatus: 0,
      inputCateVisible: false,
      inputCateValue: '',
      inputTagVisible: false,
      inputTagValue: '',
    }
  },
  mounted() {
    this.getAllTag();
    this.getAllCategory();
  },
  methods: {
    getAllTag: function () {
      this.$api.getAllTag()
          .then(resp => {
            this.tags = resp.data.data
          })
    },
    getAllCategory: function () {
      this.$api.getAllCategory()
          .then(resp => {
            this.categories = resp.data.data
          })
    },
    newCate(cateName) {
      this.$api.newCate(cateName)
          .then(resp => {
            this.$message.success("新增分类成功:" + resp.data.data.name)
            this.getAllCategory()
          })
    },
    deleteCate(id) {
      this.$api.delCate(id)
          .then(resp => {
            this.$message.success("删除分类成功")
            this.getAllCategory()
          })
    },
    deleteTag(id) {
      this.$api.delTag(id)
          .then(resp => {
            this.$message.success("删除标签成功")
            this.getAllTag()
          })
    },
    getArticleMetaInfo() {
      this.$api.getArticleMetaInfo(this.article.id)
          .then(response => {
            const {category, tags} = response.data.data
            this.article.cate = category
            this.article.tags = tags
            if (category) {
              this.categories.filter(cate => {
                return cate.id === this.article.cate.id
              }).forEach(cate => {
                cate.checked = true
              })
            }
            if (tags) {
              let articleTagIdList = tags.map(tag => tag.id)
              this.tags.filter(tag => {
                return articleTagIdList.indexOf(tag.id) !== -1
              }).forEach(tag => {
                tag.checked = true
              })
            }
            this.needRefreshSelectStatus++
          })
    },
    saveMetaInfo() {
      let articleCate = this.categories.find(cate => {
        return cate.checked === true
      })
      let articleTagIds = this.tags.filter(tag => {
        return tag.checked === true
      }).map(tag => tag.id)

      this.$api.saveMetaInfo(this.article.id, articleCate ? articleCate.id : null, articleTagIds)
          .then(resp => {
            this.$message.success("保存文章数据成功")
          })
    },
    cancelOtherCate(currentCate, status) {
      if (status) {
        this.categories
            .filter(e => e.id !== currentCate.id && e.checked === true)
            .forEach(e => {
              e.checked = false
            })
      }
    },
    showTagInput() {
      this.inputTagVisible = true;
      this.$nextTick(function () {
        this.$refs.input.focus();
      });
    },
    showCateInput() {
      this.inputCateVisible = true;
      this.$nextTick(function () {
        this.$refs.input.focus();
      });
    },

    handleCateInputChange(e) {
      this.inputCateValue = e.target.value;
    },
    handleTagInputChange(e) {
      this.inputTagValue = e.target.value;
    },
    handleCateInputConfirm() {
      const inputValue = this.inputCateValue;
      let categories = this.categories;
      if (inputValue && categories.indexOf(inputValue) === -1) {
        categories = [{name: inputValue}, ...categories];
        this.$api.newCate(inputValue)
            .then(resp => {
              this.$message.success("新增标分类成功:" + resp.data.data.name)
              this.getAllCategory()
            })
      }
      //浅拷贝
      Object.assign(this, {
        categories,
        inputCateVisible: false,
        inputCateValue: '',
      });
    },
    handleTagInputConfirm() {
      const inputValue = this.inputTagValue;
      let tags = this.tags;
      if (inputValue && tags.indexOf(inputValue) === -1) {
        tags = [{name: inputValue}, ...tags];
        this.$api.newTag(inputValue)
            .then(resp => {
              this.$message.success("新增标签成功:" + resp.data.data.name)
              this.getAllTag()
            })
      }
      //浅拷贝
      Object.assign(this, {
        tags,
        inputTagVisible: false,
        inputTagValue: '',
      });
    },
  },
  created() {
    this.$bus.$on('articleEditMetaInit', article => {
      console.log('bus on ono no non on o')
      this.article = {id: article.id}
      this.getAllTag()
      this.getAllCategory()
      this.getArticleMetaInfo()
    })
  }
};
</script>
<style scoped>
.edit-left-side {
  text-align: right;
  margin-top: 56px;
  margin-left: 30%;
  /*background-color: yellow;*/
  /*width: 100%;*/
  /*height: 100%;*/
  padding: 5px;
}

</style>

