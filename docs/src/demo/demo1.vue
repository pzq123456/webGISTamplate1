<template>
  <div>
    <button @click="flyToUSA">Fly to USA</button>
    <button @click="updateLayers">Update Layers</button>
    
    <MapComponent
      ref="mapRef"
      :center="viewState.center"
      :zoom="viewState.zoom"
      @map-loaded="onMapLoaded"
    />
  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue';
import { ScatterplotLayer } from '@deck.gl/layers';
import { useDeckOverlay } from '@/composables/useDeckOverlay';
import MapComponent from '@/components/map.vue';

const mapRef = ref(null);
const viewState = ref({
  center: [0.45, 51.47],
  zoom: 11
});

let deckOverlay = null;

function onMapLoaded(map) {
  // 初始化 Deck.gl 叠加层
  const { instance } = useDeckOverlay(map, {
    interleaved: true,
    layers: [
      new ScatterplotLayer({
        id: 'points',
        data: [{ position: [0.45, 51.47] }],
        getPosition: d => d.position,
        getRadius: 1000,
        getFillColor: [255, 0, 0, 200]
      })
    ]
  });
  
  // 保存引用以便后续更新
  deckOverlay = instance;
  mapRef.value.deckOverlay = instance;
}

function flyToUSA() {
  // 方法2: 直接调用暴露的方法
  mapRef.value.flyTo({
    center: [-100.0, 38.0],
    zoom: 3.5,
    pitch: 30,
    duration: 2000
  });
}

function updateLayers() {
  if (deckOverlay) {
    deckOverlay.setProps({
      layers: [
        new ScatterplotLayer({
          id: 'points',
          data: [{ position: [-100.0, 38.0] }],
          getPosition: d => d.position,
          getRadius: 1000,
          getFillColor: [0, 255, 0, 200]
        })
      ]
    });
  }
}

onUnmounted(() => {
  if (deckOverlay) {
    deckOverlay.cleanup();
  }
});
</script>