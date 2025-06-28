<template>
  <div :style="{ width: width, height: height }" ref="mapContainerRef"></div>
</template>

<script setup>
import { useData } from 'vitepress'
const { isDark } = useData();

import { onMounted, onUnmounted, watch, computed, ref } from 'vue';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const mapContainerRef = ref(null);

const props = defineProps({
  center: {
    type: Array,
    default: () => [0.45, 51.47],
    validator: (value) => value.length === 2
  },
  zoom: {
    type: Number,
    default: 11
  },
  bearing: {
    type: Number,
    default: 0
  },
  pitch: {
    type: Number,
    default: 0
  },
  width: {
    type: String,
    default: '100%'
  },
  height: {
    type: String,
    default: '100vh'
  },
  styleUrl: {
    type: String,
    default: null
  },
});

const emit = defineEmits(['map-loaded']);

const map = ref(null);
const isMapLoaded = ref(false);

// 默认样式
const lightStyle = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';
const darkStyle = 'https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json';
const defaultStyle = 'https://demotiles.maplibre.org/style.json';

const mapStyle = computed(() => {
  if (props.styleUrl) return props.styleUrl;
  return isDark.value ? darkStyle : lightStyle;
});

// 初始化地图
const initMap = () => {
  map.value = new maplibregl.Map({
    container: mapContainerRef.value,
    style: mapStyle.value,
    center: props.center,
    zoom: props.zoom,
    bearing: props.bearing,
    pitch: props.pitch,
    preserveDrawingBuffer: props.preserveDrawingBuffer,
    antialias: true, // 更好的抗锯齿效果，适合与deck.gl结合
    attributionControl: false // 禁用右下角的属性控件
  });

  // 添加常用事件监听
  map.value.on('load', () => {
    isMapLoaded.value = true;
    emit('map-loaded', map.value);
  });
};


onMounted(
  () => {
    initMap();
  },
);

onUnmounted(() => {
  if (map.value) {
    // 然后移除地图
    map.value.remove();
    map.value = null;
  }
});

// 暴露map实例和方法给父组件
defineExpose({
  map,
  isMapLoaded,
  flyTo: (options) => {
    if (isMapLoaded.value) {
      map.value.flyTo(options);
    }
  },
  fitBounds: (bounds, options) => {
    if (isMapLoaded.value) {
      map.value.fitBounds(bounds, options);
    }
  },
  setCenter: (center) => {
    if (isMapLoaded.value) {
      map.value.flyTo({ center });
    }
  },
  setZoom: (zoom) => {
    if (isMapLoaded.value) {
      map.value.flyTo({ zoom });
    }
  }
});
</script>

<style scoped>
#map {
  width: 100%;
  height: 100%;
  border: 1px solid var(--vp-c-border);
  position: relative;
}
</style>