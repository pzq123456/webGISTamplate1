import { useDeckOverlay } from '@/composables/useDeckOverlay';

export function onMapLoaded(map, setDeckOverlay, setDeckOverlayCleanup) {
    try {
        const { instance, cleanup } = useDeckOverlay(map);
        setDeckOverlay(instance);
        setDeckOverlayCleanup(cleanup);
    } catch (error) {
        console.error('Map initialization error:', error);
    }
}