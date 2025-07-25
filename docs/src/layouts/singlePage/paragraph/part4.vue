<template>
    <section class="paper-section">
        <h2 class="section-subtitle">Access EVCSs through Road Network</h2>

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
    Compared with cities in China and Europe, US cities are more likely to deploy EVCSs in areas with denser road networks, implying greater EVCS accessibility through road networks.
`)
    const imageAlt = "Fig. 5"
const caption = 
`
Fig. 4 | City-level comparison of road network density and the relative development level of the road network around EVCSs across three study areas. Higher index values suggest a tendency for EVCS deployment in areas with denser road networks. Note that compared to the index of road network density, the index of the relative development level further controls the influence of a city's overall road network density in cross-city comparisons.`

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
    font-size: 1.5rem;
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