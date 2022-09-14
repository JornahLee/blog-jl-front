<template>
  <div class="display-info" v-if="this.article.id">
    <div class="part1">
      <a-tag class="display-info-item">创建
        <a-icon type="calendar"/>
        <span v-if="isInDetail">: {{ article.created|defaultValue(new Date())| dateFormat }}</span>
        <span v-else>: {{ article.created|defaultValue(new Date())| dateTimeFormat }}</span>
      </a-tag>
      <a-tag class="display-info-item">更新
        <a-icon type="calendar"/>
        <span v-if="isInDetail">: {{ article.updated|defaultValue(new Date())| dateFormat }}</span>
        <span v-else>: {{ article.updated|defaultValue(new Date())| dateTimeFormat }}</span>
      </a-tag>
      <a-tag v-if="isLogin">{{ articleStatus || 'none' }}</a-tag>
      <a-tag color="orange">{{ category ? category.name || 'none' : 'none' }}</a-tag>
    </div>
    <div class="part2">
      <sapn v-if="isInDetail">
        <a-tag color="gray" @click="last(article.id)">上一篇
          <a-icon type="double-left"/>
        </a-tag>
        <a-tag color="gray" @click="next(article.id)">下一篇
          <a-icon type="double-right"/>
        </a-tag>
      </sapn>

      <!--    <a-tag> {{ article.hits }} <a-icon type="eye"/></a-tag>-->
      <router-link :to="'/detail/'+article.id" v-if="article.id && isEditing">
        <a-tag color="green">详情</a-tag>
      </router-link>
      <a-checkable-tag v-if="isLogin" v-model="isNice"
                       @change="status=>changeNice(status,article.id)">
        <a-icon type="fire"/>
      </a-checkable-tag>
      <router-link :to="article.id|joinStrBefore('/edit/')" v-if="isLogin && !isEditing">
        <a-tag color="green">编辑</a-tag>
      </router-link>
      <a-tag @click="deleteArticle(article.id)" v-if="article.id && isLogin" color="red"><span>删除</span></a-tag>
      <a-tag @click="publishArticle(article.id)" v-if="article.id && isLogin" color="green"><span>发布</span></a-tag>
      <a-select v-if="isLogin"
                class="type-select"
                ref="select"
                size="small"
                style="min-width: 75px"
                v-model:value="articleType"
                @change="handleArticleTypeChange"
      >
        <a-select-option v-for="item in articleTypes" :key="item">{{ item }}</a-select-option>
      </a-select>

    </div>
  </div>
</template>

<script>
import * as ArticleStatus from '../../constant/articleStatus'
import config from '../../config/config'

export default {
  name: "ArticleDescrip",
  props: ['article', 'isInDetail', 'isEditing', 'isIndex'],
  data() {
    return {
      isLogin: this.$store.state.isLogin,
      category: {},
      tempStatus: null,
      articleTypes: config.article.types,
      articleType: this.article.type || 'none',
    }
  },
  computed: {
    isNice() {
      return this.article.recommendLevel > 0
    },
    articleStatus() {
      return this.tempStatus || this.article.status;
    }
  },
  mounted() {
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
        this.tempStatus = ArticleStatus.DELETED
        console.log(this.articleStatus);
      })
    },
    publishArticle(id) {
      let article = {id: id, status: ArticleStatus.PUBLISHED}
      this.$api.saveOrUpdateArticle(article).then(resp => {
        this.$message.success("发布成功")
        this.tempStatus = ArticleStatus.PUBLISHED
      })
    },
    getArticleMetaInfo(articleId) {
      this.$api.getArticleMetaInfo(articleId)
          .then(response => {
            const {category, tags} = response.data.data
            this.category = category
            this.tags = tags
          })
    },
    handleArticleTypeChange(value) {
      this.articleType = value
      console.log(value)
      console.log(this.article.id);
      let article = {id: this.article.id, type: value}
      this.$api.saveOrUpdateArticle(article).then(resp => {
        this.$message.success("更新文章类型成功")
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

.part2 {
  margin-top: 3px;
}

.display-info {
  text-align: justify;
  /*text-align-last: justify;*/
  display: inline-block;
  margin: 2px;
  /*width: 100%;*/
}

</style>
