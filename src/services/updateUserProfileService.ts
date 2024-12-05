// src/services/updateUserProfileService.ts

import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { GetUserProfileSql } from '../infra/getUserProfileByUserIdSql';
import { UpdateUserSql } from '../infra/updateUser';
import { UpdatePeopleSql } from '../infra/updatePeople';

dotenv.config();

export const updateUserProfile = async (
  userId: number,
  updateData: Partial<{
    firstName: string;
    middleName: string;
    lastName: string;
    phone: string;
    email: string;
    password: string;
    idAddress: number;
  }>,
): Promise<any> => {
  // Validaciones iniciales
  if (!userId) {
    throw new Error('ID de usuario requerido');
  }

  if (updateData.email) {
    throw new Error('No se permite actualizar el correo electrónico');
  }

  if (updateData.phone && !/^\d{10}$/.test(updateData.phone)) {
    throw new Error('El teléfono debe contener exactamente 10 dígitos numéricos');
  }

  const user = new GetUserProfileSql();
  const userResponse = await user.getUserProfileSql(userId);
  if (!userResponse) {
    throw new Error('Usuario no encontrado');
  }

  interface UpdateUser {
    user: {
      password?: string;
    },
    people: {
      idUser?: number;
      firstName?: string;
      middleName?: string;
      lastName?: string;
      phone?: string;
      idAddress?: number;
    }
  }

  const {
    firstName,
    middleName,
    lastName,
    phone,
    password,
    idAddress,
  } = updateData;

  let passwordFormat = '';
  if (password) {
    passwordFormat = await bcrypt.hash(password, 10);
  }

  const data: UpdateUser = {
    user: {
      password: passwordFormat || undefined,
    },
    people: {
      idUser: userId,
      firstName,
      middleName,
      lastName,
      phone,
      idAddress,
    },
  };

  const updateUserData = new UpdateUserSql();
  const updatePeopleData = new UpdatePeopleSql();
  const updateUser = await updateUserData.updateUserSql(data.user, userId);
  await updatePeopleData.updatePeopleSql(data.people, userId);
  return updateUser;
};
