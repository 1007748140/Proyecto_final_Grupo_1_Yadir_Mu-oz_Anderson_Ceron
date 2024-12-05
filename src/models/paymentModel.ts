// src/models/paymentModel.ts

import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Invoice from './invoiceModel';

class Payment extends Model {
  public id!: number;

  public idInvoice!: number;

  public amount!: number;

  public paymentDate!: Date;

  public status!: string;

  public total?: number; // Añadimos esta propiedad
}

Payment.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  idInvoice: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      model: Invoice,
      key: 'id',
    },
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  paymentDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  status: {
    type: DataTypes.ENUM('pending', 'success', 'failed'),
    defaultValue: 'pending',
  },
}, {
  tableName: 'payments',
  sequelize,
  timestamps: true,
});

Payment.belongsTo(Invoice, { foreignKey: 'idInvoice' });
Invoice.hasMany(Payment, { foreignKey: 'idInvoice' });

export default Payment;
