// src/infra/getUserProfileByUserIdSql.ts

import User from '../models/userModel';

export class GetUserProfileSql {
  async getUserProfileSql(userId: number): Promise<User | null> {
    const user = await User.findByPk(userId, {
      attributes: ['id', 'email'],
    });
    return user;
  }
}
