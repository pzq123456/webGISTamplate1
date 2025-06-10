<template>
  <div class="intro-section">
    <h1>
      <span class="highlight">Where are public electric vehicle charging stations located globally?</span>
      <br>
      <span class="subtitle" ref="subtitle">Insights from a spatial planning perspective.</span>
    </h1>
    <p class="hint">↓ Scroll down to continue ↓</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const subtitle = ref(null);

onMounted(() => {
  const subtitleElement = subtitle.value;
  const text = subtitleElement.textContent;
  subtitleElement.textContent = '';
  let i = 0;

  function typeWriter() {
    if (i < text.length) {
      subtitleElement.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 50);
    }
  }

  // Start typewriter effect after a slight delay
  setTimeout(typeWriter, 500);
});
</script>

<style scoped>
.intro-section {
  padding: 6rem 1.25rem 3.75rem 1.25rem;
  text-align: center;
  margin: 2.5rem auto 0 auto;
  max-width: 48rem;
}

.intro-section h1 {
  font-size: 2.25rem; /* Adjusted for better readability */
  font-weight: 700;
  line-height: 1.3;
  margin-bottom: 1.125rem;
  color: var(--vp-c-text-1); /* VitePress primary text color */
}

.intro-section .highlight {
  background: linear-gradient(90deg, var(--vp-c-green-1) 0%, var(--vp-c-brand-2) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 800;
}

.intro-section .subtitle {
  display: block;
  font-size: 1.5rem;
  font-weight: 400;
  margin-top: 0.5rem;
  color: var(--vp-c-text-1); /* VitePress secondary text color */
  white-space: nowrap;
  overflow: hidden;
}

.intro-section .hint {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--vp-c-brand-2); /* VitePress brand color */
  letter-spacing: 0.0625rem;
  margin-top: 1.5rem;
  animation: bounce 1.5s infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(0.5rem); }
}

@media (max-width: 768px) {
  .intro-section {
    padding: 4rem 1rem 2.5rem 1rem;
  }

  .intro-section h1 {
    font-size: 1.875rem;
  }

  .intro-section .subtitle {
    font-size: 1.25rem;
  }
}
</style>