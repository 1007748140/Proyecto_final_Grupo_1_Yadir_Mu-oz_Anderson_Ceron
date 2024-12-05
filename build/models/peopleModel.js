"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class People extends sequelize_1.Model {
}
People.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    idUser: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        },
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: true,
    },
    middleName: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: true,
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: true,
    },
    phone: {
        type: sequelize_1.DataTypes.STRING(12),
        allowNull: true,
    },
    idAddress: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
}, {
    tableName: 'people',
    sequelize: database_1.default,
    timestamps: true,
});
exports.default = People;
//# sourceMappingURL=peopleModel.js.map