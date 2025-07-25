<!-- StepsRenderer.vue -->
<template>
  <div class="scroll-steps">
    <div
      v-for="step in steps"
      :key="step.id"
      :data-step="step.id"
      class="step"
      ref="stepElements"
      :class="{ 'comparison-step': step.comparison }"
    >
      <div class="step-content">
        <h3>{{ step.title }}</h3>
        <p>{{ step.content }}</p>
        
        <!-- Stats Display -->
        <div v-if="step.stats" class="stats-container">
          <div class="stat-item">
            <span class="stat-value">{{ formatNumber(step.stats.total) }}</span>
            <span class="stat-label">Total Stations</span>
          </div>
          
          <div class="stat-item">
            <span class="stat-value">{{ step.stats.sampleRate }}</span>
            <span class="stat-label">Sample Rate</span>
          </div>
          
          <div v-if="step.stats.source || step.stats.sources" class="stat-item sources">
            <span class="stat-label">Data Source</span>
            <span class="stat-value">
              {{ Array.isArray(step.stats.sources) ? step.stats.sources.join(' + ') : step.stats.source }}
            </span>
          </div>
          
          <!-- European Breakdown -->
          <div v-if="step.stats.breakdown" class="breakdown">
            <div class="breakdown-item">
              <span>EU Countries:</span>
              <span>{{ formatNumber(step.stats.breakdown.euCountries) }}</span>
            </div>
            <div class="breakdown-item">
              <span>Other Countries:</span>
              <span>{{ formatNumber(step.stats.breakdown.otherCountries) }}</span>
            </div>
          </div>
        </div>
        
        <!-- Comparison Indicator -->
        <div v-if="step.comparison" class="comparison-indicator">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19M12 5L6 11M12 5L18 11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>Scroll to compare regions</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineExpose, ref } from 'vue';

const props = defineProps({
  steps: { type: Array, required: true }
});

const stepElements = ref([]);

const formatNumber = (num) => {
  return new Intl.NumberFormat().format(num);
};

defineExpose({ stepElements });
</script>

<style scoped>
.scroll-steps {
  flex: 1;
}

.step {
  min-height: 100vh;
  padding: 2rem;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid var(--vp-c-border);
  margin-bottom: 1px;
  transition: all 0.3s ease;
}

.step.comparison-step {
  border-color: var(--vp-c-brand-2);
  /* 边框为虚线 */
  border-style: dashed;
}

.step-content {
  max-width: 800px;
  margin: 0 auto;
}

.step h3 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: var(--vp-c-text-1);
  font-weight: 600;
}

.step p {
  font-size: 2rem;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  margin-bottom: 2rem;
}

.stats-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  border: 1px solid var(--vp-c-border);
}

.stat-item.sources {
  grid-column: 1 / -1;
}

.stat-value {
  font-size: 2rem;
  color: var(--vp-c-brand-1);
  margin-bottom: 0.5rem;
  line-height: 1.2;
}

.stat-label {
  font-size: 1rem;
  color: var(--vp-c-text-2);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.breakdown {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 1rem;
}

.breakdown-item {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 1rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);

}

.comparison-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 2rem;
  color: var(--vp-c-brand);
  font-weight: 500;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
  40% {transform: translateY(-10px);}
  60% {transform: translateY(-5px);}
}

@media (max-width: 768px) {
  .step {
    padding: 1.5rem;
  }
  
  .stats-container {
    grid-template-columns: 1fr;
  }
  
  .breakdown {
    grid-template-columns: 1fr;
  }
}
</style>