// src/models/invoiceModel.ts

import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import User from './userModel';

class Invoice extends Model {
  public id!: number;

  public idUser!: number;

  public total!: number;
}

Invoice.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  idUser: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
  },
}, {
  tableName: 'invoices',
  sequelize,
  timestamps: true,
});

Invoice.belongsTo(User, { foreignKey: 'idUser' });
User.hasMany(Invoice, { foreignKey: 'idUser' });

export default Invoice;
