<template>
  <div class="info-wrapper">
    <a-avatar class="my-avatar" :size="100" shape="circle" :src="userInfo.avatarUrl"/>
    <!--    <br/>-->
    <div class="screen-name info-dtl">{{ userInfo.screenName }}</div>
    <div class="signature .info-dtl">{{ userInfo.signature }}</div>
    <div class="stats">
      <div class="stats-item">
        <div>随笔</div>
        <div class="stats-count">
          <router-link :to="'/articleList/all/page/1'">{{ userInfo.articleCount ? userInfo.articleCount : 149 }}</router-link>
        </div>
      </div>
      <div class="stats-item">
        <div>分类</div>
        <div class="stats-count">
          <router-link :to="'/articleList/all/page/1'">{{ userInfo.cateCount ? userInfo.cateCount : 14 }}</router-link>
        </div>
      </div>
      <div class="stats-item">
        <div>标签</div>
        <div class="stats-count">
          <router-link :to="'/articleList/all/page/1'">{{ userInfo.tagCount ? userInfo.tagCount : 30 }}</router-link>
        </div>
      </div>
    </div>
    <div class="discrption">
      介绍: {{userInfo.projIntroduction }}
    </div>
    <hr/>
    <div class="yiyan">
      <a :href="yiyan.href" class="yiyan-text"> {{ yiyan.text }}</a>
      <div class="discrption"><span>来源: 《{{ yiyan.from }}》 作者: {{ yiyan.fromWho }}</span></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
  data() {
    return {
      userInfo: {},
      yiyan: {
        text: '',
        href: '',
        from: '',
        fromWHo: ''
      }
    }
  },
  mounted() {
    this.$api.getOwnerInfo()
        .then(response => {
          const {data} = response.data
          this.userInfo = data;
        })
    this.$api.yiyan()
        .then(({data}) => {
          this.yiyan.text = data.hitokoto
          this.yiyan.from = data.from
          this.yiyan.fromWho = data.from_who ? data.from_who : '佚名'
          this.yiyan.href = 'https://hitokoto.cn/?uuid=' + data.uuid
        })
  }
}
</script>

<style scoped>
.info-wrapper {
  float: right;
  padding: 35px 10px;
  width: 70%;
  /*height: 60vh;*/
  text-align: center;
  border-radius: 10px;
  background-color: white;
  margin-right: 15px;
}

.screen-name {
  font-size: 20px;
}

.stats {
  /*float: right;*/
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  /*text-align: center;*/
  justify-content: center;
}

.stats-item {
  margin: 5px 10px 5px 5px;
}

.stats-count {
  font-size: 18px;
}

.info-dtl {
  margin-top: 10px;
}

.yiyan {
  margin-top: 15px;
}

.yiyan-text {
  color: rgba(0, 0, 0, 0.65);
  text-decoration: underline
}

.discrption {
  margin-top: 5px;
  font-size: 1px;
}

.my-avatar {
  alignment: center;
}

</style>
