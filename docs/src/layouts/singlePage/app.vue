<!-- App.vue -->
<template>
    <div class="app-container">
        <!-- Scrollama Section -->
        <div class="scroll-section">
            <!-- header -->
            <HeaderComponent />

            <div class="scroll-container">
                <!-- Sticky Graphic -->
                <div class="sticky-graphic" >
                    <MapComponent ref="mapRef" :center="viewState.center" :zoom="viewState.zoom"
                        :pitch="viewState.pitch" 
                        @map-loaded="onMapLoaded" />
                </div>
                <!-- Scroll Steps -->
                 <ScrollSteps :steps="steps" ref="scrollStepsRef" />
            </div>

            <!-- footer -->
            <FooterComponent />
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';

import { hexagonLayer } from './layers.js';

import HeaderComponent from './header.vue';
import FooterComponent from './footer.vue';

import MapComponent from '@/components/MapComponent.vue';

import { initScrollama } from './scrollUtils.js'
import { onMapLoaded as onMapLoadedUtil } from './mapUtils.js';

import ScrollSteps from './ScrollSteps.vue';
import { steps } from './steps.js'; // Import the steps data

// Map-related state
const mapRef = ref(null);
const viewState = {
    center: [0, 0], // Default: London
    zoom: 2,
    pitch: 30
};

let deckOverlay = null;
let deckOverlayCleanup = null;

function setDeckOverlay(instance) {
    deckOverlay = instance;
}
function setDeckOverlayCleanup(cleanup) {
    deckOverlayCleanup = cleanup;
}

// Scrollama-related state
const scrollStepsRef = ref(null);
let scroller;

function onMapLoaded(map) {
    onMapLoadedUtil(map, setDeckOverlay, setDeckOverlayCleanup);
    // Initialize hexagon layer
    if (deckOverlay) {
        deckOverlay.setProps({
            layers: [hexagonLayer]
        });
    } else {
        console.warn('Deck overlay is not initialized');
    }
}

function handleStepEnter({ element }) {
    try {
        if (element) {
            const stepId = element.dataset.step;
            const step = steps.find(s => s.id === stepId);
            if (step?.mapConfig && mapRef.value) {
                mapRef.value.flyTo({
                    center: step.mapConfig.center,
                    zoom: step.mapConfig.zoom,
                    pitch: step.mapConfig.pitch || 0,
                    duration: 2000
                });
            } else {
                // 默认 case 捕捉
                console.warn(`No mapConfig found for stepId: ${stepId}`);
            }
        }
    } catch (error) {
        console.error('Step enter error:', error);
    }
}

// Lifecycle Hooks
onMounted(() => {
  scroller = initScrollama(scrollStepsRef.value.stepElements, handleStepEnter);
});

onUnmounted(() => {
    try {
        scroller.destroy();
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
    width: 100%;
    height: 100vh;
}

.scroll-section {
    flex: 1;
    overflow-y: auto;
}

.scroll-container {
    display: flex;
}

.sticky-graphic {
    flex: 1;
    position: sticky;
    top: 0;
    height: 100vh;
    display: flex;
}
</style>