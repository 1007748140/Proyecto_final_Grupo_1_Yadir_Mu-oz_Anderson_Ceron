// src/infra/user/loginSql.ts

import User from '../../models/user/userModel';

export class GetLoginSql {
  async getLoginSql(email: string) : Promise<User | null> {
    const user = await User.findOne({ where: { email } });
    return user;
  }
}
