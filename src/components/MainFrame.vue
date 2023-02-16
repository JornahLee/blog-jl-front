<template>
  <div class="frame-wrapper">
    <a-affix :offset-top="0">
      <div class="header" :class="{'headerDisplay':headerDisplay,'headerHide':!headerDisplay}">
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
        <div>© 2019 - 2022 Jornah Lee | 蜀ICP备20012827号-1</div>
      </div>
      <a-back-top/>
<!--      <vue-live2d class="ban-niang" :direction="'left'"></vue-live2d>-->
    </div>
  </div>
</template>

<script>
// import vueLive2d from 'vue-live2d'

export default {
  name: 'MainFrame',
  components: {
    // vueLive2d
  },
  data() {
    return {
      headerDisplay: true,
      lastScrollTop: null
    }
  },
  mounted() {
    //todo 可能会导致，切换页面时导致的抖动
    // window.addEventListener('scroll', this.handleScroll, true); //监听滚动条
  },
  methods: {
    handleScroll() {
      // 滚动条距文档顶部的距离
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop ||
          document.body.scrollTop
      // 滚动条滚动的距离
      let scrollStep = scrollTop - this.lastScrollTop;
      // 更新——滚动前，滚动条距文档顶部的距离
      this.lastScrollTop = scrollTop;
      if (scrollStep < 0) {
        console.log("滚动条向上滚动了！")
        this.headerDisplay = true
      } else {
        console.log("滚动条向下滚动了！")
        this.headerDisplay = false
      }
    }
  }
}
</script>

<style scoped>

.headerDisplay {
  display: block;
}

.headerHide {
  display: none;
}

.ban-niang {
  position: fixed;
  bottom: -10px;
  left: 0;
  z-index: 10;
}

.frame-wrapper {
  /*background-color: rgb(241, 242, 245);*/
  /*background-image: radial-gradient(black, white);*/
  background-image: radial-gradient(circle, whitesmoke, #efe6d6, whitesmoke);
  /*background-image: linear-gradient(45deg, #9b9b9e,white, #9b9b9e);*/

}

.header {
  width: 100%;
  /*position: fixed;*/
  /*top: 0;*/
  height: 50px;
  /*line-height: 100px;*/
  background-color: #ffffff;
  /*background-color: red;*/
  text-align: center;
  font-size: 16px;
  clear: both;
  border-top: 1px solid #000000;
  /*border: 1px solid #e0d8d8;*/
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}


.container {
  margin-top: 20px;
}

.left {
  float: left;
  width: 20%;
  min-height: 100px;
  /*background-color: #FF0000;*/
  /*margin-right: 5px;*/
}

@media screen and (max-width: 400px) {
  .left {
    display: none;
  }
}

.center {
  float: left;
  width: 65%;
  min-height: 79vh;
  background-color: white;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  margin-bottom: 40px;
}

@media screen and (max-width: 400px) {
  .center {
    width: 100%;
    padding: 10px;
  }
}

.center-placeholder {
  height: 30px;
  width: 100%;
}

.right-bar {
  float: right;
  width: 13%;
  position: fixed;
  top: 100px;
  right: 10px;
  background-color: white;
}

@media screen and (max-width: 400px) {
  .right-bar {
    display: none;
  }

  .ban-niang {
    display: none;
  }
}

.footer {
  /*position: fixed;*/
  /*bottom: 0;*/
  width: 100%;
  height: 20px;
  background-color: white;
  text-align: center;
  font-size: 10px;
  clear: both;
  border: 1px solid #e0d8d8;
}


</style>

<style>
hr {
  width: 100%;
}
</style>
