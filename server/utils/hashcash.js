import crypto from 'crypto';

const generateHash = (c, w) => {
  return crypto
    .createHash('sha256')
    .update(c + w)
    .digest('hex');
};

/**
 *
 * @param {string} c - challenge string
 * @param {integer} n - number of bits
 */
export const find = (c, n) => {
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
 *
 * @param {string} c - challenge string
 * @param {integer} n - number of bits
 * @param {integer} w - proof of work counter
 */
export const verify = (c, n, w) => {
  const hexChars = Math.floor(n / 4);
  const leadingZeros = ''.padStart(hexChars, '0');
  const hash = generateHash(c, w);

  return hash.substr(0, hexChars) === leadingZeros;
};
