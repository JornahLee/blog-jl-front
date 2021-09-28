<template>
  <div class="wrapper">
    <a-affix :offset-top="0" >
      <div class="header">
        <slot name="header">
          <h1>this is header</h1>
        </slot>
      </div>
      <!--      <a-button>120px to affix top</a-button>-->
    </a-affix>

    <div class="container">
      <div class="left">
        <slot name="left"> 这里是左侧固定侧边栏</slot>
      </div>
      <div class="center">
        <slot name="center">
          this is center<br/><br/><br/><br/><br/><br/>
          this is center<br/><br/><br/><br/><br/><br/>
          this is center<br/><br/><br/><br/><br/><br/>
          this is center<br/><br/><br/><br/><br/><br/>
          this is center<br/><br/><br/><br/><br/><br/>
          this is center<br/><br/><br/><br/><br/><br/>
        </slot>

        <div class="center-placeholder"></div>
      </div>
      <div class="right-bar">
        <slot name="right-bar">这里是 右侧 悬浮 侧边栏</slot>
      </div>
    </div>

    <div class="footer">
      <div>
        <div>© 2019 - 2020 Jornah Lee | 蜀ICP备20012827号-1</div>
      </div>
      <a-back-top/>
    </div>
  </div>
</template>

<script>

export default {
  name: 'MainFrame'
}
</script>

<style>
.wrapper {
  background-color: rgb(241, 242, 245);
}

.header {
  width: 100%;
  /*position: fixed;*/
  /*top: 0;*/
  height: 50px;
  /*line-height: 100px;*/
  background-color: #ffffff;
  text-align: center;
  font-size: 16px;
  clear: both;
  border-top: 1px solid #000000;
  /*border: 1px solid #e0d8d8;*/
}


.container {
  margin-top: 55px;
}

.left {
  float: left;
  width: 20%;
  height: 200px;
  /*background-color: #FF0000;*/
  margin-right: 5px;
}


.center {
  float: left;
  width: 65%;
}

.center-placeholder {
  height: 30px;
  width: 100%;
}

.right-bar {
  float: right;
  width: 13%;
  /*height: 200px;*/
  /*background-color: #5F9EA0;*/
  position: fixed;
  /*border: 1px solid #e0d8d8;*/
  top: 100px;
  right: 10px;
  background-color: white;

}

.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 20px;
  /*line-height: 50px;*/
  background-color: white;
  text-align: center;
  font-size: 10px;
  clear: both;
  border: 1px solid #e0d8d8;
}

/*this.$refs.body.scrollTop*/

</style>
