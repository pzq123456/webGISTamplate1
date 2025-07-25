<template>
<section class="paper-section">
    <div class="paper-text">
        <p>In support of the global-scale and city-level comparative study, we developed the latest 2024 global EVCS location dataset through our <a href="https://globalevdata.github.io" target="_blank" rel="noopener noreferrer" class="green-link">Global EV Data Initiative</a>. Below shows the details of the compiled EVCS location datasets in three study areas, namely China, Europe, and the United States (US).</p>
    </div>
</section>
</template>

<style>
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

/* Custom link styling */
.green-link {
    color: var(--vp-c-brand);
    text-decoration: underline;
    transition: all 0.25s;
}

.green-link:hover {
    color: var(--vp-c-brand-2);
    background-color: rgba(0, 170, 116, 0.226); /* Light green highlight */
    text-decoration: underline;
    border-radius: 4px;
}
</style>