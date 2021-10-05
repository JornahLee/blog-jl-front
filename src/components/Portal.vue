<template>
  <div class="portal">
    <div class="title">我的博客们</div>
    <a-spin tip="Loading..." v-if="loading">
    </a-spin>
    <div>
      <div v-for="li in articleList" :key="li.id">
        <router-link :to="'/detail/'+li.id">{{ li.title }}</router-link>
        <hr/>
      </div>
      <a-pagination :default-current="1" :total="total" v-if="total>pageSize"
                    @change="getByPage"
                    :pageSize="pageSize" :current="pageNum"/>
    </div>
    <div class="pagination">
      <!--      todo 这里有bug， 不知道为啥会闪一下-->
      <div>看 这里会闪一下</div>
    </div>
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
      selectInfo: {
        type: '',
        param: ''
      }
      //  all byTag byCate
    }
  },
  mounted() {
    this.getByPage(1, 10);
  },
  created() {
    this.$bus.$on('selectArticleByCondition', (type, param) => {
      this.selectInfo.type = type
      this.selectInfo.param = param
      this.getByPage(1, 10)
    })
  },
  methods: {
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
      let selectInfo = this.selectInfo;
      if (selectInfo.type === 'byTag') {
        url = '/blog/article/list/byTag';
        config.queryKeyColumns.byTag = selectInfo.param
      } else if (selectInfo.type === 'byCate') {
        url = '/blog/article/list/byCate';
        config.queryKeyColumns.byCate = selectInfo.param
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
  }
}
</script>
<style>
.title {
  text-align: center;
  font-size: 30px;
}

.pagination {
  position: absolute;
  bottom: 0;
  left: 40%;
  /*left: 0;*/
}
</style>

