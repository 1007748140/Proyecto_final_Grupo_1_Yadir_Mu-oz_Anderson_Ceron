// src/infra/loginSql.ts

import User from '../models/userModel';

export class GetLoginSql {
  async getLoginSql(email: string) : Promise<User | null> {
    const user = await User.findOne({ where: { email } });
    return user;
  }
}
