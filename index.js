/*!
 * is-primitive <https://github.com/jonschlinkert/is-primitive>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

module.exports = function isPrimitive(val) {
  if (val === null
    || typeof val === 'boolean'
    || typeof val === 'number'
    || typeof val === 'string'
    || typeof val === 'symbol'
    || typeof val === 'undefined') {
    return true;
  }
};
