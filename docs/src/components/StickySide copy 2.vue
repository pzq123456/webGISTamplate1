<!-- App.vue -->
<template>
  <div class="app-container">
    <!-- Map Section -->
    <div class="map-section">
      <h2>Interactive Map</h2>
      <div class="map-controls">
        <button @click="flyToLocation('usa')">Fly to USA</button>
        <button @click="flyToLocation('china')">Fly to China</button>
        <button @click="flyToLocation('europe')">Fly to Europe</button>
        <button @click="updateLayers">Update Layers</button>
      </div>
      <MapComponent
        ref="mapRef"
        :center="viewState.center"
        :zoom="viewState.zoom"
        @map-loaded="onMapLoaded"
      />
    </div>

    <!-- Scrollama Section -->
    <div class="scroll-section">
      <div class="intro-section">
        <h2>Scroll Storytelling</h2>
        <p>Scroll to explore different locations on the map</p>
        <p class="hint">↓ Scroll down to continue ↓</p>
      </div>

      <div class="scroll-container" ref="scrollContainer">
        <!-- Sticky Graphic -->
        <div class="sticky-graphic" :style="graphicStyle">
          <div class="graphic-content">
            <h3>Current Step:</h3>
            <div class="step-number">{{ currentStep || '0' }}</div>
            <div class="step-description">{{ stepDescriptions[currentStep] || 'Start scrolling' }}</div>
          </div>
        </div>

        <!-- Scroll Steps -->
        <div class="scroll-steps">
          <div
            v-for="step in steps"
            :key="step.id"
            :data-step="step.id"
            class="step"
            ref="stepElements"
          >
            <h3>{{ step.title }}</h3>
            <p>{{ step.content }}</p>
          </div>
        </div>
      </div>

      <div class="outro-section">
        <h2>Demo Complete!</h2>
        <p>You've completed all scroll steps</p>
        <p v-if="currentStep" class="completion">Completed {{ currentStep }} / {{ steps.length }} steps</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';
import scrollama from 'scrollama';
import { ScatterplotLayer } from '@deck.gl/layers';
import MapComponent from '@/components/map.vue';
import { useDeckOverlay } from '@/composables/useDeckOverlay';

// Map-related state
const mapRef = ref(null);
const viewState = ref({
  center: [0.45, 51.47], // Default: London
  zoom: 11
});
let deckOverlay = null;

// Scrollama-related state
const scrollContainer = ref(null);
const stepElements = ref([]);
const currentStep = ref(null);
const scroller = scrollama();

const steps = ref([
  {
    id: '1',
    title: 'Step 1: USA',
    content: 'Explore the United States on the map.',
    mapConfig: { center: [-100.0, 38.0], zoom: 3.5, point: [-100.0, 38.0], color: [255, 0, 0, 200] }
  },
  {
    id: '2',
    title: 'Step 2: China',
    content: 'Now view China on the map.',
    mapConfig: { center: [104.0, 35.0], zoom: 4, point: [104.0, 35.0], color: [0, 255, 0, 200] }
  },
  {
    id: '3',
    title: 'Step 3: Europe',
    content: 'Discover Europe on the map.',
    mapConfig: { center: [10.0, 50.0], zoom: 5, point: [10.0, 50.0], color: [0, 0, 255, 200] }
  },
]);

const stepDescriptions = ref({
  '1': 'United States',
  '2': 'China',
  '3': 'Europe'
});

// Computed property for sticky graphic style
const graphicStyle = computed(() => ({
  backgroundColor: getStepColor(currentStep.value),
  opacity: currentStep.value ? 1 : 0.8,
  transition: 'background-color 0.3s ease, opacity 0.3s ease'
}));

// Get step-specific color
const getStepColor = (step) => {
  const colors = {
    '1': '#ffddc1',
    '2': '#ffccb3',
    '3': '#ffb3a6'
  };
  return colors[step] || '#f0f0f0';
};

// Map Functions
function onMapLoaded(map) {
  try {
    const { instance } = useDeckOverlay(map, {
      interleaved: true,
      layers: [
        new ScatterplotLayer({
          id: 'points',
          data: [{ position: viewState.value.center }],
          getPosition: d => d.position,
          getRadius: 1000,
          getFillColor: [255, 0, 0, 200]
        })
      ]
    });
    deckOverlay = instance;
    mapRef.value.deckOverlay = instance;
  } catch (error) {
    console.error('Map initialization error:', error);
  }
}

