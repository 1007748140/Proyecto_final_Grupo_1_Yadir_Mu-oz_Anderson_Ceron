// src/infra/createPeople.ts
import People from '../models/peopleModel';

export class CreatePeopleSql {
  async createPeopleSql(data: {
    idUser: number;
    firstName: string;
    middleName: string;
    lastName: string;
    phone: string;
    idAddress: number;
  }): Promise<People> {
    console.log(data, 'data');
    const user = await People.create(data);
    return user;
  }
}
