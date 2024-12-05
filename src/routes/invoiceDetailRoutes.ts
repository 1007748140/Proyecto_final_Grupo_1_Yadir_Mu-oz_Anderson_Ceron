// src/routes/invoiceDetailRoutes.ts

import { Router } from 'express';
import { body, param } from 'express-validator';
import { InvoiceDetailController } from '../controllers/invoiceDetailController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();
const invoiceDetailController = new InvoiceDetailController();

// Validaciones
const createDetailValidations = [
  body('idInvoice')
    .isInt()
    .withMessage('ID de factura debe ser un número válido'),
  body('idProduct')
    .isInt()
    .withMessage('ID de producto debe ser un número válido'),
  body('quantity')
    .isInt({ min: 1 })
    .withMessage('La cantidad debe ser un número entero positivo'),
];

const updateDetailValidations = [
  body('quantity')
    .optional()
    .isInt({ min: 1 })
    .withMessage('La cantidad debe ser un número entero positivo'),
];

const idParamValidation = [
  param('id').isInt().withMessage('El ID debe ser un número válido'),
];

router.post('/api/invoice-details',
  [authMiddleware, ...createDetailValidations],
  invoiceDetailController.create.bind(invoiceDetailController));

router.get('/api/invoice-details',
  authMiddleware,
  invoiceDetailController.getAll.bind(invoiceDetailController));

router.get('/api/invoice-details/:id',
  [authMiddleware, ...idParamValidation],
  invoiceDetailController.getById.bind(invoiceDetailController));

router.put('/api/invoice-details/:id',
  [authMiddleware, ...updateDetailValidations, ...idParamValidation],
  invoiceDetailController.update.bind(invoiceDetailController));

router.delete('/api/invoice-details/:id',
  [authMiddleware, ...idParamValidation],
  invoiceDetailController.delete.bind(invoiceDetailController));

export default router;
