<script setup>
import { computed } from 'vue'

const props = defineProps({
    src: { type: String, required: true },
    alt: { type: String, default: '' },
    caption: { type: String, default: '' },
    width: { type: [String, Number], default: '60%' }, // 图片宽度
    containerWidth: { type: [String, Number], default: 'auto' }, // 容器宽度
    containerPadding: { type: [String, Number], default: '8px' }, // 容器内边距
    fit: { type: String, default: 'contain' },
    borderRadius: { type: String, default: '8px' },
    background: { type: String, default: 'white' },
})

const figureStyle = computed(() => ({
    position: 'relative',
    background: props.background,
    borderRadius: props.borderRadius,
    padding: typeof props.containerPadding === 'number' 
        ? `${props.containerPadding}px` 
        : props.containerPadding,
    margin: '24px 0',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    overflow: 'hidden',
    width: typeof props.containerWidth === 'number' 
        ? `${props.containerWidth}px` 
        : props.containerWidth,
    maxWidth: '100%', // 防止在小屏幕上溢出
}))

const imageStyle = computed(() => ({
    width: typeof props.width === 'number' ? props.width + 'px' : props.width,
    maxWidth: '100%',
    borderRadius: props.borderRadius,
    transition: 'transform 0.3s ease',
}))

const captionStyle = computed(() => ({
    color: `black`,
    fontSize: '0.95em',
    marginTop: '12px',
    lineHeight: '1.5',
}))
</script>

<template>
    <figure :style="figureStyle" class="image-wrapper">
        <div class="image-mask"></div>
        <ElImage
            :src="src"
            :alt="alt"
            :fit="fit"
            :style="imageStyle"
            class="image-content"
        />
        <figcaption v-if="caption" :style="captionStyle">{{ caption }}</figcaption>
    </figure>
</template>

<style scoped>
.image-wrapper {
    overflow: hidden;
    position: relative;
}
.image-content:hover {
    transform: scale(1.02);
}
.image-mask {
    position: absolute;
    left: 0; top: 0; right: 0; bottom: 0;
    pointer-events: none;
    border-radius: inherit;
    z-index: 2;
    background: radial-gradient(circle at 50% 50%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.5) 100%);
}
</style>