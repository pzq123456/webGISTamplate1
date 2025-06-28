<template>
  <div class="scrollable-map-container">
    <div class="scroll-section" ref="scrollSection">
      <div class="scroll-container">
        <div class="sticky-graphic">
          <MapComponent 
            ref="mapRef" 
            :center="initialCenter" 
            :zoom="initialZoom" 
            :pitch="initialPitch" 
            @map-loaded="handleMapLoaded" 
          />
        </div>
        <ScrollSteps 
          :steps="steps" 
          ref="scrollStepsRef" 
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { throttle } from 'lodash';

import MapComponent from '@/components/MapComponent.vue';
import ScrollSteps from './ScrollSteps.vue';
import { initScrollama } from './scrollUtils.js';
import { createHexagonLayer } from './layers.js';
import { useDeckOverlay } from '@/composables/useDeckOverlay';

// 定义 props
const props = defineProps({
  steps: {
    type: Array,
    required: true,
    default: () => []
  },
  initialCenter: {
    type: Array,
    default: () => [0, 50]
  },
  initialZoom: {
    type: Number,
    default: 2
  },
  initialPitch: {
    type: Number,
    default: 0
  },
  dataUrl: {
    type: String,
    required: true
  },
  flyToDuration: {
    type: Number,
    default: 2000
  },
  throttleTime: {
    type: Number,
    default: 1000
  }
});

// 组件引用
const mapRef = ref(null);
const scrollStepsRef = ref(null);
const scrollSection = ref(null);

// DeckOverlay 实例
let deckOverlay = null;

// 处理地图加载
const handleMapLoaded = (map) => {
  deckOverlay = useDeckOverlay(map);
  deckOverlay.setProps({
    layers: createHexagonLayer(props.dataUrl)
  });
};

// 节流飞行函数
const throttledFlyTo = throttle((mapRef, config) => {
  mapRef.value?.flyTo({
    ...config,
    duration: props.flyToDuration
  });
}, props.throttleTime);

// 处理步骤进入
const handleStepEnter = ({ element }) => {
  if (element) {
    const stepId = element.dataset.step;
    const step = props.steps.find(s => s.id === stepId);
    if (step?.mapConfig && mapRef.value) {
      throttledFlyTo(mapRef, step.mapConfig);
    }
  }
};

// 初始化 scrollama
const initScrollInteraction = () => {
  if (scrollStepsRef.value?.stepElements) {
    initScrollama(scrollStepsRef.value.stepElements, handleStepEnter);
  }
};

// 生命周期钩子
onMounted(() => {
  if (typeof window !== 'undefined') {
    initScrollInteraction();
  }
});

// 清理
onUnmounted(() => {
  if (deckOverlay) {
    deckOverlay.finalize();
  }
});
</script>

<style scoped>
.scrollable-map-container {
  display: flex;
  flex-direction: row;
  height: 100vh;
  width: 100%;
}

.scroll-section {
  flex: 1;
  overflow-y: auto;
  position: relative;
}

.scroll-container {
  display: flex;
  position: relative;
  width: 100%;
}

.sticky-graphic {
  flex: 1;
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
}
</style>