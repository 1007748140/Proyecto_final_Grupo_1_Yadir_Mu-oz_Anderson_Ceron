// src/controllers/people/getProfile.ts
import { Request, Response } from 'express';
import { GetUserProfile } from '../../services/user/getUserProfileService';

export const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user?.id) {
      throw new Error('Usuario no autenticado');
    }

    const userProfile = new GetUserProfile();
    const user = await userProfile.getUserProfile(req.user.id);

    res.status(200).json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          profile: {
            firstName: user.firstName,
            middleName: user.middleName,
            lastName: user.lastName,
            phone: user.phone,
            idAddress: user.idAddress,
          },
        },
      },
    });
  } catch (error: any) {
    console.error('Error en getProfile controller:', error);
    res.status(400).json({
      success: false,
      error: error.message || 'Error al obtener el perfil del usuario',
    });
  }
};
