/*!
 * is-primitive <https://github.com/jonschlinkert/is-primitive>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

var types = {
  boolean: true,
  number: true,
  string: true,
  symbol: true,
  undefined: true,
};

module.exports = function isPrimitive(val) {
  return  types[typeof val] ? true : val === null;
};