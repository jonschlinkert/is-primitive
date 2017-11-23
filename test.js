/*!
 * is-primitive <https://github.com/jonschlinkert/is-primitive>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var should = require('should');
var isPrimitive = require('./');

describe('isPrimitive', function() {
  it('should return true when primitive value', function() {
    isPrimitive(null).should.be.true;
    isPrimitive(undefined).should.be.true;
    isPrimitive(1).should.be.true;
    isPrimitive('foo').should.be.true;
    isPrimitive(true).should.be.true;
    isPrimitive(false).should.be.true;
    isPrimitive(NaN).should.be.true;
    isPrimitive(Infinity).should.be.true;
    if (typeof Symbol != "undefined") isPrimitive(Symbol()).should.be.true
  });

  it('should return false when not primitive value', function() {
    isPrimitive({}).should.be.false;
    isPrimitive([]).should.be.false;
    isPrimitive(/./).should.be.false;
    isPrimitive(function() {}).should.be.false;
    isPrimitive(new function() {}).should.be.false;
    isPrimitive(new Number).should.be.false;
    isPrimitive(new String).should.be.false;
    isPrimitive(new Boolean).should.be.false;
    isPrimitive(new Date).should.be.false;
    isPrimitive(new Error).should.be.false;
  });
});
