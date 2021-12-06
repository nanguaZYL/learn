# vite vue2
2021-11-30
先用 yarn create vite 创建 vite 项目 // npm 可用 npm init vite@latest

# 与 vue-cli 的不同
2021-12-2
跟 vue-cli 不同的是它创建的 index.html 不在 public 目录下而是在项目根目录下而且需要<script type="module" src="/src/main.js"></script>引入 js
在开发期间 Vite 是一个服务器，而 index.html 是该 Vite 项目的入口文件。
Vite 将 index.html 视为源码和模块图的一部分。Vite 解析 <script type="module" src="..."> ，这个标签指向你的 JavaScript 源码。甚至内联引入 JavaScript 的 <script type="module"> 和引用 CSS 的 <link href> 也能利用 Vite 特有的功能被解析。另外，index.html 中的 URL 将被自动转换，因此不再需要 %PUBLIC_URL% 占位符了。

同时vue有vue.config.js vite则是vite.config.js 两者很相似

# vite默认vue是使用的vue3 因此想使用vue2还需要修改某些地方
2021-12-3
首先将package.json里面的vue 3.x改成2.x的版本  同时安装vite-plugin-vue2和vue-template-compiler插件 然后 yarn(或者npm下载依赖) 
因为vite创建的是vue3的项目 所以需要把src里面的vue3的语法全部改成vue2的

# 配置@路径
值得注意的是vite下的vue2不支持@的路径 比如写路由的时候import '@/views/xxx.vue'这种 因此如果是已经写好的vue2迁移到vite的话 需要在vite.config.js里面配置
import path from 'path' //先引入path
resolve：{
  //alias是别名
  alias:{
     '@': path.resolve(__dirname, './src'),
     '~@': path.resolve(__dirname,'./src'),
  }
}

