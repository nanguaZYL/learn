# vite vue2

先用 yarn create vite 创建 vite 项目  // npm可用npm init vite@latest


# 跟vue-cli不同的是它创建的index.html不在public目录下而是在项目根目录下而且需要<script type="module" src="/src/main.js"></script>引入js
# 在开发期间 Vite 是一个服务器，而 index.html 是该 Vite 项目的入口文件。
# Vite 将 index.html 视为源码和模块图的一部分。Vite 解析 <script type="module" src="..."> ，这个标签指向你的 JavaScript 源码。甚至内联引入 JavaScript 的 <script type="module"> 和引用 CSS 的 <link href> 也能利用 Vite 特有的功能被解析。另外，index.html 中的 URL 将被自动转换，因此不再需要 %PUBLIC_URL% 占位符了。
