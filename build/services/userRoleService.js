"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoleService = void 0;
const userRoleModel_1 = __importDefault(require("../models/userRoleModel"));
const roleModel_1 = __importDefault(require("../models/roleModel"));
class UserRoleService {
    create(userRoleData) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRole = yield userRoleModel_1.default.create(userRoleData);
            return userRole;
        });
    }
    getUserRoles(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRoles = yield userRoleModel_1.default.findAll({
                where: { idUser: userId },
                include: [{ model: roleModel_1.default }],
            });
            return userRoles;
        });
    }
    countUserRoles(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return userRoleModel_1.default.count({
                where: { idUser: userId },
            });
        });
    }
    updateMultipleRoles(userId, roleIds) {
        return __awaiter(this, void 0, void 0, function* () {
            yield userRoleModel_1.default.destroy({
                where: { idUser: userId },
            });
            const userRoles = roleIds.map((roleId) => ({
                idUser: userId,
                idRole: roleId,
            }));
            yield userRoleModel_1.default.bulkCreate(userRoles);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRole = yield userRoleModel_1.default.findByPk(id);
            if (!userRole) {
                throw new Error('Relación usuario-rol no encontrada');
            }
            yield userRole.destroy();
        });
    }
}
exports.UserRoleService = UserRoleService;
//# sourceMappingURL=userRoleService.js.map