"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _expressValidator = require("express-validator");

var _validateRequest = require("../utils/validate-request");

var _hashcash = require("../utils/hashcash");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post('/find', (0, _validateRequest.validateChallenge)(), (0, _validateRequest.validateNumberOfBits)(), function (req, res) {
  var errors = (0, _expressValidator.validationResult)(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  var _req$body = req.body,
      c = _req$body.c,
      n = _req$body.n;
  var answer = (0, _hashcash.find)(c, n);
  res.json(answer);
});
router.post('/verify', (0, _validateRequest.validateChallenge)(), (0, _validateRequest.validateNumberOfBits)(), (0, _validateRequest.validateProofOfWork)(), function (req, res) {
  var errors = (0, _expressValidator.validationResult)(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  var _req$body2 = req.body,
      c = _req$body2.c,
      n = _req$body2.n,
      w = _req$body2.w;
  var valid = (0, _hashcash.verify)(c, n, w);
  res.json({
    valid: valid
  });
});
var _default = router;
exports["default"] = _default;