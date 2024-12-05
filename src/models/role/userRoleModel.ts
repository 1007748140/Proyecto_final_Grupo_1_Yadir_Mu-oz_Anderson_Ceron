// src/models/role/userRoleModel.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/database';

class UserRole extends Model {
  public id!: number;

  public idUser!: number;

  public idRole!: number;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}

UserRole.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    idUser: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    idRole: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'roles',
        key: 'id',
      },
    },
  },
  {
    tableName: 'userRoles',
    sequelize,
    timestamps: true,
  },
);

export default UserRole;
