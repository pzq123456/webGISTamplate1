<template>
    <section class="paper-section">
        <div class="paper-text">
            <p v-html="introText"></p>
        </div>

        <div class="paper-text">
            <p v-html="introText2"></p>
        </div>
        <!-- <div class="figure-container">
            <Figure 
                :src="imageSrc" 
                :alt="imageAlt" 
                :caption="caption"
            />
        </div> -->
    </section>
</template>

<script setup>
import { ref } from 'vue'
// import Figure from './figure.vue'

// import imageSrc from './assets/img1.png'

const introText = ref(`
    In support of the global-scale and city-level comparative study, we developed the latest 2024 global EVCS location dataset through our Global EV Data Initiative, by collecting and compiling multi-source, high-quality, and open-access EVCS datasets worldwide. To the best of our knowledge, this is the first high-quality global-scale EVCS location dataset available to the public, which can support many other EV-related studies. 
`)

const introText2 = ref(`
Below shows the details of the compiled EVCS location datasets in three study areas, namely China (Mainland China only), Europe (including 27 member countries of the European Union, the United Kingdom, Norway, Liechtenstein, Iceland, and Switzerland), and the United States (US). 
`)

// const imageAlt = "Fig. 1"
// const caption = `Fig. 1 | Overview of Global Public EVCSs: Geographical Locations and Statistical Distributions. a, Global distribution of public EV chargers according to IEA37. b, Geographical locations of three study areas, i.e., China, the US, and Europe, and their representative city clusters. The proportion of public EV chargers owned by each city cluster is presented. An introduction to these city clusters can be found in Appendix B of the Supplementary Materials. c, Statistical distribution of the collected public EVCS location data (the spatial distribution can be found in Appendix C of the Supplementary Materials). The EVCS number and sampling ratio of the three study areas are presented. d, Associations between the reported public EV charger number/density and GDP, characterized by ordinary least squares (OLS) regression analyses. Each point represents a specific region (province for China, state for the US, and country for Europe) and is used to construct a regression line, with a shaded region indicating the 95% confidence interval.`

</script>

<style scoped>
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