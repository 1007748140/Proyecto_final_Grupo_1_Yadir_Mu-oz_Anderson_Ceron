// src/infra/user/createUser.ts

import User from '../../models/user/userModel';

export class CreateUserSql {
  async createUserSql(data:Partial<User>):Promise<User> {
    console.log(data, 'data');
    const user = await User.create(data);
    return user;
  }
}