function flyToLocation(location) {
  if (!mapRef.value) {
    console.error('Map reference not available');
    return;
  }
  const configs = {
    usa: { center: [-100.0, 38.0], zoom: 3.5, point: [-100.0, 38.0], color: [255, 0, 0, 200] },
    china: { center: [104.0, 35.0], zoom: 4, point: [104.0, 35.0], color: [0, 255, 0, 200] },
    europe: { center: [10.0, 50.0], zoom: 5, point: [10.0, 50.0], color: [0, 0, 255, 200] }
  };
  const config = configs[location];
  if (!config) return;

  mapRef.value.flyTo({
    center: config.center,
    zoom: config.zoom,
    pitch: 30,
    duration: 2000
  });
  updateMapLayer(config.point, config.color);
}

function updateMapLayer(point, color) {
  if (!deckOverlay) {
    console.error('Deck overlay not initialized');
    return;
  }
  deckOverlay.setProps({
    layers: [
      new ScatterplotLayer({
        id: 'points',
        data: [{ position: point }],
        getPosition: d => d.position,
        getRadius: 1000,
        getFillColor: color
      })
    ]
  });
}

function updateLayers() {
  const current = steps.value.find(step => step.id === currentStep.value);
  if (current?.mapConfig) {
    updateMapLayer(current.mapConfig.point, current.mapConfig.color);
  }
}

// Scrollama Functions
const handleResize = () => {
  try {
    scroller.resize();
  } catch (error) {
    console.error('Resize error:', error);
  }
};

const handleStepEnter = ({ element }) => {
  try {
    if (element && element.dataset.step) {
      currentStep.value = element.dataset.step;
      const step = steps.value.find(s => s.id === element.dataset.step);
      if (step?.mapConfig && mapRef.value) {
        mapRef.value.flyTo({
          center: step.mapConfig.center,
          zoom: step.mapConfig.zoom,
          pitch: 30,
          duration: 2000
        });
        updateMapLayer(step.mapConfig.point, step.mapConfig.color);
      }
    }
  } catch (error) {
    console.error('Step enter error:', error);
  }
};

const handleStepProgress = ({ progress, element }) => {
  try {
    element.style.opacity = progress > 0.5 ? 1 : progress * 2;
  } catch (error) {
    console.error('Step progress error:', error);
  }
};

const initScrollama = async () => {
  try {
    await nextTick();
    if (!scrollContainer.value || !stepElements.value.length) {
      console.error('Scroll container or step elements not found');
      return;
    }

    scroller
      .setup({
        container: scrollContainer.value,
        graphic: scrollContainer.value.querySelector('.sticky-graphic'),
        text: scrollContainer.value.querySelector('.scroll-steps'),
        step: stepElements.value,
        offset: 0.5,
        progress: true,
        threshold: 4,
        debug: false
      })
      .onStepEnter(handleStepEnter)
      .onStepProgress(handleStepProgress);

    handleResize();
  } catch (error) {
    console.error('Scrollama initialization error:', error);
  }
};

// Lifecycle Hooks
onMounted(() => {
  initScrollama();
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  try {
    scroller.destroy();
    if (deckOverlay) deckOverlay.cleanup();
    window.removeEventListener('resize', handleResize);
  } catch (error) {
    console.error('Cleanup error:', error);
  }
});
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: row;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: #333;
  width: 100%;
  height: 100vh;
}

.map-section {
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.map-controls {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.map-controls button {
  padding: 10px 20px;
  background-color: #2c3e50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.map-controls button:hover {
  background-color: #34495e;
}

.scroll-section {
  flex: 1;
  overflow-y: auto;
}

.intro-section,
.outro-section {
  padding: 100px 20px;
  text-align: center;
  background-color: #f9f9f9;
}

.hint {
  color: #666;
  font-style: italic;
  margin-top: 30px;
}

.scroll-container {
  display: flex;
  min-height: 100vh;
}

.sticky-graphic {
  flex: 1;
  position: sticky;
  top: 0;
  height: 100vh;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.graphic-content {
  text-align: center;
  padding: 20px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.step-number {
  font-size: 5rem;
  font-weight: bold;
  margin: 20px 0;
  color: #2c3e50;
  transition: transform 0.3s ease;
}

.step-number:hover {
  transform: scale(1.1);
}

.scroll-steps {
  flex: 1;
}

.step {
  min-height: 80vh;
  margin: 10px;
  padding: 40px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: opacity 0.3s ease;
}

.step h3 {
  font-size: 2rem;
  margin-bottom: 20px;
  color: #2c3e50;
}

.step p {
  font-size: 1.2rem;
  line-height: 1.6;
}

.completion {
  font-weight: bold;
  color: #2c3e50;
  margin-top: 20px;
}
</style>