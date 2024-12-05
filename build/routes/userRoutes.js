"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const register_1 = require("../controllers/register");
const login_1 = require("../controllers/login");
const getProfile_1 = require("../controllers/getProfile");
const updateProfile_1 = require("../controllers/updateProfile");
const deleteProfile_1 = require("../controllers/deleteProfile");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const router = (0, express_1.Router)();
router.post('/api/users/register', [
    (0, express_validator_1.body)('firstName').notEmpty().withMessage('El nombre es requerido'),
    (0, express_validator_1.body)('middleName').optional(),
    (0, express_validator_1.body)('lastName').notEmpty().withMessage('El apellido es requerido'),
    (0, express_validator_1.body)('phone').optional().matches(/^\d{10}$/).withMessage('El teléfono debe tener entre 10 dígitos'),
    (0, express_validator_1.body)('email').isEmail().withMessage('Debe ser un email válido'),
    (0, express_validator_1.body)('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    (0, express_validator_1.body)('idAddress').notEmpty().isInt().withMessage('La dirección es requerida'),
], register_1.register);
router.post('/api/users/login', [
    (0, express_validator_1.body)('email').isEmail().withMessage('Debe ser un email válido'),
    (0, express_validator_1.body)('password').notEmpty().withMessage('La contraseña es requerida'),
], login_1.login);
router.get('/api/users/profile', authMiddleware_1.default, getProfile_1.getProfile);
router.put('/api/users/profile/:userId', [
    authMiddleware_1.default,
    (0, express_validator_1.body)('firstName').optional().notEmpty().withMessage('El nombre no puede estar vacío'),
    (0, express_validator_1.body)('middleName').optional(),
    (0, express_validator_1.body)('lastName').optional().notEmpty().withMessage('El apellido no puede estar vacío'),
    (0, express_validator_1.body)('phone').optional().matches(/^\d{10}$/).withMessage('El teléfono debe tener entre 10 dígitos'),
    (0, express_validator_1.body)('email').optional().isEmail().withMessage('Debe ser un email válido'),
    (0, express_validator_1.body)('password').optional().isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    (0, express_validator_1.body)('idAddress').optional().isInt().withMessage('La dirección debe ser un número válido'),
], updateProfile_1.updateProfile);
router.delete('/api/users/profile/:userId', authMiddleware_1.default, deleteProfile_1.deleteProfile);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map