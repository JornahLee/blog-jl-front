<template>
  <div class="info-wrapper">
    <a-avatar class="my-avatar" :size="100" shape="circle" src="http://qiniuyun.ilearn.space/peitela.gif" />
    <br/>
    <p>Jornah Lee</p>
    <p>积跬步，至千里</p>
    <p>积小流，成江海</p>
    <p>这里是项目介绍，前后端技术栈介绍，仓库地址</p>
    <p>以及个人简要介绍</p>

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
  text-align: center;
}
.my-avatar{
  alignment: center;
}

</style>
