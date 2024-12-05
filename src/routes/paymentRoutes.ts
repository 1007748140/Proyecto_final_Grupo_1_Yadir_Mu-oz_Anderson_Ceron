// src/routes/paymentRoutes.ts

import { Router } from 'express';
import { body, param } from 'express-validator';
import { PaymentController } from '../controllers/paymentController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();
const paymentController = new PaymentController();

// Validaciones
const createPaymentValidations = [
  body('idInvoice')
    .isInt()
    .withMessage('ID de factura debe ser un número válido'),
  body('amount')
    .isFloat({ min: 0.01 })
    .withMessage('El monto debe ser un número positivo mayor a 0'),
  body('status')
    .optional()
    .isIn(['pending', 'success', 'failed'])
    .withMessage('Estado de pago inválido'),
  body('paymentDate')
    .optional()
    .isISO8601()
    .withMessage('Fecha de pago inválida'),
];

const updatePaymentValidations = [
  body('amount')
    .optional()
    .isFloat({ min: 0.01 })
    .withMessage('El monto debe ser un número positivo mayor a 0'),
  body('status')
    .optional()
    .isIn(['pending', 'success', 'failed'])
    .withMessage('Estado de pago inválido'),
  body('paymentDate')
    .optional()
    .isISO8601()
    .withMessage('Fecha de pago inválida'),
];

const idParamValidation = [
  param('id').isInt().withMessage('El ID debe ser un número válido'),
];

router.post('/api/payments',
  [authMiddleware, ...createPaymentValidations],
  paymentController.create.bind(paymentController));

router.get('/api/payments',
  authMiddleware,
  paymentController.getAll.bind(paymentController));

router.get('/api/payments/:id',
  [authMiddleware, ...idParamValidation],
  paymentController.getById.bind(paymentController));

router.put('/api/payments/:id',
  [authMiddleware, ...updatePaymentValidations, ...idParamValidation],
  paymentController.update.bind(paymentController));

router.delete('/api/payments/:id',
  [authMiddleware, ...idParamValidation],
  paymentController.delete.bind(paymentController));

export default router;
