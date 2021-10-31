<template>
  <div>
    <div class="cover" v-bind:style="{ display: showSearchResult?'':'none'}" @click="closeResult">
    </div>
    <a-input-search class="search-input" placeholder="搜索文章" @focus="showLastSearchResult"
                    @search="doSearch" allowClear/>
    <transition name="draw">
      <div class="search-result" id="searchResult" v-if="showSearchResult">
        <div v-for="searchHit in searchHitInfoList">
          <div class="article-hit">
            <div @click="pushToDetail(searchHit.url,'',$event)">
              <a>{{ searchHit.title }}
              </a>
            </div>
            <div v-for="hit in searchHit.bodyHitInfoList">
              <div class="my-hr"></div>
              <a @click="pushToDetail(searchHit.url,hit.underHeadOriginal,$event)">
                <div class="body-hit-ctx" v-html="hit.hitContext"></div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </transition>

  </div>
</template>
<script>
export default {
  data() {
    return {
      searchStr: '',
      showSearchResult: false,
      resultSize: 0,
      searchHitInfoList: [],
      showNextPage: false,
      onScrollEle: null
    }
  },
  methods: {
    doSearch(value) {
      this.searchStr = value
      let url = '/blog/article/v2/search'
      this.$axios.post(url, {
        searchStr: value,
        pageSize: 5,
        pageNum: 1
      }).then(response => {
        this.searchHitInfoList = response.data.data
        this.showSearchResult = true
        this.resultSize = this.searchHitInfoList.length
      })
    }, showLastSearchResult() {
      if (this.resultSize > 0) {
        this.showSearchResult = true;
      }
    }, pushToDetail(url, headLineStr, e) {
      this.onScrollEle = e.target
      let realHeadLineStr = headLineStr.replaceAll('#', '').replace(/:\d+:/, '').trim()
      this.$router.push(url + '/' + realHeadLineStr)
    },
    closeResult() {
      this.showSearchResult = false

    }
  },
  watch: {
    showSearchResult(val, oldVal) {
      if (val === true && this.onScrollEle !== null) {
        this.timer = setTimeout(() => {
          let container = document.getElementById("searchResult")
          //     scrollTo = this.onScrollEle;
          // container.scrollTop(
          //     scrollTo.offset().top - container.offset().top + container.scrollTop()
          // );
          // console.log(container.offsetTop);

          let min = container.offsetTop - this.onScrollEle.offsetTop;
          container.offsetTop
          // console.log(this.onScrollEle);
          document.getElementById("searchResult").scroll(0, this.onScrollEle.offsetParent)
        }, 500)
        // .scrollIntoView()
        // this.onScrollEle.scrollIntoView()
      }
    }
  }
}
</script>
<style>
.article-hit {
  padding-left: 20px;
  padding-bottom: 20px;
  /*padding: 20px;*/
  margin: 5px;
}

.hlt1 {
  background-color: yellow;
}

.my-hr {
  border: 0;
  height: 1px;
  margin: 5px;
  background-color: #333;
  background-image: linear-gradient(to right, #ccc, #333, #ccc);
}

.body-hit-ctx {
  color: black;
}

.search-input {
  z-index: 10;
  /*width: 100%;*/
}

.search-result {
  z-index: 10;
  position: absolute;
  background-color: white;
  text-align: left;
  font-size: 12px;
  height: 35vh;
  width: 60vw;
  overflow: auto;
  border-radius: 10px;
  border: solid lightblue 2px;
  margin-top: 5px;
}

.draw-enter-active, .draw-leave-active {
  transition: opacity .5s;
  /*transition: all 0.5s ease;*/
}

.draw-enter, .draw-leave-to /* .fade-leave-active below version 2.1.8 */
{
  opacity: 0;
  /*height: 0;*/
}

.cover {
  background: #000;
  position: absolute;
  left: 0px;
  top: 0px;
  width: calc(100vw);
  /*width: 1000px;*/
  filter: alpha(opacity=30);
  opacity: 0.3;
  /*display: none;*/
  z-index: 2;
  /*height: 1000px;*/
  height: calc(100vh);
}
</style>
