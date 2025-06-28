<template>
  <div class="app-container">
    <!-- Scrollama Section -->
    <div class="scroll-section" ref="scrollSection">
      <div class="scroll-container">
        <div class="sticky-graphic">
          <MapComponent ref="mapRef" :center="viewState.center" :zoom="viewState.zoom" :pitch="viewState.pitch"
            @map-loaded="onMapLoaded" />
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

import url from '../../../data/points2024.json';

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
      // throttle the flyTo call to avoid performance issues
      throttle(() => {
        mapRef.value.flyTo({
          center: step.mapConfig.center,
          zoom: step.mapConfig.zoom,
          pitch: step.mapConfig.pitch || 0,
          duration: 3000
        });
      }, 1000)();
    }
  }
}

// 修改生命周期钩子，确保只在客户端执行
onMounted(() => {
  if (typeof window !== 'undefined') { // 确保只在客户端执行
    if (scrollStepsRef.value?.stepElements) {
      scroller = initScrollama(scrollStepsRef.value.stepElements, handleStepEnter);
    }
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
  height: 100vh; /* 确保高度固定 */
  width: 100vw;  /* 确保宽度固定 */
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