// src/models/peopleModel.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class People extends Model {
  public id!: number;

  public idUser!: number;

  public firstName!: string;

  public middleName!: string;

  public lastName!: string;

  public phone!: string;

  public idAddress!: number;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}

People.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED, // Cambiado a UNSIGNED
      autoIncrement: true,
      primaryKey: true,
    },
    idUser: {
      type: DataTypes.INTEGER.UNSIGNED, // Cambiado a UNSIGNED para coincidir con users
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    firstName: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    middleName: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING(12),
      allowNull: true,
    },
    idAddress: {
      type: DataTypes.INTEGER.UNSIGNED, // Cambiado a UNSIGNED para consistencia
      allowNull: false,
    },
  },
  {
    tableName: 'people',
    sequelize,
    timestamps: true,
  },
);

export default People;
