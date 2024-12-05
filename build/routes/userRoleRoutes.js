"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const userRoleController_1 = require("../controllers/userRoleController");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const router = (0, express_1.Router)();
const userRoleController = new userRoleController_1.UserRoleController();
const createUserRoleValidations = [
    (0, express_validator_1.body)('idUser')
        .isInt({ min: 1 })
        .withMessage('ID de usuario debe ser un número entero positivo'),
    (0, express_validator_1.body)('idRole')
        .isInt({ min: 1 })
        .withMessage('ID de rol debe ser un número entero positivo'),
];
const updateMultipleRolesValidations = [
    (0, express_validator_1.param)('userId')
        .isInt({ min: 1 })
        .withMessage('ID de usuario debe ser un número entero positivo'),
    (0, express_validator_1.body)('roleIds')
        .isArray({ min: 1 })
        .withMessage('Debe proporcionar al menos un rol')
        .custom((value) => {
        if (!Array.isArray(value))
            return false;
        return value.every((id) => Number.isInteger(id) && id > 0);
    })
        .withMessage('Todos los IDs de roles deben ser números enteros positivos'),
];
const userIdParamValidation = [
    (0, express_validator_1.param)('userId')
        .isInt({ min: 1 })
        .withMessage('ID de usuario debe ser un número entero positivo'),
];
router.use(authMiddleware_1.default);
router.post('/api/user-roles', createUserRoleValidations, userRoleController.create.bind(userRoleController));
router.get('/api/users/:userId/roles', userIdParamValidation, userRoleController.getUserRoles.bind(userRoleController));
router.get('/api/users/:userId/roles/count', userIdParamValidation, userRoleController.countUserRoles.bind(userRoleController));
router.put('/api/users/:userId/roles', updateMultipleRolesValidations, userRoleController.updateMultipleRoles.bind(userRoleController));
exports.default = router;
//# sourceMappingURL=userRoleRoutes.js.map