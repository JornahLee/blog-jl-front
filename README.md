# blog-jl-front

> A Vue.js project
> blog-jl 的前端部分

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/)
and [docs for vue-loader](http://vuejs.github.io/vue-loader).

学习到的的知识点 commonJs 模块化 ES6 模块化

ES6 html中导入 js 的 type=modle 而非text/javascript

vue 基本 组件 编写 注册 使用 父子组件传值 prop 兄弟组件间传值 eventBus

封装组件 slot 插槽占位符 route

布局基础知识 浮动 清除浮动 定位 ： 绝对 相对 fixed

路由 使用重定向完成 默认view
路由 使用prop传参
路由参数变化时，动画不生效， 使用key 进行标识


在我的项目中 transition 使用fade 不生效， 没有透明度变化的效果。 不晓得为啥，但是使用translateX 这种平移效果可以
后来解决了： 哈哈哈 改变名字，<transition name='fade'> 中的fade 改为其他的，如test-fade就可以生效，哈哈哈 笑死

```css
/*这个版本可以*/
.slide-enter-active {
  transition: all .5s, opacity .5s;
}

.slide-enter {
  /*transform: translateY(-20px);*/
  transform: translateY(-20px);
  opacity: 0;
}
```


性能优化
- https://blog.csdn.net/qq493820798/article/details/104963877
- 路由懒加载
- npm run build --report BundleAnalyzerPlugin分析包体积 


注意踩坑
watch与methods的定义顺序很重要， 不然会导致watch不生效
- vue-markdown 使用 prism代码高亮，
  如果代码数据是从api获取的， 一定要延时之后再调用 `Prism.highlightAll()`， 否则vue还没渲染出来元素，Prism就会失效
  
prismjs 依赖："prismjs": "^1.25.0","babel-plugin-prismjs": "^2.1.0",

箭头函数没有this指向， 所以在箭头函数中 使用this 就可以指向 外部的vue

milkdown 这款编辑器，很好用，和typora很像


vue 自定义指令， 涉及vnode， vnode.context 在未实际渲染时，操作vue的data 调用methods等

todo:
搜索结果栏，记住滚动条位置


高亮某个div的实现做法， 类似弹窗
- 使用一个遮罩(一个全屏div)，放在 高亮div的下一层

那其实都用不上自定义指令


移除不必要组件，提升首次加载速度
//    "vue-aplayer": "^1.6.1",
//    "vue-live2d": "^1.2.4",
//    "hls.js": "^1.0.10",
