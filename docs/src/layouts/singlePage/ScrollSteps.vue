<!-- 在此处控制卡片渲染 -->
<template>
  <div class="scroll-steps">
    <div
      v-for="step in steps"
      :key="step.id"
      :data-step="step.id"
      class="step"
      ref="stepElements"
    >
      <h3>{{ step.title }}</h3>
      <p>{{ step.content }}</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineExpose, ref } from 'vue';

const props = defineProps({
  steps: { type: Array, required: true }
});

// 暴露 stepElements 给父组件
const stepElements = ref([]);
defineExpose({ stepElements });
</script>

<style scoped>
.scroll-steps {
    flex: 1;
}

.step {
    min-height: 100vh;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: 1px solid var(--vp-c-border);
}

.step h3 {
    font-size: 2rem;
    margin-bottom: 20px;
}

.step p {
    font-size: 1.2rem;
    line-height: 1.6;
}
</style>