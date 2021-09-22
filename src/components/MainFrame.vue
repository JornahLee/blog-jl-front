<template>
  <div class="wrapper">
    <div class="header">
      <div class="home">
        <div>Jornah Lee</div>
        <div>Love Life!</div>
      </div>
      <div class="tool-bar">搜索</div>
    </div>
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
      </div>
      <div class="right-bar">
        <slot name="right-bar">这里是 右侧 悬浮 侧边栏</slot>
      </div>
    </div>
    <div class="footer">
      <div>
        <div>© 2019 - 2020 Jornah Lee</div>
        <div>蜀ICP备20012827号-1</div>
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
  position: fixed;
  top: 0;
  height: 50px;
  /*line-height: 100px;*/
  background-color: #ffffff;
  text-align: center;
  font-size: 16px;
  clear: both;
  border-top: 1px solid #000000;
  /*border: 1px solid #e0d8d8;*/
}

.header > .home {
  width: 10%;
  height: 50px;
  font-size: 16px;
  color: white;
  background-color: rgb(43, 43, 43);
  float: left;
}

.header > .tool-bar {
  float: right;
}

.container {
  margin-top: 50px;
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
  /*height: 2000px;*/
  /*background-color: #008000;*/
  /*padding: 10px;*/
  padding: 50px;
  background-color: #ffff;
  border: 1px solid #e0d8d8;
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

}

.footer {
  width: 100%;
  height: 50px;
  /*line-height: 50px;*/
  /*background-color: #FFFF00;*/
  text-align: center;
  font-size: 10px;
  clear: both;
  border: 1px solid #e0d8d8;
}


</style>
