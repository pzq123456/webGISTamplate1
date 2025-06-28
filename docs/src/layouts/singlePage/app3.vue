<template>
  <div class="app-container">
    <div class="scroll-section" ref="scrollSection">
      <div class="scroll-container">
        <div class="sticky-graphic">
          <MapComponent ref="mapRef" :center="[0, 50]" :zoom="2" :pitch="0" @map-loaded="onMapLoaded" />
        </div>
        <ScrollSteps :steps="steps" ref="scrollStepsRef" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import pkg from 'lodash';
const { throttle } = pkg;

import MapComponent from '@/components/MapComponent.vue';
import ScrollSteps from './ScrollSteps.vue';

// 工具函数和数据
import { initScrollama } from './scrollUtils.js';
import { onMapLoaded as onMapLoadedUtil } from './mapUtils.js';
import { createHexagonLayer } from './layers.js';
import { steps } from './steps.js';

// import url from '../../../data/points2024.json';

// 地图状态
const mapRef = ref(null);

let deckOverlay = null;
let deckOverlayCleanup = null;
const scrollStepsRef = ref(null);
const scrollSection = ref(null);

function setDeckOverlay(instance) {
  deckOverlay = instance;
}

function setDeckOverlayCleanup(cleanup) {
  deckOverlayCleanup = cleanup;
}

function onMapLoaded(map) {
  onMapLoadedUtil(map, setDeckOverlay, setDeckOverlayCleanup);
  if (deckOverlay) {
    // deckOverlay.setProps({
    //   layers: createHexagonLayer(url)
    // });
  } else {
    console.warn('Deck overlay is not initialized');
  }
}

// 在 setup 外部定义
const throttledFlyTo = throttle((mapRef, config) => {
  mapRef.value?.flyTo(config);
}, 1000);

function handleStepEnter({ element }) {
  if (element) {
    const stepId = element.dataset.step;
    const step = steps.find(s => s.id === stepId);
    if (step?.mapConfig && mapRef.value) {
      throttledFlyTo(mapRef, { ...step.mapConfig, duration: 2000 });
    }
  }
}

// 修改生命周期钩子，确保只在客户端执行
onMounted(() => {
  if (typeof window !== 'undefined') { // 确保只在客户端执行
    if (scrollStepsRef.value?.stepElements) {
      initScrollama(scrollStepsRef.value.stepElements, handleStepEnter);
    }
  }
});

onUnmounted(() => {
  // 清理事件监听
  scrollSection.value?.removeEventListener('scroll', checkScroll);

  // 销毁Scrollama实例
  try {
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
</style>