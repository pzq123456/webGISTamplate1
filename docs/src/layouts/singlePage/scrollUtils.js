// scrollUtils.js
export function initScrollama(stepElements, handleStepEnter) {
  // 返回一个与Scrollama兼容的接口对象
  const observerApi = {
    destroy: () => {
      observer?.disconnect();
      observer = null;
    },
    resize: () => {
      // Intersection Observer会自动处理resize，这里不需要特别实现
    }
  };

  let observer;

  try {
    // 配置选项（与Scrollama参数对应）
    const options = {
      root: null, // 相对于视口
      rootMargin: '0px',
      threshold: buildThresholdList(50) // 创建50个阈值点(对应Scrollama的granularity)
    };

    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
          // 模拟Scrollama的onStepEnter事件结构
          handleStepEnter({
            element: entry.target,
            direction: entry.boundingClientRect.top < 0 ? 'down' : 'up',
            index: Array.from(stepElements).indexOf(entry.target)
          });
        }
      });
    }, options);

    // 观察所有步骤元素
    stepElements.forEach(element => {
      observer.observe(element);
    });

  } catch (error) {
    console.error('Intersection Observer initialization error:', error);
  }

  return observerApi;
}

// 辅助函数：创建阈值列表
function buildThresholdList(steps) {
  const thresholds = [];
  for (let i = 1.0; i <= steps; i++) {
    thresholds.push(i / steps);
  }
  return thresholds;
}