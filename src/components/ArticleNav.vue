<template>
  <div class="nav-wrapper">
    <div class="cate-container">
      <a-checkable-tag class="my-tag" v-model="cate.checked"
                       @change="e=>changeSelectStatus(e, cate,'byCate')"
                       v-if="index <= showLimit || showAllCate"
                       v-for="(cate,index) in categories"
                       :key="cate.id"> {{ cate.name }}
      </a-checkable-tag>
      <div>
        <a-tag v-if="showAllCate" @click="showAllCate=false">收起</a-tag>
        <a-tag v-else @click="showAllCate=true">more</a-tag>
      </div>
    </div>
    <hr/>
    <div class="tag-container">
      <a-checkable-tag calss="my-tag" v-model="tag.checked"
                       @change="e=>changeSelectStatus(e, tag,'byTag')"
                       v-if="index <= showLimit"
                       v-for="(tag,index) in tags" :key="tag.id">
        {{ tag.name }}
      </a-checkable-tag>
    </div>


  </div>
</template>
<script>
export default {
  name: '',
  data() {
    return {
      selected: {
        type: 'cate',
        id: null
      },
      tags: [],
      categories: [],
      showLimit: 8,
      showAllCate: false
    }
  },
  mounted() {
    this.getAllCategory();
    this.getAllTag();
  },
  methods: {
    cancelOthers() {
      if (!this.selected) {
        return;
      }
      const {type, id} = this.selected
      if (type === 'byCate') {
        this.categories
            .filter(e => e.id !== id && e.checked === true)
            .forEach(e => {
              e.checked = false
            })
      } else if ('byTag' === type) {
        this.tags
            .filter(e => e.id !== id && e.checked === true)
            .forEach(e => {
              e.checked = false
            })
      }
    },
    changeSelectStatus(status, obj, type) {
      if (status) {
        this.selected = {
          type: type, id: obj.id
        };
      } else {
        this.selected = null;
      }
      this.changeList();
      this.cancelOthers()

    },
    changeList: function () {
      if (this.selected) {
        const {type, id} = this.selected
        console.log(`/articleList/${type}/${id}`)
        this.$router.push(`/articleList/${type}/${id}`)
      } else {
        this.$router.push('/articleList/all')
      }
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
  },
}
</script>

<style>
.nav-wrapper {
  float: right;
  padding: 25px 10px 10px;
}

.cate-container,.tag-container{
  height: 50%;
}

</style>
