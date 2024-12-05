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
exports.UserRoleController = void 0;
const express_validator_1 = require("express-validator");
const userRoleService_1 = require("../services/userRoleService");
const userModel_1 = __importDefault(require("../models/userModel"));
const roleModel_1 = __importDefault(require("../models/roleModel"));
class UserRoleController {
    constructor() {
        this.userRoleService = new userRoleService_1.UserRoleService();
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    res.status(400).json({ errors: errors.array() });
                    return;
                }
                const user = yield userModel_1.default.findByPk(req.body.idUser);
                if (!user) {
                    res.status(404).json({ error: 'Usuario no encontrado' });
                    return;
                }
                const role = yield roleModel_1.default.findByPk(req.body.idRole);
                if (!role) {
                    res.status(404).json({ error: 'Rol no encontrado' });
                    return;
                }
                const existingUserRoles = yield this.userRoleService.getUserRoles(req.body.idUser);
                const roleExists = existingUserRoles.some((ur) => ur.idRole === req.body.idRole);
                if (roleExists) {
                    res.status(400).json({ error: 'El usuario ya tiene asignado este rol' });
                    return;
                }
                const userRole = yield this.userRoleService.create(req.body);
                res.status(201).json(userRole);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    getUserRoles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    res.status(400).json({ errors: errors.array() });
                    return;
                }
                const user = yield userModel_1.default.findByPk(req.params.userId);
                if (!user) {
                    res.status(404).json({ error: 'Usuario no encontrado' });
                    return;
                }
                const userRoles = yield this.userRoleService.getUserRoles(Number(req.params.userId));
                res.status(200).json(userRoles);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    countUserRoles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    res.status(400).json({ errors: errors.array() });
                    return;
                }
                const user = yield userModel_1.default.findByPk(req.params.userId);
                if (!user) {
                    res.status(404).json({ error: 'Usuario no encontrado' });
                    return;
                }
                const count = yield this.userRoleService.countUserRoles(Number(req.params.userId));
                res.status(200).json({ count });
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    updateMultipleRoles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    res.status(400).json({ errors: errors.array() });
                    return;
                }
                const user = yield userModel_1.default.findByPk(req.params.userId);
                if (!user) {
                    res.status(404).json({ error: 'Usuario no encontrado' });
                    return;
                }
                const roles = yield roleModel_1.default.findAll({
                    where: { id: req.body.roleIds },
                });
                if (roles.length !== req.body.roleIds.length) {
                    res.status(400).json({
                        error: 'Uno o más roles no existen',
                        found: roles.length,
                        requested: req.body.roleIds.length,
                    });
                    return;
                }
                const uniqueRoleIds = new Set(req.body.roleIds);
                if (uniqueRoleIds.size !== req.body.roleIds.length) {
                    res.status(400).json({ error: 'La lista contiene roles duplicados' });
                    return;
                }
                yield this.userRoleService.updateMultipleRoles(Number(req.params.userId), req.body.roleIds);
                const updatedRoles = yield this.userRoleService.getUserRoles(Number(req.params.userId));
                res.status(200).json({
                    message: 'Roles actualizados exitosamente',
                    roles: updatedRoles,
                });
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
}
exports.UserRoleController = UserRoleController;
//# sourceMappingURL=userRoleController.js.map