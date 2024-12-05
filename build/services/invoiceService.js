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
exports.InvoiceService = void 0;
const sequelize_1 = require("sequelize");
const invoiceModel_1 = __importDefault(require("../models/invoiceModel"));
const paymentModel_1 = __importDefault(require("../models/paymentModel"));
const userModel_1 = __importDefault(require("../models/userModel"));
const invoiceDetailModel_1 = __importDefault(require("../models/invoiceDetailModel"));
const productModel_1 = __importDefault(require("../models/productModel"));
class InvoiceService {
    getTotalPaymentsByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield paymentModel_1.default.findOne({
                where: {
                    '$Invoice.idUser$': userId,
                },
                include: [{
                        model: invoiceModel_1.default,
                        required: true,
                    }],
                attributes: [
                    [sequelize_1.Sequelize.fn('SUM', sequelize_1.Sequelize.col('amount')), 'total'],
                ],
                raw: true,
            });
            return Number(result === null || result === void 0 ? void 0 : result.total) || 0;
        });
    }
    getUserWithInvoicesAndPayments(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return userModel_1.default.findByPk(userId, {
                include: [{
                        model: invoiceModel_1.default,
                        include: [{ model: paymentModel_1.default }],
                    }],
            });
        });
    }
    getInvoicePaymentsStatus(invoiceId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield paymentModel_1.default.findAll({
                where: { idInvoice: invoiceId },
                attributes: [
                    'status',
                    [sequelize_1.Sequelize.fn('SUM', sequelize_1.Sequelize.col('amount')), 'total'],
                ],
                group: ['status'],
                raw: true,
            });
        });
    }
    getInvoiceProducts(invoiceId) {
        return __awaiter(this, void 0, void 0, function* () {
            const details = yield invoiceDetailModel_1.default.findAll({
                where: { idInvoice: invoiceId },
                include: [{ model: productModel_1.default }],
                attributes: ['quantity'],
            });
            const total = details.reduce((sum, detail) => {
                if (detail.Product) {
                    return sum + (detail.quantity * detail.Product.price);
                }
                return sum;
            }, 0);
            return { details, total };
        });
    }
    getPendingPayments(invoiceId) {
        return __awaiter(this, void 0, void 0, function* () {
            return paymentModel_1.default.findAll({
                where: {
                    idInvoice: invoiceId,
                    status: 'pending',
                },
            });
        });
    }
    updatePaymentStatus(paymentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const payment = yield paymentModel_1.default.findByPk(paymentId);
            if (!payment)
                throw new Error('Pago no encontrado');
            yield payment.update({ status: 'success' });
            return payment;
        });
    }
    getInvoiceTotalWithDiscount(invoiceId, discountPercent) {
        return __awaiter(this, void 0, void 0, function* () {
            const invoice = yield invoiceModel_1.default.findByPk(invoiceId);
            if (!invoice)
                throw new Error('Factura no encontrada');
            const discount = (invoice.total * discountPercent) / 100;
            return invoice.total - discount;
        });
    }
    getUserInvoicesWithPayments(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return invoiceModel_1.default.findAll({
                where: { idUser: userId },
                include: [{ model: paymentModel_1.default }],
            });
        });
    }
    isInvoiceFullyPaid(invoiceId) {
        return __awaiter(this, void 0, void 0, function* () {
            const invoice = yield invoiceModel_1.default.findByPk(invoiceId);
            if (!invoice)
                throw new Error('Factura no encontrada');
            const result = yield paymentModel_1.default.findOne({
                where: {
                    idInvoice: invoiceId,
                    status: 'success',
                },
                attributes: [
                    [sequelize_1.Sequelize.fn('SUM', sequelize_1.Sequelize.col('amount')), 'total'],
                ],
                raw: true,
            });
            const totalPaid = Number(result === null || result === void 0 ? void 0 : result.total) || 0;
            return totalPaid >= invoice.total;
        });
    }
    getInvoiceTotalWithTaxes(invoiceId, taxRate) {
        return __awaiter(this, void 0, void 0, function* () {
            const invoice = yield invoiceModel_1.default.findByPk(invoiceId);
            if (!invoice)
                throw new Error('Factura no encontrada');
            const tax = (invoice.total * taxRate) / 100;
            return invoice.total + tax;
        });
    }
}
exports.InvoiceService = InvoiceService;
//# sourceMappingURL=invoiceService.js.map