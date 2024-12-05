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
exports.RoleController = void 0;
const express_validator_1 = require("express-validator");
const roleService_1 = require("../services/roleService");
const userRoleModel_1 = __importDefault(require("../models/userRoleModel"));
class RoleController {
    constructor() {
        this.roleService = new roleService_1.RoleService();
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    res.status(400).json({ errors: errors.array() });
                    return;
                }
                const existingRole = yield this.roleService.getByName(req.body.roleName).catch(() => null);
                if (existingRole) {
                    res.status(400).json({ error: 'Ya existe un rol con este nombre' });
                    return;
                }
                const role = yield this.roleService.create(req.body);
                res.status(201).json(role);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    getAll(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const roles = yield this.roleService.getAll();
                res.status(200).json(roles);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    res.status(400).json({ errors: errors.array() });
                    return;
                }
                const role = yield this.roleService.getById(Number(req.params.id));
                if (!role) {
                    res.status(404).json({ error: 'Rol no encontrado' });
                    return;
                }
                res.status(200).json(role);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    getByName(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    res.status(400).json({ errors: errors.array() });
                    return;
                }
                const role = yield this.roleService.getByName(req.params.name);
                if (!role) {
                    res.status(404).json({ error: 'Rol no encontrado' });
                    return;
                }
                res.status(200).json(role);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    count(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const count = yield this.roleService.count();
                res.status(200).json({ count });
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    res.status(400).json({ errors: errors.array() });
                    return;
                }
                const existingRole = yield this.roleService.getById(Number(req.params.id));
                if (!existingRole) {
                    res.status(404).json({ error: 'Rol no encontrado' });
                    return;
                }
                if (req.body.roleName !== existingRole.roleName) {
                    const roleWithName = yield this.roleService.getByName(req.body.roleName).catch(() => null);
                    if (roleWithName) {
                        res.status(400).json({ error: 'Ya existe un rol con este nombre' });
                        return;
                    }
                }
                const role = yield this.roleService.update(Number(req.params.id), req.body);
                res.status(200).json(role);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    res.status(400).json({ errors: errors.array() });
                    return;
                }
                const role = yield this.roleService.getById(Number(req.params.id));
                if (!role) {
                    res.status(404).json({ error: 'Rol no encontrado' });
                    return;
                }
                const usersWithRole = yield userRoleModel_1.default.count({
                    where: { idRole: req.params.id },
                });
                if (usersWithRole > 0) {
                    res.status(400).json({
                        error: 'No se puede eliminar el rol porque está asignado a usuarios',
                        usersCount: usersWithRole,
                    });
                    return;
                }
                yield this.roleService.delete(Number(req.params.id));
                res.status(200).json({ message: 'Rol eliminado exitosamente' });
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
}
exports.RoleController = RoleController;
//# sourceMappingURL=roleController.js.map