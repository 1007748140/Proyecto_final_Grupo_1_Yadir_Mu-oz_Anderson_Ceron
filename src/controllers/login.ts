// src/controllers/login.ts

import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { loginUser } from '../services/loginService';

export const login = async (req: Request, res: Response) : Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    const token = await loginUser(req.body);
    res.status(200).json({ token });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
