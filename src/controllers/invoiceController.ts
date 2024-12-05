// src/controllers/invoiceController.ts

import { Request, Response } from 'express';
import Invoice from '../models/invoiceModel';
import Payment from '../models/paymentModel';
import InvoiceDetail from '../models/invoiceDetailModel';

export class InvoiceController {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const invoice = await Invoice.create(req.body);
      res.status(201).json(invoice);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      console.log(req);
      const invoices = await Invoice.findAll();
      res.status(200).json(invoices);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const invoice = await Invoice.findByPk(req.params.id);
      if (!invoice) {
        res.status(404).json({ error: 'Factura no encontrada' });
        return;
      }
      res.status(200).json(invoice);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const invoice = await Invoice.findByPk(req.params.id);
      if (!invoice) {
        res.status(404).json({ error: 'Factura no encontrada' });
        return;
      }
      await invoice.update(req.body);
      res.status(200).json(invoice);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const invoice = await Invoice.findByPk(req.params.id);
      if (!invoice) {
        res.status(404).json({ error: 'Factura no encontrada' });
        return;
      }

      // eliminar los pagos y detalles de la factura relacionados
      await Payment.destroy({ where: { idInvoice: req.params.id } });
      await InvoiceDetail.destroy({ where: { idInvoice: req.params.id } });

      // aqui se elimina la factura
      await invoice.destroy();
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
