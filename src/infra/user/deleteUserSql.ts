// src/infra/user/deleteUserSql.ts

import User from '../../models/user/userModel';

export class DeleteUserSql {
  async deleteUserSql(id: number): Promise<number> {
    const user = await User.destroy({ where: { id } });
    return user;
  }
}
