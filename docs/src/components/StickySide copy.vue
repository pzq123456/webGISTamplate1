<template>
  <div class="sticky-scroll-demo">
    <div class="intro-section">
      <h2>滚动定位演示</h2>
      <p>本示例展示如何使用原生 scrollama.js 实现滚动定位效果</p>
      <p class="hint">↓ 向下滚动继续 ↓</p>
    </div>

    <div class="scroll-container" ref="scrollContainer">
      <!-- 左侧固定图形 -->
      <div class="sticky-graphic" :style="graphicStyle">
        <div class="graphic-content">
          <h3>当前步骤:</h3>
          <div class="step-number">{{ currentStep || '0' }}</div>
          <div class="step-description">{{ stepDescriptions[currentStep] || '开始滚动' }}</div>
        </div>
      </div>

      <!-- 右侧滚动步骤 -->
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
    </div>

    <div class="outro-section">
      <h2>演示结束!</h2>
      <p>您已完成所有滚动步骤</p>
      <p v-if="currentStep" class="completion">已完成 {{ currentStep }} / {{ steps.length }} 步骤</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';
import scrollama from 'scrollama';

// 响应式状态
const scrollContainer = ref(null);
const stepElements = ref([]);
const currentStep = ref(null);
const scroller = scrollama(); // 初始化 scrollama 实例

const steps = ref([
  {
    id: '1',
    title: '第一步',
    content: '这是滚动演示的第一个步骤。左侧图形现在应该显示步骤1。',
  },
  {
    id: '2',
    title: '第二步',
    content: '现在您到达了第二个步骤。注意左侧图形在滚动时保持固定位置。',
  },
  {
    id: '3',
    title: '第三步',
    content: '到达中间点！当您滚动到每个新步骤时，左侧图形会相应更新。',
  },
  {
    id: '4',
    title: '第四步',
    content: '快完成了！还差最后一个步骤。',
  },
  {
    id: '5',
    title: '最后一步',
    content: '恭喜！您已经完成了所有滚动步骤。',
  },
]);

const stepDescriptions = ref({
  '1': '介绍',
  '2': '开始',
  '3': '中点',
  '4': '进阶',
  '5': '最终阶段',
});

// 计算属性：图形样式
const graphicStyle = computed(() => ({
  backgroundColor: getStepColor(currentStep.value),
  opacity: currentStep.value ? 1 : 0.8,
}));

// 获取步骤颜色
const getStepColor = (step) => {
  const colors = {
    '1': '#ffddc1',
    '2': '#ffccb3',
    '3': '#ffb3a6',
    '4': '#ff9999',
    '5': '#ff8080',
  };
  return colors[step] || '#f0f0f0';
};

// 处理窗口大小调整
const handleResize = () => {
  try {
    scroller.resize();
  } catch (error) {
    console.error('调整窗口大小错误:', error);
  }
};

// 处理步骤进入
const handleStepEnter = ({ element }) => {
  try {
    if (element && element.dataset.step) {
      currentStep.value = element.dataset.step;
    }
  } catch (error) {
    console.error('步骤进入处理错误:', error);
  }
};

// 处理步骤进度
const handleStepProgress = ({ progress }) => {
  try {
    // 可用于更精细的动画控制
    console.log('步骤进度:', progress);
  } catch (error) {
    console.error('步骤进度处理错误:', error);
  }
};

// 初始化 scrollama
const initScrollama = async () => {
  try {
    // 等待 DOM 渲染完成
    await nextTick();

    // 验证容器和步骤元素
    if (!scrollContainer.value) {
      console.error('未找到滚动容器');
      return;
    }
    if (!stepElements.value || stepElements.value.length === 0) {
      console.error('未找到步骤元素');
      return;
    }

    // 配置 scrollama
    scroller
      .setup({
        container: '.scroll-container',
        graphic: '.sticky-graphic',
        text: '.scroll-steps',
        step: '.step',
        offset: 0.33, // 触发点位置
        progress: true, // 启用进度追踪
        threshold: [0, 0.5, 1], // 使用数组格式的 threshold
        debug: false, // 可设为 true 以调试
      })
      .onStepEnter(handleStepEnter)
      .onStepProgress(handleStepProgress);

    // 手动触发一次 resize
    handleResize();
  } catch (error) {
    console.error('初始化 scrollama 错误:', error);
  }
};

// 生命周期钩子
onMounted(() => {
  initScrollama();
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  try {
    scroller.destroy();
    window.removeEventListener('resize', handleResize);
  } catch (error) {
    console.error('清理错误:', error);
  }
});
</script>

<style scoped>
.sticky-scroll-demo {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: #333;
  width: 100%;
  margin: 0 auto;
}

.intro-section,
.outro-section {
  padding: 100px 20px;
  text-align: center;
  background-color: #f9f9f9;
}

.hint {
  color: #666;
  font-style: italic;
  margin-top: 30px;
}

.scroll-container {
  display: flex;
  min-height: 100vh;
}

.sticky-graphic {
  flex: 1;
  position: sticky;
  top: 0;
  height: 100vh;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
}

.graphic-content {
  text-align: center;
  padding: 20px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.step-number {
  font-size: 5rem;
  font-weight: bold;
  margin: 20px 0;
  color: #2c3e50;
}

.scroll-steps {
  flex: 1;
}

.step {
  min-height: 80vh;
  margin: 10px;
  padding: 40px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.step h3 {
  font-size: 2rem;
  margin-bottom: 20px;
  color: #2c3e50;
}

.step p {
  font-size: 1.2rem;
  line-height: 1.6;
}

.completion {
  font-weight: bold;
  color: #2c3e50;
  margin-top: 20px;
}

</style>
  