<template>
  <div class="app-container">
    <!-- Scrollama Section -->
    <div class="scroll-section" ref="scrollSection">
      <!-- header -->
      <HeaderComponent />

      <div class="scroll-container">
        <!-- Sticky Graphic -->
        <div class="sticky-graphic">
          <MapComponent 
            ref="mapRef" 
            :center="viewState.center" 
            :zoom="viewState.zoom"
            :pitch="viewState.pitch" 
            @map-loaded="onMapLoaded" 
          />
        </div>
        
        <!-- Scroll Steps -->
        <ScrollSteps :steps="steps" ref="scrollStepsRef" />
      </div>

      <!-- footer -->
      <FooterComponent />

      <!-- 返回顶部按钮 -->
      <button 
        class="back-to-top" 
        :class="{ 'show': showBackToTop }"
        @click="scrollToTop"
        aria-label="返回顶部"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 15l-6-6-6 6"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { withBase } from 'vitepress';

// 组件引入
import HeaderComponent from './header.vue';
import FooterComponent from './footer.vue';
import MapComponent from '@/components/MapComponent.vue';
import ScrollSteps from './ScrollSteps.vue';

// 工具函数和数据
import { initScrollama } from './scrollUtils.js';
import { onMapLoaded as onMapLoadedUtil } from './mapUtils.js';
import { createHexagonLayer } from './layers.js';
import { steps } from './steps.js';

import url from '../../../data/points2024.json';
import url2 from '../../../data/points2022.json';


console.log('Data URL:', url);

// 地图状态
const mapRef = ref(null);
const viewState = {
  center: [0, 50], 
  zoom: 2,
  pitch: 0
};

let deckOverlay = null;
let deckOverlayCleanup = null;
const scrollStepsRef = ref(null);
const scrollSection = ref(null);
let scroller;

// 返回顶部功能
const showBackToTop = ref(false);

const checkScroll = () => {
  showBackToTop.value = scrollSection.value.scrollTop > 300;
};

const scrollToTop = () => {
  scrollSection.value.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

function setDeckOverlay(instance) {
  deckOverlay = instance;
}

function setDeckOverlayCleanup(cleanup) {
  deckOverlayCleanup = cleanup;
}

function onMapLoaded(map) {
  onMapLoadedUtil(map, setDeckOverlay, setDeckOverlayCleanup);
  if (deckOverlay) {
    deckOverlay.setProps({
      layers: createHexagonLayer(url)
    });
  } else {
    console.warn('Deck overlay is not initialized');
  }
}

function handleStepEnter({ element }) {
  if (element) {
    const stepId = element.dataset.step;
    const step = steps.find(s => s.id === stepId);
    if (step?.mapConfig && mapRef.value) {
      mapRef.value.flyTo({
        center: step.mapConfig.center,
        zoom: step.mapConfig.zoom,
        pitch: step.mapConfig.pitch || 0,
        duration: 3000
      });

      if (deckOverlay) {
        deckOverlay.setProps({
          layers: createHexagonLayer(step.url || url)
        });
      } else {
        console.warn('Deck overlay is not initialized');
      }
    }
  }
}

// 生命周期钩子
onMounted(() => {
  // 初始化滚动监听
  scrollSection.value.addEventListener('scroll', checkScroll);
  
  // 初始化Scrollama
  if (scrollStepsRef.value?.stepElements) {
    scroller = initScrollama(scrollStepsRef.value.stepElements, handleStepEnter);
  }
});

onUnmounted(() => {
  // 清理事件监听
  scrollSection.value?.removeEventListener('scroll', checkScroll);
  
  // 销毁Scrollama实例
  try {
    scroller?.destroy();
    if (deckOverlayCleanup) {
      deckOverlayCleanup();
    }
  } catch (error) {
    console.error('Cleanup error:', error);
  }
});
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: row;
  height: 100vh;

}

.scroll-section {
  flex: 1;
  overflow-y: auto;
  position: relative;
  scroll-behavior: smooth;
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