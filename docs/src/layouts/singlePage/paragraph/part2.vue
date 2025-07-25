<template>
    <section class="paper-section">

        <div class="paper-text">
            <p v-html="introText0"></p>
        </div>
        <h2 class="section-subtitle">Access to EVCSs in Residential Areas</h2>



        <div class="paper-text">
            <p v-html="introText"></p>
        </div>

        <div class="figure-container">
            <Figure :src="imageSrc2" :alt="imageAlt" :caption="caption" />
        </div>

        <div class="paper-text">
            <p v-html="introText2"></p>
        </div>

        <div class="figure-container">
            <Figure :src="imageSrc3" :alt="imageAlt2" :caption="caption2" />
        </div>

    </section>
</template>

<script setup>
import { ref } from 'vue'
import Figure from './figure.vue'

import imageSrc2 from './assets/img2.png'
import imageSrc3 from './assets/img3.png'

// This work explored access to EVCSs in residential areas (characterized by population coverage and the association with housing prices), in commercial and administrative areas (characterized by the coverage of different types of POIs), and through road network (characterized by road network accessibility)
const introText0 = ref(`
    This work explored access to EVCSs in residential areas (characterized by population coverage and the association with housing prices), in commercial and administrative areas (characterized by the coverage of different types of POIs), and through road network (characterized by road network accessibility).
    `)

const introText = ref(`
    Compared with European cities, cities in China and the US tend to deploy more EVCSs in areas with lower population density.`)
const imageAlt = "Fig. 2"
const caption =
    `
Fig. 1 | City-level comparison of the population coverage level of EVCSs across the three study areas. A larger index value suggests a tendency for EVCS deployment in areas with higher population density.
`

// 第二段
const introText2 = ref(`
    Cities in both China and the US tend to deploy more EVCSs in areas with moderate housing prices. This suggests that both low-priced and high-priced areas have relatively limited access to EVCSs.
`)
const imageAlt2 = "Fig. 3"
const caption2 =
    `
Fig. 2 | City-level comparison of the housing price index of EVCSs across two study areas (i.e., China and the US). A larger index value suggests a tendency for EVCS deployment in areas with higher housing prices.`

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