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
exports.InvoiceDetailController = void 0;
const express_validator_1 = require("express-validator");
const invoiceDetailModel_1 = __importDefault(require("../models/invoiceDetailModel"));
const invoiceModel_1 = __importDefault(require("../models/invoiceModel"));
const productModel_1 = __importDefault(require("../models/productModel"));
class InvoiceDetailController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    res.status(400).json({ errors: errors.array() });
                    return;
                }
                const invoice = yield invoiceModel_1.default.findByPk(req.body.idInvoice);
                if (!invoice) {
                    res.status(404).json({ error: 'Factura no encontrada' });
                    return;
                }
                const product = yield productModel_1.default.findByPk(req.body.idProduct);
                if (!product) {
                    res.status(404).json({ error: 'Producto no encontrado' });
                    return;
                }
                const detail = yield invoiceDetailModel_1.default.create(req.body);
                res.status(201).json(detail);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    getAll(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const details = yield invoiceDetailModel_1.default.findAll({
                    include: [
                        { model: invoiceModel_1.default },
                        { model: productModel_1.default },
                    ],
                    order: [['createdAt', 'DESC']],
                });
                res.status(200).json(details);
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
                const detail = yield invoiceDetailModel_1.default.findByPk(req.params.id, {
                    include: [
                        { model: invoiceModel_1.default },
                        { model: productModel_1.default },
                    ],
                });
                if (!detail) {
                    res.status(404).json({ error: 'Detalle no encontrado' });
                    return;
                }
                res.status(200).json(detail);
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
                const detail = yield invoiceDetailModel_1.default.findByPk(req.params.id);
                if (!detail) {
                    res.status(404).json({ error: 'Detalle no encontrado' });
                    return;
                }
                if (req.body.idInvoice) {
                    const invoice = yield invoiceModel_1.default.findByPk(req.body.idInvoice);
                    if (!invoice) {
                        res.status(404).json({ error: 'Factura no encontrada' });
                        return;
                    }
                }
                if (req.body.idProduct) {
                    const product = yield productModel_1.default.findByPk(req.body.idProduct);
                    if (!product) {
                        res.status(404).json({ error: 'Producto no encontrado' });
                        return;
                    }
                }
                yield detail.update(req.body);
                const updatedDetail = yield invoiceDetailModel_1.default.findByPk(detail.id, {
                    include: [
                        { model: invoiceModel_1.default },
                        { model: productModel_1.default },
                    ],
                });
                res.status(200).json(updatedDetail);
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
                const detail = yield invoiceDetailModel_1.default.findByPk(req.params.id);
                if (!detail) {
                    res.status(404).json({ error: 'Detalle no encontrado' });
                    return;
                }
                yield detail.destroy();
                res.status(204).send();
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
}
exports.InvoiceDetailController = InvoiceDetailController;
//# sourceMappingURL=invoiceDetailController.js.map