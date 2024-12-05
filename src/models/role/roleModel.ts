// src/models/role/roleModel.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/database';

class Role extends Model {
  public id!: number;

  public roleName!: string;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}

Role.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    roleName: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
  },
  {
    tableName: 'roles',
    sequelize,
    timestamps: true,
  },
);

export default Role;
