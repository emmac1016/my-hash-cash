"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateProofOfWork = exports.validateNumberOfBits = exports.validateChallenge = void 0;

var _expressValidator = require("express-validator");

var validateChallenge = function validateChallenge() {
  return (0, _expressValidator.body)('c').isString().withMessage('must be a string');
};

exports.validateChallenge = validateChallenge;

var validateNumberOfBits = function validateNumberOfBits() {
  return (0, _expressValidator.body)('n').custom(function (value) {
    return value % 4 === 0;
  }).withMessage('must be an integer that is a multiple of 4');
};

exports.validateNumberOfBits = validateNumberOfBits;

var validateProofOfWork = function validateProofOfWork() {
  return (0, _expressValidator.body)('w').custom(function (value) {
    return Number.isInteger(value);
  }).withMessage('must be an integer');
};

exports.validateProofOfWork = validateProofOfWork;