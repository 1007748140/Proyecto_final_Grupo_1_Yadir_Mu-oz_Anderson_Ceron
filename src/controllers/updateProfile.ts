// src/controllers/updateProfile.ts

import { Request, Response } from 'express';
import { updateUserProfile } from '../services/updateUserProfileService';

export const updateProfile = async (req: Request, res: Response) : Promise<void> => {
  try {
    const userId = req.params ? req.params.userId : null;
    const user = await updateUserProfile(Number(userId), req.body);
    res.status(200).json({ message: 'Perfil actualizado', user });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
