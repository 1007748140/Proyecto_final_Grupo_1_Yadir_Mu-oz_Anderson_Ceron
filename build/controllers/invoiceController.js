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
exports.InvoiceController = void 0;
const invoiceModel_1 = __importDefault(require("../models/invoiceModel"));
const paymentModel_1 = __importDefault(require("../models/paymentModel"));
const invoiceDetailModel_1 = __importDefault(require("../models/invoiceDetailModel"));
class InvoiceController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const invoice = yield invoiceModel_1.default.create(req.body);
                res.status(201).json(invoice);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req);
                const invoices = yield invoiceModel_1.default.findAll();
                res.status(200).json(invoices);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const invoice = yield invoiceModel_1.default.findByPk(req.params.id);
                if (!invoice) {
                    res.status(404).json({ error: 'Factura no encontrada' });
                    return;
                }
                res.status(200).json(invoice);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const invoice = yield invoiceModel_1.default.findByPk(req.params.id);
                if (!invoice) {
                    res.status(404).json({ error: 'Factura no encontrada' });
                    return;
                }
                yield invoice.update(req.body);
                res.status(200).json(invoice);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const invoice = yield invoiceModel_1.default.findByPk(req.params.id);
                if (!invoice) {
                    res.status(404).json({ error: 'Factura no encontrada' });
                    return;
                }
                yield paymentModel_1.default.destroy({ where: { idInvoice: req.params.id } });
                yield invoiceDetailModel_1.default.destroy({ where: { idInvoice: req.params.id } });
                yield invoice.destroy();
                res.status(204).send();
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
}
exports.InvoiceController = InvoiceController;
//# sourceMappingURL=invoiceController.js.map