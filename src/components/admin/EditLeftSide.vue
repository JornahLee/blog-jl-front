<template>
  <div class="edit-left-side">
    <div class="item">
      <div class="label">分类:</div>
      <div class="input-box">
        <a-select mode="tags" style="width: 100%" placeholder="文章分类" @change="handleChange">
          <a-select-option v-for="i in 25" :key="(i + 9).toString(36) + i">
            {{ (i + 9).toString(36) + i }}
          </a-select-option>
        </a-select>
      </div>
    </div>
    <div class="item">
      <div class="label">标签:</div>
      <div class="input-box">
        <a-select mode="tags" style="width: 100%" placeholder="文章标签" @change="handleChange">
          <a-select-option v-for="i in 25" :key="(i + 9).toString(36) + i">
            {{ (i + 9).toString(36) + i }}
          </a-select-option>
        </a-select>
      </div>
    </div>
    <div class="item">
      <div class="label">状态:</div>
      <div class="input-box">
        <a-select
            label-in-value
            :default-value="{ key: 'lucy' }"
            style="width: 100%"
            @change="handleChange"
        >
          <a-select-option value="jack">
            Jack (100)
          </a-select-option>
          <a-select-option value="lucy">
            Lucy (101)
          </a-select-option>
        </a-select>
      </div>
    </div>
    <div class="item">
      <div class="label">创建时间:</div>
      <div class="show-value">
        xxx
      </div>
    </div>
    <div class="item">
      <div class="label">修改时间:</div>
      <div class="show-value">
        xxx
      </div>
    </div>
    <div class="item">
      <div class="label" hidden="true"></div>
      <div class="input-box">
        <a-button type="primary" :loading="loading" @mouseenter="enterLoading">
          保存
        </a-button>
      </div>

    </div>

  </div>

</template>
<script>
export default {
  methods: {
    handleChange(value) {
      console.log(`selected ${value}`);
    },
  },
};
</script>
<style>
.edit-left-side {
  margin-top: 56px;
  margin-left: 30%;
  /*background-color: yellow;*/
  /*width: 100%;*/
  /*height: 100%;*/
}


.item {
  margin: 10px;
  /*background-color: #cb0909;*/
  /*width: 100%;*/
  /*height: 100px;*/
  /*padding: 20px;*/
  height: 50px;
}

.label {
  padding-top: 15px;
  float: left;
  width: 30%;
  text-align: right;
  /*margin-right: 10px;*/
}

.input-box {
  padding-top: 10px;
  float: right;
  width: 60%;
}

.show-value {
  padding-top: 15px;
  float: right;
  width: 60%;
}
</style>
