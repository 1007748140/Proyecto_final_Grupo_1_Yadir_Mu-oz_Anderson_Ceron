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
const express_1 = require("express");
const invoiceController_1 = require("../controllers/invoiceController");
const invoiceService_1 = require("../services/invoiceService");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const router = (0, express_1.Router)();
const invoiceController = new invoiceController_1.InvoiceController();
const invoiceService = new invoiceService_1.InvoiceService();
router.post('/api/invoices', authMiddleware_1.default, invoiceController.create.bind(invoiceController));
router.get('/api/invoices', authMiddleware_1.default, invoiceController.getAll.bind(invoiceController));
router.get('/api/invoices/:id', authMiddleware_1.default, invoiceController.getById.bind(invoiceController));
router.put('/api/invoices/:id', authMiddleware_1.default, invoiceController.update.bind(invoiceController));
router.delete('/api/invoices/:id', authMiddleware_1.default, invoiceController.delete.bind(invoiceController));
router.get('/api/users/:userId/payments/total', authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const total = yield invoiceService.getTotalPaymentsByUser(Number(req.params.userId));
        res.json({ total });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
router.get('/api/users/:userId/invoices-payments', authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield invoiceService.getUserWithInvoicesAndPayments(Number(req.params.userId));
        res.json(data);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
router.get('/api/invoices/:invoiceId/payments-status', authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const status = yield invoiceService.getInvoicePaymentsStatus(Number(req.params.invoiceId));
        res.json(status);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
router.get('/api/invoices/:invoiceId/products', authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield invoiceService.getInvoiceProducts(Number(req.params.invoiceId));
        res.json(data);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
router.get('/api/invoices/:invoiceId/pending-payments', authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payments = yield invoiceService.getPendingPayments(Number(req.params.invoiceId));
        res.json(payments);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
router.put('/api/payments/:paymentId/success', authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payment = yield invoiceService.updatePaymentStatus(Number(req.params.paymentId));
        res.json(payment);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
router.get('/api/invoices/:invoiceId/total-with-discount', authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const discountPercent = Number(req.query.discount) || 0;
        const total = yield invoiceService.getInvoiceTotalWithDiscount(Number(req.params.invoiceId), discountPercent);
        res.json({ total });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
router.get('/api/users/:userId/invoices-with-payments', authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const invoices = yield invoiceService.getUserInvoicesWithPayments(Number(req.params.userId));
        res.json(invoices);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
router.get('/api/invoices/:invoiceId/is-paid', authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isPaid = yield invoiceService.isInvoiceFullyPaid(Number(req.params.invoiceId));
        res.json({ isPaid });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
router.get('/api/invoices/:invoiceId/total-with-taxes', authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taxRate = Number(req.query.taxRate) || 0;
        const total = yield invoiceService.getInvoiceTotalWithTaxes(Number(req.params.invoiceId), taxRate);
        res.json({ total });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
exports.default = router;
//# sourceMappingURL=invoiceRoutes.js.map