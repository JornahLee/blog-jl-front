<template>
  <div class="info-wrapper">
    <a-avatar class="my-avatar" :size="100" shape="circle" :src="userInfo.avatarUrl"/>
    <br/>
    <div>{{ userInfo.screenName }}</div>
    <div>{{ userInfo.signature }}</div>
    <div>{{ userInfo.projIntroduction }}</div>
    <div>{{ userInfo.introduction }}</div>

  </div>
</template>

<script>
export default {
  name: "UserInfo",
  data() {
    return {
      userInfo: {}
    }
  },
  mounted() {
    this.$api.getOwnerInfo()
        .then(response => {
          const {data} = response.data
          this.userInfo = data;
        })
  }
}
</script>

<style scoped>
.info-wrapper {
  /*margin-top: 100px;*/
  float: right;
  padding: 40px 10px 10px;
  /*background-color: white;*/

  /*box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 2px 10px 0 rgba(0, 0, 0, 0.19);*/
  /*border-radius: 10px;*/
  /*border: dotted black 1px;*/
  width: 70%;
  height: 79vh;
  text-align: center;
  white-space: pre-wrap;
}

.my-avatar {
  alignment: center;
}

</style>
