<template>
  <div>
    <a-input-search placeholder="搜索文章"
                    @search="doSearch" allowClear/>
    <!--    :footer="null" 不显示底部按钮-->
    <a-modal :width="'60%'" :dialogStyle="{top:'40px'}"
             v-model="showSearchResult" ok-text="下一页" cancel-text="上一页" :okType="null"
             :title="'已找到 '+resultSize+' 篇相关文章'">

      <div v-for="searchHit in searchHitInfoList">
        <div class="article-hit">
          <router-link :to="searchHit.url " @click.native="showSearchResult=false">{{ searchHit.title }}</router-link>
          <div v-for="hit in searchHit.bodyHitInfoList">
            <div class="my-hr"></div>
            <div v-html="hit.hitContext"></div>
          </div>
        </div>
      </div>
    </a-modal>

    <!--    </div>-->
  </div>
</template>
<script>
// import Input from 'ant-design-vue/lib/input';
// Vue.use(Input);
// import Modal from 'ant-design-vue/lib/modal';
// Vue.use(Modal);
export default {
  // components:{
  //   Input,Modal
  // },
  data() {
    return {
      showSearchResult: false,
      resultSize: 0,
      searchHitInfoList: [],
      showNextPage: false
    }
  },
  methods: {
    doSearch(value) {
      let url = '/blog/article/v2/search'

      this.$axios.post(url, {
        searchStr: value,
        pageSize: 5,
        pageNum: 1
      }).then(response => {
        this.searchHitInfoList = response.data.data
        this.showSearchResult = true
        this.resultSize = this.searchHitInfoList.length
      })
    }
  }
}
</script>
<style>
.article-hit {
  padding-left: 20px;
  padding-bottom: 20px;
  /*padding: 20px;*/
  margin: 5px;
}

.hlt1 {
  background-color: yellow;
}

.my-hr {
  border: 0;
  height: 1px;
  margin: 5px;
  background-color: #333;
  background-image: linear-gradient(to right, #ccc, #333, #ccc);
}
</style>
