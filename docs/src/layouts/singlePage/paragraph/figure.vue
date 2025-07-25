<script setup>
import { computed } from 'vue'

const props = defineProps({
    src: { type: String, required: true },
    alt: { type: String, default: '' },
    caption: { type: String, default: '' },
    width: { type: [String, Number], default: '60%' },
    containerWidth: { type: [String, Number], default: '80%' },
    containerPadding: { type: [String, Number], default: '16px' },
    fit: { type: String, default: 'contain' },
    borderRadius: { type: String, default: '8px' },
    background: { type: String, default: 'white' },
})

const figureStyle = computed(() => ({
    '--background': props.background,
    '--border-radius': props.borderRadius,
    '--container-padding': typeof props.containerPadding === 'number' 
        ? `${props.containerPadding}px` 
        : props.containerPadding,
    '--container-width': typeof props.containerWidth === 'number' 
        ? `${props.containerWidth}px` 
        : props.containerWidth,
    '--image-width': typeof props.width === 'number' 
        ? `${props.width}px` 
        : props.width,
}))
</script>

<template>
    <figure :style="figureStyle" class="image-wrapper">
        <div class="image-mask"></div>
        <ElImage
            :src="src"
            :alt="alt"
            :fit="fit"
            class="image-content"
        />
        <figcaption v-if="caption" class="image-caption">{{ caption }}</figcaption>
    </figure>
</template>

<style scoped>
.image-wrapper {
    position: relative;
    background: var(--background, white);
    border-radius: var(--border-radius, 8px);
    padding: var(--container-padding, 16px);
    transition: all 0.3s ease;
    overflow: hidden;
    width: var(--container-width, 80%);
    max-width: 100%;
    margin: 24px auto;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.image-content {
    width: var(--image-width, 60%);
    max-width: 100%;
    border-radius: var(--border-radius, 8px);
    transition: transform 0.3s ease;
}

.image-content:hover {
    transform: scale(1.02);
}

.image-caption {
    color: var(--vp-c-text-2);
    font-size: 0.9em;
    margin-top: 8px;
    line-height: 1.4;
    width: var(--image-width, 60%);
    max-width: 100%;
    text-align: left;
    word-wrap: break-word;
}

.image-mask {
    position: absolute;
    left: 0; 
    top: 0; 
    right: 0; 
    bottom: 0;
    pointer-events: none;
    border-radius: inherit;
    z-index: 2;
    background: radial-gradient(circle at 55% 55%, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.761) 100%);
}
</style>