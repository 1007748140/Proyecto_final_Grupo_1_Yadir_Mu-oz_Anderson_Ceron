// src/infra/createUser.ts

import User from '../models/userModel';

export class CreateUserSql {
  async createUserSql(data:Partial<User>):Promise<User> {
    console.log(data, 'data');
    const user = await User.create(data);
    return user;
  }
}
