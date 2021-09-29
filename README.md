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


在我的项目中 transition 使用fade 不生效， 没有透明度变化的效果。 不晓得为啥，但是使用translateX 这种平移效果可以


性能优化
- https://blog.csdn.net/qq493820798/article/details/104963877
- 路由懒加载
- npm run build --report BundleAnalyzerPlugin分析包体积 


注意踩坑
watch与methods的定义顺序很重要， 不然会导致watch不生效
