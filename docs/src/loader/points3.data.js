import fs from 'node:fs';
import { parse } from 'csv-parse/sync';

export default {

  // data/points/2024/output/cn2024_aggregated.csv
  watch: [
    '../../data/points/2024/output/cn2024_aggregated.csv', 
    '../../data/points/2024/output/eu2024_aggregated.csv',
    '../../data/points/2024/output/us2024_aggregated.csv'
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

    return {
      cn: cnData,
      eu: euData,
      us: usData,
    };
  },
};