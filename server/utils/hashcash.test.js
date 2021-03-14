import { find, verify } from './hashcash';

test('find: valid challenge string and number of bits', () => {
  const ret = find('iBeat', 16);
  expect(ret).toStrictEqual({
    w: 62073,
    match: 'iBeat62073',
    hash: '0000d4ab4f89e8d1cd021a04151a280e4c76d487e04074a232bb0a8dec4a74cf',
  });
});

test('find: invalid challenge string', () => {
  try {
    find(125, 16);
  } catch (e) {
    expect(e.message).toBe('Invalid parameters');
  }
});

test('find: invalid number of bits', () => {
  try {
    find('bits');
  } catch (e) {
    expect(e.message).toBe('Invalid parameters');
  }
});

test('verify: returns true for correct combo of challenge string, number of bits, and proof of work', () => {
  const ret = verify('iBeat', 16, 62073);
  expect(ret).toBe(true);
});

test('verify: returns false for correct combo of challenge string, number of bits, and incorrect proof of work', () => {
  const ret = verify('iBeat', 16, 1234);
  expect(ret).toBe(false);
});

test('find: invalid challenge string', () => {
  try {
    find(125, 16);
  } catch (e) {
    expect(e.message).toBe('Invalid parameters');
  }
});

test('find: invalid number of bits', () => {
  try {
    find('bits');
  } catch (e) {
    expect(e.message).toBe('Invalid parameters');
  }
});

test('find: invalid proof of work', () => {
  try {
    find('bits', 12);
  } catch (e) {
    expect(e.message).toBe('Invalid parameters');
  }
});
