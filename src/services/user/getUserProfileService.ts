// src/services/user/getUserProfileService.ts
import { UserByIdSql } from '../../infra/user/getDataByQuerySql';

export class GetUserProfile {
  async getUserProfile(userId: number): Promise<any> {
    try {
      const userQuery = new UserByIdSql();
      const userProfile = await userQuery.UserByIdSql(userId);

      if (!userProfile || userProfile.length === 0) {
        throw new Error('Usuario no encontrado');
      }

      return userProfile[0]; // Devolvemos solo el primer resultado
    } catch (error) {
      console.error('Error al obtener perfil:', error);
      throw new Error('Error al obtener la información del usuario');
    }
  }
}
