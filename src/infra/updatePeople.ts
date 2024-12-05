// src/infra/updatePeople.ts
import People from '../models/peopleModel';

export class UpdatePeopleSql {
  async updatePeopleSql(data: {
    idUser?: number;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    phone?: string;
    idAddress?: number;
  }, userId: number): Promise<[number, People[]]> {
    console.log(data, 'data');
    const user = await People.update(data, {
      where: { idUser: userId },
      returning: true,
    });
    return user;
  }
}
