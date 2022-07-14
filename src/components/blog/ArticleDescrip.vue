<template>
  <span class="display-info" v-if="this.article.id">
    <sapn v-if="isInDetail">
        <a-tag color="gray" @click="last(article.id)">上一篇 <a-icon type="double-left"/></a-tag>
        <a-tag color="gray" @click="next(article.id)">下一篇 <a-icon type="double-right"/></a-tag>
    </sapn>

    <a-tag class="display-info-item">创建
      <a-icon type="calendar"/>
      : {{ article.created|defaultValue(new Date())|dateTimeFormat }}
    </a-tag>
    <a-tag class="display-info-item">更新
      <a-icon type="calendar"/>
      : {{ article.updated|defaultValue(new Date())|dateTimeFormat }}
    </a-tag>
    <a-tag color="orange">{{ category.name || 'none' }}</a-tag>
    <a-tag v-if="isLogin">{{ article.status }}</a-tag>
    <!--    <a-tag> {{ article.hits }} <a-icon type="eye"/></a-tag>-->
    <router-link :to="'/detail/'+article.id" v-if="article.id && !isInDetail">
      <a-tag color="green">详情</a-tag>
    </router-link>
    <a-checkable-tag v-if="isLogin" v-model="isNice"
                     @change="status=>changeNice(status,article.id)">
      <a-icon type="fire"/>
    </a-checkable-tag>
    <router-link :to="article.id|joinStrBefore('/edit/')" v-if="isLogin">
        <a-tag color="green">编辑</a-tag>
      </router-link>
      <a-tag @click="deleteArticle(article.id)" v-if="article.id && isLogin" color="red"><span>删除</span></a-tag>
  </span>
</template>

<script>
export default {
  name: "ArticleDescrip",
  props: ['article', 'isInDetail', 'isEditing', 'isIndex'],
  data() {
    return {
      isLogin: this.$store.state.isLogin,
      category: 'none'
    }
  },
  computed: {
    isNice() {
      return this.article.recommendLevel > 0
    }
  },
  mounted() {
    console.log('descrip');
    console.log(this.article.id);
    if (this.article.id) {
      this.getArticleMetaInfo(this.article.id)
    }
  },
  methods: {
    next(id) {
      this.toNextOrLast(id, true)
    },
    last(id) {
      this.toNextOrLast(id, false)
    },
    toNextOrLast(id, next) {
      this.$api.getNextOrLastArticle(id, next)
          .then(response => {
            let id = response.data.data
            this.$router.push(this.isEditing ? `/edit/${id}` : `/detail/${id}`)
          })
    },
    changeNice(status, articleId) {
      if (!articleId) {
        this.$message.error('请先保存文章')
        return;
      }
      let params = {
        id: articleId,
        recommendLevel: status ? 1 : 0
      }
      this.saving = true;
      this.$api.saveOrUpdateArticle(params)
          .then(resp => {
            this.$message.success(status ? '推荐成功！' : '取消推荐')
            this.article.recommendLevel = status ? 1 : 0
          });
    },
    deleteArticle(id) {
      this.$api.deleteArticle(id).then(resp => {
        this.$message.success("删除成功")
      })
    },
    getArticleMetaInfo(articleId) {
      this.$api.getArticleMetaInfo(articleId)
          .then(response => {
            const {category, tags} = response.data.data
            this.category = category
            this.tags = tags
          })
    }
  },
  watch: {
    article(newVal, oldVal) {
      if (newVal.id) {
        this.getArticleMetaInfo(newVal.id)
      }
    }
  }

}
</script>

<style scoped>
body {
  color: gray;
}

.display-info {
  text-align: justify;
  display: inline-block;
}

</style>
