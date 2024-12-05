// src/services/registerService.ts
import bcrypt from 'bcryptjs';
import { GetLoginSql } from '../infra/loginSql';
import { CreateUserSql } from '../infra/createUser';
import { CreatePeopleSql } from '../infra/createPeople';

export const registerUser = async (userData: {
  firstName: string;
  middleName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  idAddress: number;
}): Promise<any> => {
  const {
    firstName, middleName, lastName, phone, email, password, idAddress,
  } = userData;

  // Verificamos si el usuario ya existe antes de registrarlo
  const userSelect = new GetLoginSql();
  const existingUser = await userSelect.getLoginSql(email);
  if (existingUser) {
    throw new Error('El usuario ya existe');
  }

  // Hashear la contraseña
  const hashedPassword = await bcrypt.hash(password, 10);

  // Creamos el usuario primero
  const createUser = new CreateUserSql();
  const user = await createUser.createUserSql({
    email,
    password: hashedPassword,
  });

  // Creamos el registro de people con el ID del usuario ya creado
  const createPeopleSql = new CreatePeopleSql();
  const peopleData = {
    idUser: user.dataValues.id,
    firstName,
    middleName,
    lastName,
    phone,
    idAddress,
  };

  const people = await createPeopleSql.createPeopleSql(peopleData);

  const response = {
    userId: user.dataValues.id,
    peopleId: people.dataValues.id,
  };
  return response;
};
