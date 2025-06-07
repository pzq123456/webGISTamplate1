# WebGIS 启动模板

> - 本质上是一个 WebGIS 的前端模板，提供了一个基础的框架，方便快速开发 WebGIS 应用。
> - 但是存在两种模式，
>  - 一种是综合网站模式，提供多个独立的页面来呈现不同的内容
>  - 另一种是单页面应用模式，即将体量较小的论文内容呈现在一个（滚动、点选）交互式的的页面中。类似于产品介绍页面，如苹果官网的产品介绍页面等。

## 依赖

1. 数据准备阶段主要依赖 Python 进行数据预处理
2. 前端主要使用 Vue.js, vitepress 进行开发，底图选择 Maplibre，复杂图层选择 deck.gl

https://vue-scrollama.vercel.app/#/sticky-graphic-2