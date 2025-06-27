<template>
    <div class="acknowledgement">
        <h2 class="acknowledgement-title">Acknowledgements</h2>
        <div class="acknowledgement-content">
            We thank the Shenzhen Park of Hetao Shenzhen-Hong Kong Science and Technology Innovation Cooperation Zone
            and this research has been supported by
            <span class="fund-band">"Theories for Spatiotemporal Intelligence and Reliable Data Analysis" (Project ID:
                HZQSWS-KCCYB-2024058)</span>,
            the <span class="fund-band">National Natural Science Foundation of China (Grant No.: 52002345)</span>;
            the <span class="fund-band">Shenzhen Municipal Science and Technology Innovation Commission (Grant No.:
                JCYJ20230807140401003)</span>;
            the <span class="fund-band">Public Policy Research Funding Scheme of the Government of the Hong Kong Special
                Administrative Region (Grant No.: 2023.A6.232.23B)</span>;
            the <span class="fund-band">Research Grants from the Smart Cities Research Institute (Grant No.: CDAR and
                CDA9)</span> at the Hong Kong Polytechnic University.
        </div>
    </div>
</template>

<style scoped>
.acknowledgement {
    position: relative;
    padding: 2.5rem 0;
    text-align: center;
    opacity: 0.9;
}

.acknowledgement-title {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: var(--vp-c-text-2);
    letter-spacing: 0.5px;
}

.acknowledgement-content {
    max-width: 80%;
    font-size: 1.05rem;
    color: var(--vp-c-text-3);
    margin: 0 auto;
    text-align: left;
    line-height: 1.7;
    padding: 0 1.5rem;
}

.fund-band {
    padding: 0.15rem 0.3rem;
    border-radius: 3px;
    color: var(--vp-c-text-3);
    text-decoration: underline;
}

.fund-band:hover {
    color: var(--vp-c-brand-1);
    text-decoration: underline;
    transition: color 0.3s ease;
}
</style>