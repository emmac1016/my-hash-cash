import express from 'express';
import { validationResult } from 'express-validator';
import {
  validateChallenge,
  validateNumberOfBits,
  validateProofOfWork,
} from '../utils/validate-request';
import { find, verify } from '../utils/hashcash';

const router = express.Router();

router.post(
  '/find',
  validateChallenge(),
  validateNumberOfBits(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { c, n } = req.body;
    const answer = find(c, n);

    res.json(answer);
  }
);

router.post(
  '/verify',
  validateChallenge(),
  validateNumberOfBits(),
  validateProofOfWork(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { c, n, w } = req.body;
    const valid = verify(c, n, w);

    res.json({ valid });
  }
);

export default router;
