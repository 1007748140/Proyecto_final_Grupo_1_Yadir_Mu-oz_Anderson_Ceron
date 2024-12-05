// src/infra/deletePeopleSql.ts

import People from '../models/peopleModel';

export class DeletePeopleSql {
  async deletePeopleSql(userId: number) : Promise<number> {
    const user = await People.destroy({ where: { idUser: userId } });
    return user;
  }
}
