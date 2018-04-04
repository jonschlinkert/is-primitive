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
  .add('if', () => values.map(v => isPrimitiveIf(v)))
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

function isPrimitiveIf(val) {
  if (val === null
    || typeof val === 'boolean'
    || typeof val === 'number'
    || typeof val === 'string'
    || typeof val === 'symbol'
    || typeof val === 'undefined') {
    return true;
  }
  return false;
}

// if x 2,592,812 ops/sec ±0.79% (85 runs sampled)
// switch x 2,490,420 ops/sec ±0.75% (83 runs sampled)
// object x 1,474,088 ops/sec ±0.89% (83 runs sampled)
// object - in x 1,658,439 ops/sec ±1.65% (83 runs sampled)
// object - own x 1,823,545 ops/sec ±1.13% (84 runs sampled)
// array x 1,156,344 ops/sec ±0.71% (86 runs sampled)
// equals x 2,275,954 ops/sec ±0.74% (86 runs sampled)
// Fastest is if
