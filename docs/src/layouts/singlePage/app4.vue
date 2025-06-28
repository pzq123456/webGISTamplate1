<template>

      <button @click="toUSA">
      Fly to USA
    </button>
    
  <div class="app-container">
    <MapComponent ref="mapRef" :center="[0, 50]" :zoom="2" :pitch="0" @map-loaded="onMapLoaded" />
  </div>


</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import pkg from 'lodash';
const { throttle } = pkg;

import MapComponent from '@/components/MapComponent.vue';

// 工具函数和数据
import { initScrollama } from './scrollUtils.js';
import { onMapLoaded as onMapLoadedUtil } from './mapUtils.js';
import { createHexagonLayer } from './layers.js';
import { steps } from './steps.js';

import url from '../../../data/points2024.json';

// 地图状态
const mapRef = ref(null);

let deckOverlay = null;
let deckOverlayCleanup = null;
const scrollStepsRef = ref(null);
const scrollSection = ref(null);

// buttton to us
const throttledFlyTo = throttle((mapRef, config) => {
  mapRef.value?.flyTo(config);
}, 1000);

function toUSA() {
  throttledFlyTo(mapRef, {
    center: [-98.5795, 39.8283], // USA center
    zoom: 4,
    pitch: 0,
    duration: 2000
  });
}

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

onUnmounted(() => {
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
  width: 50%;
}
</style>