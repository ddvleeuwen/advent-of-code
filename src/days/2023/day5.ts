import Solution from '../../model/solution.ts';
import { RangeMap, RangeConverter } from '../../util/rangemap.ts';

export default class Day5 extends Solution {
  /* ---- Day Init ---- */
  year = 2023;

  day = 5;

  example = true;
  /* ------------------ */

  setupMap(mapInput: string) {
    const rangeInputs = mapInput
      .split('\n')
      .slice(1)
      .map((i) => i.split(' ').map((n) => parseInt(n, 10)));

    const newRangeMap = new RangeMap();

    const rangeConverters = rangeInputs.map((i) => new RangeConverter(i[0], i[1], i[2]));

    newRangeMap.converters.push(...rangeConverters);

    return newRangeMap;
  }

  seedToSoilMap: RangeMap;

  soilToFertilizerMap: RangeMap;

  fertilizerToWaterMap: RangeMap;

  waterToLightMap: RangeMap;

  lightToTemperatureMap: RangeMap;

  temperatureToHumidityMap: RangeMap;

  humidityToLocationMap: RangeMap;

  calculateSeedToLocation(seed: number) {
    const rangeSoil = this.seedToSoilMap.calculate(seed);
    const rangeFertilizer = this.soilToFertilizerMap.calculate(rangeSoil);
    const rangeWater = this.fertilizerToWaterMap.calculate(rangeFertilizer);
    const rangeLight = this.waterToLightMap.calculate(rangeWater);
    const rangeTemperature = this.lightToTemperatureMap.calculate(rangeLight);
    const rangeHumidity = this.temperatureToHumidityMap.calculate(rangeTemperature);
    return this.humidityToLocationMap.calculate(rangeHumidity);
  }

  solve(input: string) {
    const inputs = input.split('\n\n');
    const seeds = inputs[0].split(' ').slice(1).map((n) => parseInt(n, 10));
    const maps = inputs.slice(1);

    const ranges = [];
    for (let i = 0; i < seeds.length; i += 2) {
      const start = seeds[i];
      const amount = seeds[i + 1];
      ranges.push({
        start, amount,
      });
    }

    this.seedToSoilMap = this.setupMap(maps[0]);
    this.soilToFertilizerMap = this.setupMap(maps[1]);
    this.fertilizerToWaterMap = this.setupMap(maps[2]);
    this.waterToLightMap = this.setupMap(maps[3]);
    this.lightToTemperatureMap = this.setupMap(maps[4]);
    this.temperatureToHumidityMap = this.setupMap(maps[5]);
    this.humidityToLocationMap = this.setupMap(maps[6]);

    const locations = seeds.map((n) => this.calculateSeedToLocation(n));

    this.a = Math.min(...locations);

    this.b = Infinity;

    for (const range of ranges) {
      for (let i = range.start; i < range.start + range.amount; i += 1) {
        const rangeLocation = this.calculateSeedToLocation(i);

        if (rangeLocation < this.b) {
          this.b = rangeLocation;
        }
      }
    }
  }
}
