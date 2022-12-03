class TipObject {
  constructor(spec) {
    this.beforeText = spec.beforeText == undefined ? '' : spec.beforeText;
    this.inBetweenText = spec.inBetweenText == undefined ? '' : spec.inBetweenText;
    this.afterText = spec.afterText == undefined ? '!' : spec.afterText;
  }
}

var Tips = [
  new TipObject({
    beforeText: 'Watch out! ',
    inBetweenText: ' are moving ',
  }),
  new TipObject({
    beforeText: 'Too sweet. ',
    inBetweenText: ' are moving ',
    afterText: ' fast!',
  }),
  new TipObject({
    inBetweenText: ' are hot! Up, ',
    afterText: ', up and away.',
  }),
  new TipObject({
    inBetweenText: ' are going ',
    afterText: ' through the roof!',
  }),
];
