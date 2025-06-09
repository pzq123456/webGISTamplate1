<template>
  <div class="intro-section">
    <h1>
      <span class="highlight">Where are public electric vehicle charging stations located globally?</span>
      <br>
      <span class="subtitle">Insights from a spatial planning perspective.</span>
    </h1>
    <p class="hint">↓ Scroll down to continue ↓</p>
  </div>
</template>

<style scoped>
.intro-section {
  padding: 100px 20px 60px 20px;
  text-align: center;
  margin: 40px auto 0 auto;
}

.intro-section h1 {
  font-size: 2.6rem;
  font-weight: 700;
  margin-bottom: 18px;
  line-height: 1.25;
}

.intro-section .highlight {
  background: linear-gradient(90deg, #60fae0 0%, #0841eb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.intro-section .subtitle {
  display: block;
  font-size: 2rem;
  font-weight: 400;
  margin-top: 8px;
}

.intro-section .hint {
  font-size: 1rem;
  color: #0e9fcb;
  font-weight: 500;
  letter-spacing: 1px;
  margin-top: 24px;
  animation: bounce 1.5s infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0);}
  50% { transform: translateY(8px);}
}
</style>