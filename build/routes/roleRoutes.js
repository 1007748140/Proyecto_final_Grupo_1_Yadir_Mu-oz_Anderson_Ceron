"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const roleController_1 = require("../controllers/roleController");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const router = (0, express_1.Router)();
const roleController = new roleController_1.RoleController();
const roleValidations = [
    (0, express_validator_1.body)('roleName')
        .isString()
        .withMessage('El nombre del rol debe ser una cadena de texto')
        .trim()
        .notEmpty()
        .withMessage('El nombre del rol es requerido')
        .isLength({ min: 3, max: 45 })
        .withMessage('El nombre del rol debe tener entre 3 y 45 caracteres')
        .matches(/^[a-zA-Z_]+$/)
        .withMessage('El nombre del rol solo puede contener letras y guiones bajos'),
];
const idParamValidation = [
    (0, express_validator_1.param)('id')
        .isInt()
        .withMessage('El ID debe ser un número válido'),
];
const nameParamValidation = [
    (0, express_validator_1.param)('name')
        .isString()
        .trim()
        .notEmpty()
        .withMessage('El nombre del rol es requerido'),
];
router.get('/api/roles', roleController.getAll.bind(roleController));
router.get('/api/roles/count', roleController.count.bind(roleController));
router.get('/api/roles/:id', idParamValidation, roleController.getById.bind(roleController));
router.get('/api/roles/name/:name', nameParamValidation, roleController.getByName.bind(roleController));
router.post('/api/roles', [authMiddleware_1.default, ...roleValidations], roleController.create.bind(roleController));
router.put('/api/roles/:id', [authMiddleware_1.default, ...roleValidations, ...idParamValidation], roleController.update.bind(roleController));
router.delete('/api/roles/:id', [authMiddleware_1.default, ...idParamValidation], roleController.delete.bind(roleController));
exports.default = router;
//# sourceMappingURL=roleRoutes.js.map