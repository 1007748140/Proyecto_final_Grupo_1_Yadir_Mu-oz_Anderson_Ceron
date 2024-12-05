"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const invoiceModel_1 = __importDefault(require("./invoiceModel"));
class Payment extends sequelize_1.Model {
}
Payment.init({
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
    amount: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    paymentDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('pending', 'success', 'failed'),
        defaultValue: 'pending',
    },
}, {
    tableName: 'payments',
    sequelize: database_1.default,
    timestamps: true,
});
Payment.belongsTo(invoiceModel_1.default, { foreignKey: 'idInvoice' });
invoiceModel_1.default.hasMany(Payment, { foreignKey: 'idInvoice' });
exports.default = Payment;
//# sourceMappingURL=paymentModel.js.map