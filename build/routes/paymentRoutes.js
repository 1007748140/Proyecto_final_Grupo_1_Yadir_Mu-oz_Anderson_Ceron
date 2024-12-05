"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const paymentController_1 = require("../controllers/paymentController");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const router = (0, express_1.Router)();
const paymentController = new paymentController_1.PaymentController();
const createPaymentValidations = [
    (0, express_validator_1.body)('idInvoice')
        .isInt()
        .withMessage('ID de factura debe ser un número válido'),
    (0, express_validator_1.body)('amount')
        .isFloat({ min: 0.01 })
        .withMessage('El monto debe ser un número positivo mayor a 0'),
    (0, express_validator_1.body)('status')
        .optional()
        .isIn(['pending', 'success', 'failed'])
        .withMessage('Estado de pago inválido'),
    (0, express_validator_1.body)('paymentDate')
        .optional()
        .isISO8601()
        .withMessage('Fecha de pago inválida'),
];
const updatePaymentValidations = [
    (0, express_validator_1.body)('amount')
        .optional()
        .isFloat({ min: 0.01 })
        .withMessage('El monto debe ser un número positivo mayor a 0'),
    (0, express_validator_1.body)('status')
        .optional()
        .isIn(['pending', 'success', 'failed'])
        .withMessage('Estado de pago inválido'),
    (0, express_validator_1.body)('paymentDate')
        .optional()
        .isISO8601()
        .withMessage('Fecha de pago inválida'),
];
const idParamValidation = [
    (0, express_validator_1.param)('id').isInt().withMessage('El ID debe ser un número válido'),
];
router.post('/api/payments', [authMiddleware_1.default, ...createPaymentValidations], paymentController.create.bind(paymentController));
router.get('/api/payments', authMiddleware_1.default, paymentController.getAll.bind(paymentController));
router.get('/api/payments/:id', [authMiddleware_1.default, ...idParamValidation], paymentController.getById.bind(paymentController));
router.put('/api/payments/:id', [authMiddleware_1.default, ...updatePaymentValidations, ...idParamValidation], paymentController.update.bind(paymentController));
router.delete('/api/payments/:id', [authMiddleware_1.default, ...idParamValidation], paymentController.delete.bind(paymentController));
exports.default = router;
//# sourceMappingURL=paymentRoutes.js.map