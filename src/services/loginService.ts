// src/services/loginService.ts

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { GetLoginSql } from '../infra/loginSql';

dotenv.config();

export const loginUser = async (loginData: { email: string; password: string }): Promise<any> => {
  const { email, password } = loginData;
  // Buscar el usuario por email
  const user = new GetLoginSql();
  const userResponse = await user.getLoginSql(email);
  console.log(userResponse, 'userResponse');
  if (!userResponse) {
    throw new Error('Usuario no encontrado');
  }

  // Verificar la contraseña
  const isMatch = await bcrypt.compare(password, userResponse.password);
  if (!isMatch) {
    throw new Error('Contraseña incorrecta');
  }

  // Generar JWT
  const token = jwt.sign({ id: userResponse.dataValues.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
  return token;
};
