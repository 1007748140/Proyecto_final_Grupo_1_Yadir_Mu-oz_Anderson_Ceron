// src/models/invoiceDetailModel.ts

import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Invoice from './invoiceModel';
import Product from './productModel';

class InvoiceDetail extends Model {
  public id!: number;

  public idInvoice!: number;

  public idProduct!: number;

  public quantity!: number;
}

InvoiceDetail.init({
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
  idProduct: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      model: Product,
      key: 'id',
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
}, {
  tableName: 'invoiceDetails',
  sequelize,
  timestamps: true,
});

InvoiceDetail.belongsTo(Invoice, { foreignKey: 'idInvoice' });
InvoiceDetail.belongsTo(Product, { foreignKey: 'idProduct' });
Invoice.hasMany(InvoiceDetail, { foreignKey: 'idInvoice' });
Product.hasMany(InvoiceDetail, { foreignKey: 'idProduct' });

export default InvoiceDetail;
