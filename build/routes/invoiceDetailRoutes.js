"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const invoiceDetailController_1 = require("../controllers/invoiceDetailController");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const router = (0, express_1.Router)();
const invoiceDetailController = new invoiceDetailController_1.InvoiceDetailController();
const createDetailValidations = [
    (0, express_validator_1.body)('idInvoice')
        .isInt()
        .withMessage('ID de factura debe ser un número válido'),
    (0, express_validator_1.body)('idProduct')
        .isInt()
        .withMessage('ID de producto debe ser un número válido'),
    (0, express_validator_1.body)('quantity')
        .isInt({ min: 1 })
        .withMessage('La cantidad debe ser un número entero positivo'),
];
const updateDetailValidations = [
    (0, express_validator_1.body)('quantity')
        .optional()
        .isInt({ min: 1 })
        .withMessage('La cantidad debe ser un número entero positivo'),
];
const idParamValidation = [
    (0, express_validator_1.param)('id').isInt().withMessage('El ID debe ser un número válido'),
];
router.post('/api/invoice-details', [authMiddleware_1.default, ...createDetailValidations], invoiceDetailController.create.bind(invoiceDetailController));
router.get('/api/invoice-details', authMiddleware_1.default, invoiceDetailController.getAll.bind(invoiceDetailController));
router.get('/api/invoice-details/:id', [authMiddleware_1.default, ...idParamValidation], invoiceDetailController.getById.bind(invoiceDetailController));
router.put('/api/invoice-details/:id', [authMiddleware_1.default, ...updateDetailValidations, ...idParamValidation], invoiceDetailController.update.bind(invoiceDetailController));
router.delete('/api/invoice-details/:id', [authMiddleware_1.default, ...idParamValidation], invoiceDetailController.delete.bind(invoiceDetailController));
exports.default = router;
//# sourceMappingURL=invoiceDetailRoutes.js.map