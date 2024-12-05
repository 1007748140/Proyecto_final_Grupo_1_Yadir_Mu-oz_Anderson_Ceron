// src/middlewares/errorHandler.ts

import { Sequelize } from 'sequelize';
import Invoice from '../models/invoiceModel';
import Payment from '../models/paymentModel';
import User from '../models/userModel';
import InvoiceDetail from '../models/invoiceDetailModel';
import Product from '../models/productModel';

interface InvoiceDetailWithProduct extends InvoiceDetail {
  Product?: Product;
}

interface PaymentWithTotal {
  total?: number;
  status?: string;
}

export class InvoiceService {
  // 1. Cantidad total de pagos de facturas de un usuario
  async getTotalPaymentsByUser(userId: number): Promise<number> {
    const result = await Payment.findOne({
      where: {
        '$Invoice.idUser$': userId,
      },
      include: [{
        model: Invoice,
        required: true,
      }],
      attributes: [
        [Sequelize.fn('SUM', Sequelize.col('amount')), 'total'],
      ],
      raw: true,
    }) as PaymentWithTotal;

    return Number(result?.total) || 0;
  }

  // 2. Usuario con sus facturas y pagos
  async getUserWithInvoicesAndPayments(userId: number): Promise<User | null> {
    return User.findByPk(userId, {
      include: [{
        model: Invoice,
        include: [{ model: Payment }],
      }],
    });
  }

  // 3. Total de pagos por factura y estado
  async getInvoicePaymentsStatus(invoiceId: number): Promise<PaymentWithTotal[]> {
    return await Payment.findAll({
      where: { idInvoice: invoiceId },
      attributes: [
        'status',
        [Sequelize.fn('SUM', Sequelize.col('amount')), 'total'],
      ],
      group: ['status'],
      raw: true,
    }) as PaymentWithTotal[];
  }

  // 4. Productos de una factura con cantidades y total
  async getInvoiceProducts(invoiceId: number): Promise<{ details: InvoiceDetailWithProduct[]; total: number }> {
    const details = await InvoiceDetail.findAll({
      where: { idInvoice: invoiceId },
      include: [{ model: Product }],
      attributes: ['quantity'],
    }) as InvoiceDetailWithProduct[];

    const total = details.reduce((sum, detail) => {
      if (detail.Product) {
        return sum + (detail.quantity * detail.Product.price);
      }
      return sum;
    }, 0);

    return { details, total };
  }

  // 5. Pagos pendientes de una factura
  async getPendingPayments(invoiceId: number): Promise<Payment[]> {
    return Payment.findAll({
      where: {
        idInvoice: invoiceId,
        status: 'pending',
      },
    });
  }

  // 6. Actualizar estado de pago a exitoso
  async updatePaymentStatus(paymentId: number): Promise<Payment> {
    const payment = await Payment.findByPk(paymentId);
    if (!payment) throw new Error('Pago no encontrado');

    await payment.update({ status: 'success' });
    return payment;
  }

  // 7. Total de factura con descuentos
  async getInvoiceTotalWithDiscount(invoiceId: number, discountPercent: number): Promise<number> {
    const invoice = await Invoice.findByPk(invoiceId);
    if (!invoice) throw new Error('Factura no encontrada');

    const discount = (invoice.total * discountPercent) / 100;
    return invoice.total - discount;
  }

  // 8. Facturas de usuario con detalles de pagos
  async getUserInvoicesWithPayments(userId: number): Promise<Invoice[]> {
    return Invoice.findAll({
      where: { idUser: userId },
      include: [{ model: Payment }],
    });
  }

  // 9. Verificar si una factura está pagada
  async isInvoiceFullyPaid(invoiceId: number): Promise<boolean> {
    const invoice = await Invoice.findByPk(invoiceId);
    if (!invoice) throw new Error('Factura no encontrada');

    const result = await Payment.findOne({
      where: {
        idInvoice: invoiceId,
        status: 'success',
      },
      attributes: [
        [Sequelize.fn('SUM', Sequelize.col('amount')), 'total'],
      ],
      raw: true,
    }) as PaymentWithTotal;

    const totalPaid = Number(result?.total) || 0;
    return totalPaid >= invoice.total;
  }

  // 10. Total de factura con impuestos
  async getInvoiceTotalWithTaxes(invoiceId: number, taxRate: number): Promise<number> {
    const invoice = await Invoice.findByPk(invoiceId);
    if (!invoice) throw new Error('Factura no encontrada');

    const tax = (invoice.total * taxRate) / 100;
    return invoice.total + tax;
  }
}
