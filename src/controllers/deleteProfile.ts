// src/controllers/deleteProfile.ts

import { Request, Response } from 'express';
import { DeleteUserProfile } from '../services/deleteUserProfileService';

export const deleteProfile = async (req: Request, res: Response) : Promise<void> => {
  try {
    const userId = req.params ? req.params.userId : null;
    const userProfile = new DeleteUserProfile();
    const user = await userProfile.deleteUserProfile(Number(userId));
    res.status(200).json({ user });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
