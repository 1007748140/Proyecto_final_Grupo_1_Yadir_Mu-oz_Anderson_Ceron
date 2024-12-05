"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const userModel_1 = __importDefault(require("./userModel"));
class Invoice extends sequelize_1.Model {
}
Invoice.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    idUser: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: userModel_1.default,
            key: 'id',
        },
    },
    total: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
    },
}, {
    tableName: 'invoices',
    sequelize: database_1.default,
    timestamps: true,
});
Invoice.belongsTo(userModel_1.default, { foreignKey: 'idUser' });
userModel_1.default.hasMany(Invoice, { foreignKey: 'idUser' });
exports.default = Invoice;
//# sourceMappingURL=invoiceModel.js.map