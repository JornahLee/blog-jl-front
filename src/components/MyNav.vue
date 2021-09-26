<template>
  <div>
    <div class="left-inner">
    </div>
    <div class="right-inner">
      <div :style="{ marginTop: '16px' }">
        <a-radio-group default-value="c" size="small">
          <a-radio-button value="c">
            <router-link to="/tags">标签</router-link>
          </a-radio-button>
          <a-radio-button value="c">
            <router-link to="/xxx">分类</router-link>
          </a-radio-button>
        </a-radio-group>
      </div>
    </div>
  </div>
</template>
