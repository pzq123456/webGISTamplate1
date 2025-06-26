<template>
    <section class="paper-section">
        <div class="paper-text">
            <p v-html="introText"></p>
        </div>
        <div class="figure-container">
            <Figure 
                :src="imageSrc" 
                :alt="imageAlt" 
                :caption="caption"
                :gradientBorder="false"
                :shadow="false"
                bgcolor="var(--vp-c-bg-soft)"
            />
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue'
import Figure from './Figure.vue'

import imageSrc from './assets/img1.png'

const introText = ref(`
    This study is focused on EVCSs in three countries/regions, i.e., China (Mainland China only), Europe (including 27 member countries of the European Union, the United Kingdom, Norway, Liechtenstein, Iceland, and Switzerland), and the United States (US). There are two main reasons for choosing China, Europe, and the US as study areas and conducting a comparative study. First, these three regions are global leaders in deploying public charging infrastructure, collectively accounting for nearly 90% of the world’s public EV chargers (as shown in Figure 1-(a)), which makes them highly representative and adequate for this global study. Second, the development of public charging infrastructure in these regions, along with cross-regional comparisons, has garnered increasing attention from governments, institutions, and organizations such as the International Council on Clean Transportation (ICCT)31. Understanding how public charging infrastructure is deployed in these areas is essential to further guide global public charging infrastructure development. 
`)

const imageAlt = "Fig. 1"
const caption = `Fig. 1 Overview of Global Public EVCSs: Geographical Locations and Statistical Distributions. a, Global distribution of public EV chargers according to IEA37. b, Geographical locations of three study areas, i.e., China, the US, and Europe, and their representative city clusters. The proportion of public EV chargers owned by each city cluster is presented. An introduction to these city clusters can be found in Appendix B of the Supplementary Materials. c, Statistical distribution of the collected public EVCS location data (the spatial distribution can be found in Appendix C of the Supplementary Materials). The EVCS number and sampling ratio of the three study areas are presented. d, Associations between the reported public EV charger number/density and GDP, characterized by ordinary least squares (OLS) regression analyses. Each point represents a specific region (province for China, state for the US, and country for Europe) and is used to construct a regression line, with a shaded region indicating the 95% confidence interval.`

</script>

<style scoped>
.paper-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.8rem;
    margin: 2rem 0;
    padding: 1.5rem;
    background-color: var(--vp-c-bg-soft);
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