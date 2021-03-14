import crypto from 'crypto';
import isString from 'lodash.isstring';
import isInteger from 'lodash.isinteger';

/**
 * Generate SHA-256 digest of c+w
 *
 * @param {string} c - challenge string
 * @param {integer} w  - proof of work counter
 * @returns {string} SHA-256 digest (d) of the concatenation of c+w
 */
const generateHash = (c, w) => {
  return crypto
    .createHash('sha256')
    .update(c + w)
    .digest('hex');
};

/**
 * Given an arbitrary challenge (c) string, and a number of bits (n)
 * integer: we need to increment a proof of work counter (w) to find
 * a SHA-256 digest (d) of the concatenation of c+w that has n leading
 * 0 bits
 *
 * @param {string} c - challenge string
 * @param {integer} n - number of bits
 * @returns {object} proof of work, final match, and hash
 */
export const find = (c, n) => {
  if (!isString(c) || !isInteger(n)) {
    throw new Error('Invalid parameters');
  }

  const hexChars = Math.floor(n / 4);
  const leadingZeros = ''.padStart(hexChars, '0');

  let w = 0;
  let hash = generateHash(c, w);

  while (hash.substr(0, hexChars) !== leadingZeros) {
    w += 1;
    hash = generateHash(c, w);
  }

  return { w, match: c + w, hash };
};

/**
 * Given an arbitrary challenge (c) string, a number of bits (n)
 * integer, and a proof of work counter (w) integer: verify the
 * SHA-256 hash digest of the concatenation of c+w has n leading
 * 0 bits.
 *
 * @param {string} c - challenge string
 * @param {integer} n - number of bits
 * @param {integer} w - proof of work counter
 * @returns {boolean} whether or not SHA-256 hash digest of c+w
 *    has n leading 0 bits
 */
export const verify = (c, n, w) => {
  if (!isString(c) || !isInteger(n) || !isInteger(w)) {
    throw new Error('Invalid parameters');
  }

  const hexChars = Math.floor(n / 4);
  const leadingZeros = ''.padStart(hexChars, '0');
  const hash = generateHash(c, w);

  return hash.substr(0, hexChars) === leadingZeros;
};
