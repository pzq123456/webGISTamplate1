<template>
    <section class="paper-section">
        <h2 class="section-subtitle">Access to Public EV Charging Stations (EVCSs) in Residential Areas</h2>

        <div class="paper-text">
            <p v-html="introText"></p>
        </div>

        <div class="figure-container">
            <Figure 
                :src="imageSrc2" 
                :alt="imageAlt" 
                :caption="caption"
            />
        </div>

        <div class="paper-text">
            <p v-html="introText2"></p>
        </div>

        <div class="figure-container">
            <Figure 
                :src="imageSrc3" 
                :alt="imageAlt2" 
                :caption="caption2"
            />
        </div>

    </section>
</template>

<script setup>
import { ref } from 'vue'
import Figure from './figure.vue'

import imageSrc2 from './assets/img2.png'
import imageSrc3 from './assets/img3.png'

const introText = ref(`
    Figure 2 illustrates the population coverage levels of EV charging stations (EVCSs) across cities and city clusters in Europe, China, and the US. In Europe, EVCS coverage follows a normal distribution, suggesting deployment in areas with moderate population density. In contrast, China and the US exhibit right-skewed distributions, with most cities having low coverage levels (below 0.2 and 0.4, respectively), indicating a concentration in sparsely populated areas and potential charging inequity in high-density regions. Similar trends are observed in city clusters, though with minor variations. Europe's more balanced distribution may facilitate better charging accessibility compared to China and the US.`)

const imageAlt = "Fig. 2"
const caption = 
`
Fig. 2 | Population Coverage Levels of EVCSs in Residential Areas. a, Comparing population coverage levels of EVCSs at the city level for the three study areas. We calculated the population coverage level of EVCSs for each city (see Equations (1) and (2) in Methods), and then calculated the percentage of cities that are in different population coverage levels. b, Comparing population coverage levels of EVCSs at the city level for representative city clusters within the three study areas. Note that in this paper, the spatial analysis unit “city” is defined based on Level-2 administrative divisions provided by GADM, a popular database of global administrative areas at different levels. Generally, Level-2 administrative divisions correspond to prefecture-level cities in China, counties in the US, and vary by country in Europe (e.g., municipalities in the Netherlands).
`

// 第二段
const introText2 = ref(`
    Our analysis of equitable EV charging station (EVCS) access examines housing prices at 300m, 800m, and 1000m distances in China and the US, where charging access challenges exist. On average, EVCSs in both countries are located near moderately priced housing, with housing price indices close to 1.0. However, the US shows greater variability, with indices ranging from 0.6 to 1.8—wider than China’s 0.8 to 1.2—suggesting more diverse EVCS placement. City clusters also differ: in China, the Pearl River Delta has more concentrated housing prices than Beijing-Tianjin-Hebei, while in the US, the Northeast Corridor is more varied than the Bay Area. These patterns indicate that while EVCSs generally serve middle-income areas, lower and higher-income residents may face charging inequity, possibly due to planners prioritizing moderate-demand zones over underserved or privately served neighborhoods.
`)
const imageAlt2 = "Fig. 3"
const caption2 = 
`
Fig. 3 | Housing Price Index of EVCSs in Residential Areas. a, Comparing the housing price index of EVCSs at the city level across two study areas (i.e., China and the US) and different buffer radii. We calculated the housing price index of EVCSs for each city (see Equations (3) and (4) in Methods) and used the index value of each city to draw the box plot. b, Comparing the housing price index of EVCSs at the city level in representative city clusters across different study areas and buffer radii.
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