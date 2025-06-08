# WebGIS 启动模板

> - 本质上是一个 WebGIS 的前端模板，提供了一个基础的框架，方便快速开发 WebGIS 应用。
> - 但是存在两种模式，
>  - 一种是综合网站模式，提供多个独立的页面来呈现不同的内容
>  - 另一种是单页面应用模式，即将体量较小的论文内容呈现在一个（滚动、点选）交互式的的页面中。类似于产品介绍页面，如苹果官网的产品介绍页面等。

## 依赖

1. 数据准备阶段主要依赖 Python 进行数据预处理
2. 前端主要使用 Vue.js, vitepress 进行开发，底图选择 Maplibre，复杂图层选择 deck.gl

## map 组件的一些说明

> 1. https://deck.gl/docs/developer-guide/base-maps/using-with-maplibre

根据 deck.gl 的文档，maplibre-gl-js 作为底图时，我们无法通过deckgl反向控制底图的视角，也就是说 viewState 失效，无法通过 deck.gl 实例的 setProps 方法来控制地图的视角。具体来说就是以下写法**无效**
```js
deckgl.setProps({
  viewState: { // new viewState
    longitude: 120.0,
    latitude: 30.0,
    zoom: 10,
    pitch: 0,
    bearing: 0
  }
})
```

- 这里我使用了 vue 的响应式数据来控制视角的变化，但是这种做法存在问题。当一个视角变换既有缩放又有平移时，底图会首先进行缩放，然后再进行平移，也就意味着用户可能需要点击两次才会达到预期的视角。故不推荐直接借助于响应式数据来控制视角的变化。（除非你自己实现了一套插值算法）*。
- 此外，我还将 maplibre-gl-js 原生的 flyTo 方法进行了封装，该接口可以丝滑地处理视角变换。推荐使用。

https://vue-scrollama.vercel.app/#/sticky-graphic-2