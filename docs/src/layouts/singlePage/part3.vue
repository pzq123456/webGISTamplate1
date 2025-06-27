<template>
    <section class="paper-section">
        <h2 class="section-subtitle">Access to Public EV Charging Stations (EVCSs) in Commercial and Administrative Areas</h2>

        <div class="paper-text">
            <p v-html="introText"></p>
        </div>

        <div class="figure-container">
            <Figure 
                :src="imageSrc4" 
                :alt="imageAlt" 
                :caption="caption"
            />
        </div>

    </section>
</template>

<script setup>
import { ref } from 'vue'
import Figure from './figure.vue'

import imageSrc4 from './assets/img4.png'

const introText = ref(`
    EV charging station (EVCS) access in commercial and administrative areas varies significantly across China, the US, and Europe. Analysis using POI Mix—measuring amenity diversity within 300m, 800m, and 1000m buffers—reveals that 70-90% of US and European cities show high POI Mix (above 0.7), indicating greater amenity variety near charging stations. In contrast, most Chinese cities have lower POI Mix (0.5-0.7), suggesting less diverse surroundings near EVCSs, likely due to limited public parking and high deployment costs in dense urban areas. City clusters generally follow regional trends, though some—like Beijing-Tianjin-Hebei and the Bay Area—outperform peers with higher POI Mix, implying better charging access in key commercial zones. (See Supplementary Materials, Appendix G, for spatial details.)
`)
const imageAlt = "Fig. 4"
const caption = 
`
Fig. 4 | Access to EVCSs in Commercial and Administrative Areas. a, Comparing the diversity of amenities (using POI Mix) in the proximity of EVCSs at the city level across three study areas and different buffer radii. We calculated the POI Mix for each city (see Equations (5) and (6) in Methods), and further calculated the percentage of cities falling within various ranges of POI Mix. b, Comparing the diversity of amenities around EVCSs at the city level in representative city clusters across different study areas and buffer distances. 
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