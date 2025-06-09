import scrollama from 'scrollama';

export function initScrollama(stepElements, handleStepEnter){
    const scroller = scrollama();

    try {
        scroller
            .setup({
                step: stepElements,
                offset: 0.5,
                threshold: 4, // The granularity of the progress interval in pixels (smaller = more granular).
            })
            .onStepEnter(handleStepEnter);
    } catch (error) {
        console.error('Scrollama initialization error:', error);
    }

    return scroller;
}