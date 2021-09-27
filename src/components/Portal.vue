<template>
  <div class="portal">
    <div class="title">我的博客们</div>
    <a-spin tip="Loading..." v-if="loading">
    </a-spin>
    <div>
      <div v-for="li in articleList" :key="li.article.id">
        <router-link :to="'/detail/'+li.article.id">{{ li.article.title }}</router-link>
        <hr/>
      </div>
      <a-pagination :default-current="1" :total="total"
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
      pageSize: null,
      pageNum: null,
      loading: false,
      total:0,
    }
  },
  mounted() {
    this.getByPage(1,10);
  },
  methods: {
    getByPage(pageNum,pageSize) {
      this.loading = true;
      let url = '/blog/article/list'
      this.$axios.post(url, {
        sortField: "updated",
        sort: "desc",
        pageSize: pageSize,
        pageNum: pageNum,

      }).then(response => {
        const {list, pageSize, pageNum,total, hasNextPage} = response.data.data
        this.articleList = list
        this.pageSize = pageSize
        this.pageNum = pageNum
        this.total = total
        this.loading = false;
      })
    }
  }
}
</script>
<style>
.title{
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

