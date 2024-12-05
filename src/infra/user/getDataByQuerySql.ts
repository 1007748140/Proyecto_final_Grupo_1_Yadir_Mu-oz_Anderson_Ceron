// src/infra/user/getDataByQuerySql.ts

import { QueryTypes } from 'sequelize';
import sequelize from '../../config/database';

interface UserQueryResult {
  id: number;
  email: string;
  firstName: string;
  middleName: string;
  lastName: string;
  phone: string;
  idAddress: number;
}

export class UserByIdSql {
  async UserByIdSql(userId: number): Promise<UserQueryResult[]> {
    const query = `
      SELECT 
        users.id,
        users.email,
        people.firstName,
        people.middleName,
        people.lastName,
        people.phone,
        people.idAddress
      FROM users
      LEFT JOIN people ON people.idUser = users.id
      WHERE users.id = :userId
    `;
    try {
      const results: UserQueryResult[] = await sequelize.query(query, {
        replacements: { userId },
        type: QueryTypes.SELECT,
      });

      if (!results || results.length === 0) {
        throw new Error('Usuario no encontrado');
      }

      return results;
    } catch (error) {
      console.error('Error ejecutando la consulta:', error);
      throw new Error('Error al obtener la información del usuario');
    }
  }
}
