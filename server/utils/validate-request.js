import { body } from 'express-validator';

export const validateChallenge = () => {
  return body('c').isString().withMessage('must be a string');
};

export const validateNumberOfBits = () => {
  return body('n')
    .custom((value) => {
      return value % 4 === 0;
    })
    .withMessage('must be an integer that is a multiple of 4');
};

export const validateProofOfWork = () => {
  return body('w')
    .custom((value) => {
      return Number.isInteger(value);
    })
    .withMessage('must be an integer');
};
