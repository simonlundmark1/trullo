// src/middlewares/validationResultMiddleware.ts

import { RequestHandler } from 'express';

import { validationResult } from 'express-validator';

export const validationResultMiddleware: RequestHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return; // Return void explicitly
  }
  next();
};
