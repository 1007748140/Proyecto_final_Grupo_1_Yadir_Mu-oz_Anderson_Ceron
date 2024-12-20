// src/services/user/deleteUserProfileService.ts

import { DeletePeopleSql } from '../../infra/people/deletePeopleSql';
import { DeleteUserSql } from '../../infra/user/deleteUserSql';

export class DeleteUserProfile {
  async deleteUserProfile(userId: number): Promise<any> {
    if (!userId) {
      throw new Error('ID de usuario requerido');
    }

    try {
      const people = new DeletePeopleSql();
      const user = new DeleteUserSql();

      // Eliminar registros relacionados primero
      await Promise.all([
        people.deletePeopleSql(userId),
      ]);

      // Luego eliminar el usuario
      const responseUser = await user.deleteUserSql(userId);

      if (responseUser === 0) {
        throw new Error('Usuario no encontrado');
      }

      return responseUser;
    } catch (error: any) {
      throw new Error(error.message || 'Error al eliminar el perfil');
    }
  }
}
