/*!
 * is-primitive <git://github.com/jonschlinkert/is-primitive.git>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the [object Object] License.
 */

'use strict';

// see http://jsperf.com/testing-value-is-primitive/7
module.exports = function isPrimitive(value) {
  return value === null || (typeof value !== 'function' && typeof value !== 'object');
};
