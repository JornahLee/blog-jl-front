<template>
  <div class="article-body-wrapper">
    <div class="title">我的博客们</div>
    <a-spin tip="Loading..." v-if="loading">
    </a-spin>
    <div class="articleList">
      <div v-for="li in articleList" :key="li.id" class="articleName">
        <router-link :to="li.id|joinStrBefore('/edit/')" v-if="sharedState.isLogin">
          <a-tag color="green">编辑</a-tag>
        </router-link>
        <router-link :to="'/detail/'+li.id">{{ li.title }}</router-link>
        <a-tag color="orange">{{ li.status || 'loading' }}</a-tag>
        <a-tag class="display-info-item">
          <a-icon type="calendar"/>
          <span>: {{ li.created|defaultValue(new Date())| dateFormat }}</span>
        </a-tag>
      </div>
    </div>
    <a-pagination :default-current="1" :total="total" v-if="total>pageSize"
                  @change="getByPage"
                  :pageSize="pageSize" :current="pageNum"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      articleList: [],
      pageSize: 10,
      pageNum: 1,
      loading: false,
      total: 0,
      sharedState: this.$store.state
    }
  },
  props: ['type', 'value'],
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.getByPage(1, this.pageSize);
    },
    getByPage(pageNum, pageSize) {
      this.loading = true;
      let config = {
        sortField: "updated",
        sort: "desc",
        pageSize: pageSize,
        pageNum: pageNum,
        queryKeyColumns: {}
      }
      let url;
      if (this.type === 'byTag') {
        url = '/blog/article/list/byTag';
        config.queryKeyColumns.byTag = this.value
      } else if (this.type === 'byCate') {
        url = '/blog/article/list/byCate';
        config.queryKeyColumns.byCate = this.value
      } else {
        url = '/blog/article/list';
      }
      this.$axios.post(url, config).then(response => {
        const {list, pageSize, pageNum, total, hasNextPage} = response.data.data
        this.articleList = list
        this.pageSize = pageSize
        this.pageNum = pageNum
        this.total = total
      }).finally(() => {
        this.loading = false;
      })
    }
  },
  watch: {
    '$route'(to, from) {
      console.log(this.type);
      console.log(this.value);
      this.getByPage(1, this.pageSize);
    }
  }
}
</script>
<style>
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

.articleList {
  margin-bottom: 40px;
}

</style>

