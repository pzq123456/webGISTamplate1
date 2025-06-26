import url from '../../../data/points2022.json';

export const steps = [
    // USA Comparison
    {
        id: '2',
        title: 'North America: 2022 vs 2024',
        content: 'US regional analysis: Tracking the evolution of resource allocation and strategic positioning.',
        mapConfig: { center: [-100.0, 38.0], zoom: 3.5, pitch: 45},
        url: url,
    },

    // China Comparison
    {
        id: '4',
        title: 'Asia-Pacific: 2022 Baseline',
        content: 'China regional snapshot in 2022, showing initial distribution before recent expansions.',
        mapConfig: { center: [104.0, 35.0], zoom: 3.5, pitch: 50 },
        url: url,
    },

    // Europe Comparison
    {
        id: '6',
        title: 'European Region: 2022 Status',
        content: 'European distribution in 2022, prior to the energy crisis and geopolitical realignments.',
        mapConfig: { center: [10.0, 50.0], zoom: 4, pitch: 40},
        url: url,
    },
];