<template>
  <div class="article-body-wrapper">
    <div class="title">我的博客们</div>
    <a-spin tip="Loading..." v-if="loading">
    </a-spin>
    <div class="articleList">
      <div v-for="li in articleList" :key="li.id" class="articleName">
        <article-descrip :article="li"></article-descrip>
        <div>
          <router-link :to="'/detail/'+li.id">
            <span class="article-title">{{ li.title }}</span>
          </router-link>
        </div>
      </div>
    </div>
    <a-pagination :default-current="1" :total="total" v-if="total>pageSize"
                  @change="getByPage"
                  :pageSize="pageSize" :current="pageNum"/>
  </div>
</template>

<script>
import ArticleDescrip from "./blog/ArticleDescrip";

export default {
  components: {ArticleDescrip},
  data() {
    return {
      articleList: [],
      pageSize: 10,
      loading: false,
      total: 0,
      sharedState: this.$store.state
    }
  },
  props: ['type', 'value', 'pageNum'],
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.getByPage(this.pageNum, this.pageSize);
    },
    getByPage(pageNum, pageSize) {
      this.loading = true;
      let config = {
        sortField: "updated",
        sort: "desc",
        pageSize: pageSize,
        pageNum: pageNum || 1,
        queryKeyColumns: {}
      }
      if (this.type === 'byTag') {
        config.queryKeyColumns.byTag = this.value
      } else if (this.type === 'byCate') {
        config.queryKeyColumns.byCate = this.value
      }
      console.log('where you are')
      this.$api.getArticleList(config).then(response => {
        const {list, pageSize, pageNum, total, hasNextPage} = response.data.data
        this.articleList = list
        this.pageSize = pageSize
        this.pageNum = pageNum
        this.total = total

        let articleIdList = this.articleList.map(article => article.id)
        this.$api.batchGetArticleMetaInfoAndCache(articleIdList)
      }).finally(() => {
        this.loading = false;
      })
    }
  },
  watch: {
    'pageNum'(to, from) {
      let value = this.value || 1
      this.$router.push(`/articleList/${this.type}/${value}/page/${to}`)
    },
    '$route'(to, from) {
      console.log(this.type);
      console.log(this.value);
      // this.getByPage(1, this.pageSize);
    }
  }
}
</script>
<style scoped>
.title {
  text-align: center;
  font-size: 30px;
}

.article-body-wrapper {
  /*border: #e5e4e4 solid 1px;*/
  border-radius: 10px;
  padding: 10px;
}

.articleName {
  border-bottom: 1px solid black;
  margin-bottom: 10px;
}

.article-title {
  font-size: 16px;
}

.articleList {
  margin-bottom: 40px;
}

</style>

