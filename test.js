/*!
 * is-primitive <https://github.com/jonschlinkert/is-primitive>
 *
 * Copyright (c) 2014-2019, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

require('mocha');
const assert = require('assert');
const isPrimitive = require('./');

describe('isPrimitive', function() {
  it('should return true when primitive value', function() {
    assert(isPrimitive());
    assert(isPrimitive(undefined));
    assert(isPrimitive(null));
    assert(isPrimitive(0));
    assert(isPrimitive(1));
    assert(isPrimitive('foo'));
    assert(isPrimitive(true));
    assert(isPrimitive(false));
    assert(isPrimitive(NaN));
    assert(isPrimitive(Infinity));
    if (typeof Symbol !== 'undefined') {
      assert(isPrimitive(Symbol()));
    }
    if (typeof BigInt !== 'undefined') {
      assert(isPrimitive(BigInt(0)));
    }
  });

  it('should return false when not primitive value', function() {
    assert(!isPrimitive({}));
    assert(!isPrimitive([]));
    assert(!isPrimitive(/./));
    assert(!isPrimitive(function() {}));
    assert(!isPrimitive(new Date()));
    assert(!isPrimitive(new Number()));
    assert(!isPrimitive(new String()));
    assert(!isPrimitive(new Boolean()));
  });
});
