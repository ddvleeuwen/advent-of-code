export class RangeConverter {
  destinationStart: number;

  sourceStart: number;

  range: number;

  constructor(destinationStart: number, sourceStart: number, range: number) {
    this.destinationStart = destinationStart;
    this.sourceStart = sourceStart;
    this.range = range;
  }

  getDestination(source: number) {
    if (!this.isInRange(source)) {
      return source;
    }

    return source - this.sourceStart + this.destinationStart;
  }

  isInRange(source: number) {
    return source >= this.sourceStart && source < (this.sourceStart + this.range);
  }
}

export class RangeMap {
  converters: RangeConverter[] = [];

  calculate(source: number) {
    const converter = this.converters.find((c) => c.isInRange(source));

    if (!converter) {
      return source;
    }

    return converter.getDestination(source);
  }
}
