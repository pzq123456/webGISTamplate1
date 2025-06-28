<template>
  <div class="app-container">
    <!-- Scrollama Section -->
    <div class="scroll-section" ref="scrollSection">
      <!-- header -->
      <HeaderComponent />

      <part1 />

      <App3 />

      <part2 />

      <part3 />

      <part4 />

      <!-- Acknowledgement -->
      <Acknowledgement />

      <!-- footer -->
      <FooterComponent />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';


// 组件引入
import HeaderComponent from './header.vue';
import FooterComponent from './footer.vue';
import MapComponent from '@/components/MapComponent.vue';
import ScrollSteps from './ScrollSteps.vue';

// acknowledgement

import Acknowledgement from './acknowledgement.vue';

import part1 from './part1.vue';
import part2 from './part2.vue';
import part3 from './part3.vue';
import part4 from './part4.vue';

import App3 from './app3.vue';

</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: row;
  height: 100vh;
}

/* 修改滚动容器样式 */
.scroll-section {
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch; /* 添加iOS平滑滚动 */
  position: relative;
  height: 100vh; /* 确保高度固定 */
  width: 100vw;  /* 确保宽度固定 */
  overscroll-behavior: contain; /* 防止滚动链 */
}

/* 添加移动端视口修正 */
@media (max-width: 768px) {
  html, body {
    position: fixed;
    overflow: hidden;
    width: 100%;
    height: 100%;
  }
  
  .app-container {
    height: 100%;
    overflow: hidden;
  }
}

.scroll-container {
  display: flex;
  position: relative;
}

.sticky-graphic {
  flex: 1;
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
}

/* 返回顶部按钮样式 */
.back-to-top {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid #3aa876;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 1000;
  padding: 0;
}

.back-to-top.show {
  opacity: 1;
  visibility: visible;
}

.back-to-top:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  background-color: #f0f0f018;
}

.back-to-top svg {
  width: 24px;
  height: 24px;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .back-to-top {
    width: 40px;
    height: 40px;
    bottom: 20px;
    right: 20px;
  }

  .back-to-top svg {
    width: 20px;
    height: 20px;
  }
}
</style>