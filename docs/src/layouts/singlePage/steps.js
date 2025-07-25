// import url from '../../../data/points2022.json';

export const steps = [
    // USA 2024 Data
    {
        id: '1',
        title: 'US: 2024 EVCS Distribution',
        content: '',
        mapConfig: { center: [-100.0, 38.0], zoom: 3.5, pitch: 45},
        // url: url,
        stats: {
            total: 69677,
            sampleRate: '100%',
            source: 'Alternative Fuels Data Center'
        }
    },

    // China 2024 Data
    {
        id: '2',
        title: 'China: EVCS Distribution 2024',
        content: 'This study focuses on mainland China, with the dataset excluding Taiwan, Hong Kong, and Macau.',
        mapConfig: { center: [104.0, 35.0], zoom: 3.5, pitch: 50 },
        // url: url,
        stats: {
            total: 159199,
            sampleRate: '69.15%',
            source: 'AMAP'
        }
    },

    // Europe 2024 Data
    {
        id: '3',
        title: 'Europe: EVCS Distribution 2024',
        content: 'This study focuses on 32 European countries, including 27 member countries of the European Union, the United Kingdom, Norway, Liechtenstein, Iceland, and Switzerland.',
        mapConfig: { center: [10.0, 50.0], zoom: 4, pitch: 40},
        // url: url,
        stats: {
            total: 226253,
            sampleRate: '69.56%',
            sources: ['European Alternative Fuels Observatory', 'Open Charge Map'],
            // breakdown: {
            //     euCountries: 211596,
            //     otherCountries: 14657
            // }
        }
    },

    // Comparison Step
    {
        id: '4',
        title: 'Global EVCS Comparison',
        content: 'You can freely drag and zoom the map to explore any area you are interested in.',
        mapConfig: { center: [20.0, 30.0], zoom: 1.5, pitch: 30},
        // url: url,
        comparison: true
    }
];