import { withBase } from 'vitepress';
const url = withBase('data/points2024.json');
const url2 = withBase('data/points2022.json');

export const steps = [
    {
        id: '0',
        title: 'Global Overview (2022)',
        content: 'Starting point: Global distribution of resources in 2022 before major geopolitical shifts.',
        mapConfig: { center: [0, 0], zoom: 2, pitch: 30},
        url: url2,
    },
    {
        id: '1',
        title: 'Global Overview (2024)',
        content: 'Notice the significant changes in global distribution compared to 2022, reflecting recent developments.',
        mapConfig: { center: [0, 0], zoom: 2, pitch: 30},
        url: url,
    },

    // USA Comparison
    {
        id: '2',
        title: 'North America: 2022 vs 2024',
        content: 'US regional analysis: Tracking the evolution of resource allocation and strategic positioning.',
        mapConfig: { center: [-100.0, 38.0], zoom: 3.5, pitch: 45},
        url: url2,
    },
    {
        id: '3',
        title: 'North America: 2024 Update',
        content: 'Observe the notable changes in US distribution patterns over the past two years.',
        mapConfig: { center: [-100.0, 38.0], zoom: 3.5, pitch: 45},
        url: url,
    },

    // China Comparison
    {
        id: '4',
        title: 'Asia-Pacific: 2022 Baseline',
        content: 'China regional snapshot in 2022, showing initial distribution before recent expansions.',
        mapConfig: { center: [104.0, 35.0], zoom: 3.5, pitch: 50 },
        url: url2,
    },
    {
        id: '5',
        title: 'Asia-Pacific: 2024 Developments',
        content: 'Dramatic changes in China\'s footprint reveal shifting priorities and growth patterns.',
        mapConfig: { center: [104.0, 35.0], zoom: 3.5, pitch: 50 },
        url: url,
    },

    // Europe Comparison
    {
        id: '6',
        title: 'European Region: 2022 Status',
        content: 'European distribution in 2022, prior to the energy crisis and geopolitical realignments.',
        mapConfig: { center: [10.0, 50.0], zoom: 4, pitch: 40},
        url: url2,
    },
    {
        id: '7',
        title: 'European Region: 2024 Transformations',
        content: 'The European landscape shows significant reorganization in response to recent global events.',
        mapConfig: { center: [10.0, 50.0], zoom: 4, pitch: 40},
        url: url,
    },

    // Final Comparison
    {
        id: '8',
        title: 'Global Changes: Side-by-Side',
        content: 'Final comparison highlighting the most dramatic shifts between 2022 and 2024 worldwide.',
        mapConfig: { center: [0, 0], zoom: 2, pitch: 30},
        url: url2,
        compareWith: url,
        compareMode: true
    }
];