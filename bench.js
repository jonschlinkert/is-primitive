const Benchmark = require('benchmark');
const suite = new Benchmark.Suite();

const types1 = { boolean: true, number: true, string: true, symbol: true, undefined: true };
const types2 = ['boolean', 'number', 'string', 'symbol', 'undefined'];
const values = [
  'foo',
  1,
  function() {},
  {},
  new Date(),
  /foo/,
  Symbol('foo'),
  null,
  undefined,
  void 0,
  true,
  false,
  NaN,
  Infinity
];

suite
  .add('switch', () => values.map(v => isPrimitiveSwitch(v)))
  .add('object', () => values.map(v => isPrimitiveObjectLookup(v)))
  .add('object - in', () => values.map(v => isPrimitiveObjectIn(v)))
  .add('object - own', () => values.map(v => isPrimitiveObjectOwn(v)))
  .add('array', () => values.map(v => isPrimitiveArray(v)))
  .add('equals', () => values.map(v => isPrimitive(v)))

  .on('cycle', event => console.log(String(event.target)))
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  .run({ 'async': true });

function isPrimitive(val) {
  if (val === null) {
    return true;
  }
  const type = typeof val;
  return type === 'boolean'
    || type === 'number'
    || type === 'string'
    || type === 'symbol'
    || type === 'undefined';
}

function isPrimitiveArray(val) {
  return val === null || types2.indexOf(typeof val) > -1;
}

function isPrimitiveObjectOwn(val) {
  return val === null || types1.hasOwnProperty(typeof val);
}

function isPrimitiveObjectLookup(val) {
  return val === null || !!types1[typeof val];
}

function isPrimitiveObjectIn(val) {
  return val === null || (typeof val) in types1;
}

function isPrimitiveSwitch(val) {
  switch (typeof val) {
    case 'boolean':
    case 'number':
    case 'string':
    case 'symbol':
    case 'undefined':
      return true;
    default: {
      return val === null;
    }
  }
}

// switch x 3,104,738 ops/sec ±0.61% (90 runs sampled)
// object x 1,947,977 ops/sec ±0.55% (92 runs sampled)
// object - in x 2,160,225 ops/sec ±0.63% (89 runs sampled)
// object - own x 2,376,049 ops/sec ±0.59% (88 runs sampled)
// array x 1,441,834 ops/sec ±0.54% (84 runs sampled)
// equals x 2,983,937 ops/sec ±0.59% (87 runs sampled)
// Fastest is switch
