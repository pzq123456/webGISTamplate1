import { HexagonLayer } from '@deck.gl/aggregation-layers';
import { data } from '@/loader/points3.data.js'; // 2024年数据

const COLOR_RANGE = [
    [1, 152, 189],
    [73, 227, 206],
    [216, 254, 181],
    [254, 237, 177],
    [254, 173, 84],
    [209, 55, 78]
];

// 数据加载和合并
let mydata = [];

mydata = mydata.concat(
    data.eu.map(d => ([Number(d.grid_lon), Number(d.grid_lat), Number(d.count) || 0]))
);

mydata = mydata.concat(
    data.us.map(d => ([Number(d.grid_lon), Number(d.grid_lat), Number(d.count) || 0]))
);

mydata = mydata.concat(
    data.cn.map(d => ([Number(d.grid_lon), Number(d.grid_lat), Number(d.count) || 0]))
);

export const hexagonLayer = new HexagonLayer({
    id: 'heatmap',
    colorRange: COLOR_RANGE,
    data: mydata,
    elevationRange: [10, 2000],
    elevationScale: 100,
    extruded: true,
    getPosition: d => d,
    colorScaleType: 'linear',
    coverage: 0.7,
    gpuAggregation: true,
    radius: 10000,
    extruded: true,
    transitions: {
        elevationScale: 5000
    }
});