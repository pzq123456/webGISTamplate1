import fs from 'node:fs';
import { parse } from 'csv-parse/sync';

// data\points\output\cn_aggregated.csv

export default {
  watch: [
    '../../data/points/output/cn_aggregated.csv', 
    '../../data/points/output/eu_aggregated.csv',
    '../../data/points/output/us_aggregated.csv'
  ],
  load(watchedFiles) {
    const cnData = parse(fs.readFileSync(watchedFiles[0], 'utf-8'), {
      columns: true,
      skip_empty_lines: true,
    });
    const euData = parse(fs.readFileSync(watchedFiles[1], 'utf-8'), {
      columns: true,
      skip_empty_lines: true,
    });
    const usData = parse(fs.readFileSync(watchedFiles[2], 'utf-8'), {
      columns: true,
      skip_empty_lines: true,
    });

    // return {
    //   cn: sampleData(cnData),
    //   eu: sampleData(euData),
    //   us: sampleData(usData),
    // };

    return {
      cn: cnData,
      eu: euData,
      us: usData,
    };
  },
};