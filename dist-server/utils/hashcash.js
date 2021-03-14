"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verify = exports.find = void 0;

var _crypto = _interopRequireDefault(require("crypto"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var generateHash = function generateHash(c, w) {
  return _crypto["default"].createHash('sha256').update(c + w).digest('hex');
};
/**
 *
 * @param {string} c - challenge string
 * @param {integer} n - number of bits
 */


var find = function find(c, n) {
  var hexChars = Math.floor(n / 4);
  var leadingZeros = ''.padStart(hexChars, '0');
  var w = 0;
  var hash = generateHash(c, w);

  while (hash.substr(0, hexChars) !== leadingZeros) {
    w += 1;
    hash = generateHash(c, w);
  }

  return {
    w: w,
    match: c + w,
    hash: hash
  };
};
/**
 *
 * @param {string} c - challenge string
 * @param {integer} n - number of bits
 * @param {integer} w - proof of work counter
 */


exports.find = find;

var verify = function verify(c, n, w) {
  var hexChars = Math.floor(n / 4);
  var leadingZeros = ''.padStart(hexChars, '0');
  var hash = generateHash(c, w);
  return hash.substr(0, hexChars) === leadingZeros;
};

exports.verify = verify;