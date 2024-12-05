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
exports.RoleService = void 0;
const roleModel_1 = __importDefault(require("../models/roleModel"));
class RoleService {
    create(roleData) {
        return __awaiter(this, void 0, void 0, function* () {
            const role = yield roleModel_1.default.create(roleData);
            return role;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const roles = yield roleModel_1.default.findAll();
            return roles;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const role = yield roleModel_1.default.findByPk(id);
            if (!role) {
                throw new Error('Rol no encontrado');
            }
            return role;
        });
    }
    getByName(roleName) {
        return __awaiter(this, void 0, void 0, function* () {
            const role = yield roleModel_1.default.findOne({ where: { roleName } });
            if (!role) {
                throw new Error('Rol no encontrado');
            }
            return role;
        });
    }
    update(id, roleData) {
        return __awaiter(this, void 0, void 0, function* () {
            const role = yield this.getById(id);
            if (!role) {
                throw new Error('Rol no encontrado');
            }
            yield role.update(roleData);
            return role;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const role = yield this.getById(id);
            if (!role) {
                throw new Error('Rol no encontrado');
            }
            yield role.destroy();
        });
    }
    count() {
        return __awaiter(this, void 0, void 0, function* () {
            return roleModel_1.default.count();
        });
    }
}
exports.RoleService = RoleService;
//# sourceMappingURL=roleService.js.map