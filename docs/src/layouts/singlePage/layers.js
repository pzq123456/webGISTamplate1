import { HexagonLayer } from '@deck.gl/aggregation-layers';

import { withBase } from 'vitepress';
const url = withBase('data/points2024.json');
const url2 = withBase('data/points2022.json');

const COLOR_RANGE = [
    [1, 152, 189],
    [73, 227, 206],
    [216, 254, 181],
    [254, 237, 177],
    [254, 173, 84],
    [209, 55, 78]
];

export function createHexagonLayer(data = url) {
    return new HexagonLayer({
        id: 'heatmap',
        colorRange: COLOR_RANGE,
        data: data,
        elevationRange: [10, 2000],
        elevationScale: 300,
        extruded: true,
        getPosition: d => d,
        coverage: 0.5,
        gpuAggregation: true,
        radius: 10000,
    });
}
