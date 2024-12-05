// src/infra/deleteUserSql.ts

import User from '../models/userModel';

export class DeleteUserSql {
  async deleteUserSql(id: number): Promise<number> {
    const user = await User.destroy({ where: { id } });
    return user;
  }
}
