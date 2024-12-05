// src/controllers/invoiceDetailController.ts

import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import InvoiceDetail from '../models/invoiceDetailModel';
import Invoice from '../models/invoiceModel';
import Product from '../models/productModel';

export class InvoiceDetailController {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      // Validar que exista la factura
      const invoice = await Invoice.findByPk(req.body.idInvoice);
      if (!invoice) {
        res.status(404).json({ error: 'Factura no encontrada' });
        return;
      }

      // Validar que exista el producto
      const product = await Product.findByPk(req.body.idProduct);
      if (!product) {
        res.status(404).json({ error: 'Producto no encontrado' });
        return;
      }

      const detail = await InvoiceDetail.create(req.body);
      res.status(201).json(detail);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAll(_req: Request, res: Response): Promise<void> {
    try {
      const details = await InvoiceDetail.findAll({
        include: [
          { model: Invoice },
          { model: Product },
        ],
        order: [['createdAt', 'DESC']],
      });
      res.status(200).json(details);
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

      const detail = await InvoiceDetail.findByPk(req.params.id, {
        include: [
          { model: Invoice },
          { model: Product },
        ],
      });

      if (!detail) {
        res.status(404).json({ error: 'Detalle no encontrado' });
        return;
      }

      res.status(200).json(detail);
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

      const detail = await InvoiceDetail.findByPk(req.params.id);
      if (!detail) {
        res.status(404).json({ error: 'Detalle no encontrado' });
        return;
      }

      // Si se está actualizando el producto o la factura, validar que existan
      if (req.body.idInvoice) {
        const invoice = await Invoice.findByPk(req.body.idInvoice);
        if (!invoice) {
          res.status(404).json({ error: 'Factura no encontrada' });
          return;
        }
      }

      if (req.body.idProduct) {
        const product = await Product.findByPk(req.body.idProduct);
        if (!product) {
          res.status(404).json({ error: 'Producto no encontrado' });
          return;
        }
      }

      await detail.update(req.body);

      // Obtener el detalle actualizado con sus relaciones
      const updatedDetail = await InvoiceDetail.findByPk(detail.id, {
        include: [
          { model: Invoice },
          { model: Product },
        ],
      });

      res.status(200).json(updatedDetail);
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

      const detail = await InvoiceDetail.findByPk(req.params.id);
      if (!detail) {
        res.status(404).json({ error: 'Detalle no encontrado' });
        return;
      }

      await detail.destroy();
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
