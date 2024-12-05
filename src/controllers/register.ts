// src/controllers/register.ts

import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { registerUser } from '../services/registerService';

export const register = async (req: Request, res: Response) : Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    console.log(req.body, 'body');
    const user = await registerUser(req.body);
    res.status(201).json({ message: 'Usuario registrado', user });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
