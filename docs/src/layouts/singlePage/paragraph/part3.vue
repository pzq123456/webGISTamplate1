<template>
    <section class="paper-section">
        <h2 class="section-subtitle">Access to EVCSs in Commercial and Administrative Areas</h2>

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
    Compared with cities in Europe and the US, Chinese cities tend to deploy more EVCSs in areas with less diverse amenities.
`)
const imageAlt = "Fig. 4"
const caption = 
`
Fig. 3 | City-level comparison of the POI mix around EVCSs across the three study areas. A larger index value suggests a tendency for EVCS deployment in areas with a greater diversity of amenities.`

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