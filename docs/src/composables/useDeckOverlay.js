import { MapboxOverlay } from '@deck.gl/mapbox';

export function useDeckOverlay(map, options = {}) {
  const defaultOptions = {
    interleaved: true,
    layers: [],
    ...options
  };

  const deckOverlay = new MapboxOverlay(defaultOptions);

  if (map) {
    map.addControl(deckOverlay);
  }

  // 清理函数
  const cleanup = () => {
    if (map && deckOverlay) {
      try {
        map.removeControl(deckOverlay);
      } catch (e) {
        console.warn('Error removing deck overlay:', e);
      }
      deckOverlay.finalize();
    }
  };

  // 暴露方法
  return {
    instance: deckOverlay,
    setLayers: (layers) => {
      deckOverlay.setProps({ layers });
    },
    setOptions: (newOptions) => {
      deckOverlay.setProps(newOptions);
    },
    cleanup
  };
}