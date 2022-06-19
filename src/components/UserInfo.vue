<template>
  <div class="info-wrapper">
    <div class="avatar"><a-icon type="user" style="font-size: 100px"/></div>
    <p>这里是头像</p>

  </div>
</template>

<script>
export default {
  name: "UserInfo"
}
</script>

<style scoped>
.info-wrapper{
  /*margin-top: 100px;*/
  float: right;
  padding: 40px 10px 10px;
  /*background-color: white;*/

  /*box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 2px 10px 0 rgba(0, 0, 0, 0.19);*/
  /*border-radius: 10px;*/
  /*border: dotted black 1px;*/
  width: 70%;
  height: 79vh;
}
.avatar{
  text-align: center;
}

</style>
