"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const invoiceModel_1 = __importDefault(require("./invoiceModel"));
const productModel_1 = __importDefault(require("./productModel"));
class InvoiceDetail extends sequelize_1.Model {
}
InvoiceDetail.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    idInvoice: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: invoiceModel_1.default,
            key: 'id',
        },
    },
    idProduct: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: productModel_1.default,
            key: 'id',
        },
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
}, {
    tableName: 'invoiceDetails',
    sequelize: database_1.default,
    timestamps: true,
});
InvoiceDetail.belongsTo(invoiceModel_1.default, { foreignKey: 'idInvoice' });
InvoiceDetail.belongsTo(productModel_1.default, { foreignKey: 'idProduct' });
invoiceModel_1.default.hasMany(InvoiceDetail, { foreignKey: 'idInvoice' });
productModel_1.default.hasMany(InvoiceDetail, { foreignKey: 'idProduct' });
exports.default = InvoiceDetail;
//# sourceMappingURL=invoiceDetailModel.js.map