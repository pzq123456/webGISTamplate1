<template>

    <MapComponent ref="mapRef" :center="[0, 50]" :zoom="2" :pitch="0" @map-loaded="handleMapLoaded" :height="'50vh'" :width="'50vw'" />
    <button @click="flyToUSA">Fly to USA</button>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import pkg from 'lodash';
const { throttle } = pkg;

import MapComponent from '@/components/MapComponent.vue';

import { createHexagonLayer } from './layers.js';

// import url from '../../../data/points2024.json';
import { useDeckOverlay } from '@/composables/useDeckOverlay';

// 地图状态
const mapRef = ref(null);

let deckOverlay = null;

// fly to USA
const throttledFlyTo = throttle((mapRef, config) => {
  mapRef.value?.flyTo(config);
}, 1000);

function flyToUSA () {
  throttledFlyTo(mapRef, {
    center: [-98.5795, 39.8283], // 美国中心点
    zoom: 4,
    pitch: 0,
    duration: 2000
  });
}

function handleMapLoaded (map) {
  deckOverlay = useDeckOverlay(map);

  deckOverlay.setProps({
      // layers: createHexagonLayer(url)
    });
}

</script>