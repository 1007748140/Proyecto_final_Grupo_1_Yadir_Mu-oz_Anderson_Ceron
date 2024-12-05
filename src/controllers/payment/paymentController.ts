// src/controllers/payment/paymentController.ts

import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import Payment from '../../models/payment/paymentModel';

export class PaymentController {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      // Validación adicional de la fecha de pago
      if (!req.body.paymentDate) {
        req.body.paymentDate = new Date();
      }

      const payment = await Payment.create(req.body);
      res.status(201).json(payment);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAll(_req: Request, res: Response): Promise<void> {
    try {
      const payments = await Payment.findAll({
        order: [['createdAt', 'DESC']],
      });
      res.status(200).json(payments);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const payment = await Payment.findByPk(req.params.id);
      if (!payment) {
        res.status(404).json({ error: 'Pago no encontrado' });
        return;
      }
      res.status(200).json(payment);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const payment = await Payment.findByPk(req.params.id);
      if (!payment) {
        res.status(404).json({ error: 'Pago no encontrado' });
        return;
      }

      // Validaciones adicionales de negocio
      if (payment.status === 'success' && req.body.status === 'pending') {
        res.status(400).json({ error: 'No se puede cambiar un pago exitoso a pendiente' });
        return;
      }

      await payment.update(req.body);
      res.status(200).json(payment);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const payment = await Payment.findByPk(req.params.id);
      if (!payment) {
        res.status(404).json({ error: 'Pago no encontrado' });
        return;
      }

      // Validación adicional de negocio
      if (payment.status === 'success') {
        res.status(400).json({ error: 'No se puede eliminar un pago exitoso' });
        return;
      }

      await payment.destroy();
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
