<template>
    <section class="paper-section">
        <h2 class="section-subtitle">Access to Public EV Charging Stations (EVCSs) through Road Network</h2>

        <div class="paper-text">
            <p v-html="introText"></p>
        </div>

        <div class="figure-container">
            <Figure 
                :src="imageSrc5" 
                :alt="imageAlt" 
                :caption="caption"
            />
        </div>

    </section>
</template>

<script setup>
import { ref } from 'vue'
import Figure from './figure.vue'

import imageSrc5 from './assets/img5.png'

const introText = ref(`
    Figure 5 analyzes EV charging station (EVCS) accessibility via road networks, comparing density and development levels within 300m, 800m, and 1000m buffers. The US leads in road network density (~14.5 km/km²) and relative development (~3.9 mean, ~2.5 median) near EVCSs, ensuring efficient charger access for car-centric travel. Europe follows (~11.5 km/km² density, ~3.1 mean development), while China lags in density but shows smaller gaps in relative development due to its lower baseline road infrastructure (0.436 km/km² vs. 1.211 in the US and 1.504 in Europe). These differences reflect regional planning priorities—US deployment optimizes long-distance EV travel, whereas China’s strategy faces infrastructure constraints. Among city clusters, the Bay Area (US) and Nordic Five Nations (Europe) exhibit superior road network development near EVCSs, suggesting better charging accessibility. (See Supplementary Materials, Appendix H, for spatial details.)`)
const imageAlt = "Fig. 5"
const caption = 
`
Fig. 5 | Access to EVCSs through Road Network. a, Comparing road network density and the relative development level of road network in the proximity of EVCSs at the city level across three study areas and different buffer radii. Here, the relative development level of road network around EVCSs in a city is characterized by the average ratio of road density around EVCSs to the road density of the city (see Equations (7) - (10) in Methods). b, Comparing road network density and the relative development level of road network around EVCSs at the city level in the representative city clusters across different study areas and buffer distances.
`

</script>

<style scoped>

.section-subtitle {
    font-size: 1.8rem;
    font-weight: 600;
    color: var(--vp-c-text-1);
    margin-bottom: 1.5rem;
}

.paper-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.8rem;
    margin: 2rem 0;
    padding: 1.5rem;
    border-radius: 2px;
    position: relative;
}

.paper-text p {
    max-width: 80%;
    margin-bottom: 1.2rem;
    font-size: 1.2rem;
    line-height: 1.6;
    color: var(--vp-c-text-2);
    margin: 0 auto;
}

.paper-text p:first-child {
    margin-top: 0.5rem;
}

.paper-text p:last-child {
    margin-bottom: 0;
}

.figure-container {
    width: 100%;
    max-width: 80%;
    margin: 0.5rem 0;
}
</style>