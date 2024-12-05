// src/routes/invoiceRoutes.ts

import { Router } from 'express';
import { InvoiceController } from '../controllers/invoiceController';
import { InvoiceService } from '../services/invoiceService';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();
const invoiceController = new InvoiceController();
const invoiceService = new InvoiceService();

// Rutas CRUD básicas
router.post('/api/invoices', authMiddleware, invoiceController.create.bind(invoiceController));
router.get('/api/invoices', authMiddleware, invoiceController.getAll.bind(invoiceController));
router.get('/api/invoices/:id', authMiddleware, invoiceController.getById.bind(invoiceController));
router.put('/api/invoices/:id', authMiddleware, invoiceController.update.bind(invoiceController));
router.delete('/api/invoices/:id', authMiddleware, invoiceController.delete.bind(invoiceController));

// Rutas especializadas
// 1. Total de pagos por usuario
router.get('/api/users/:userId/payments/total', authMiddleware, async (req, res) => {
  try {
    const total = await invoiceService.getTotalPaymentsByUser(Number(req.params.userId));
    res.json({ total });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// 2. Usuario con facturas y pagos
router.get('/api/users/:userId/invoices-payments', authMiddleware, async (req, res) => {
  try {
    const data = await invoiceService.getUserWithInvoicesAndPayments(Number(req.params.userId));
    res.json(data);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// 3. Total y estado de pagos por factura
router.get('/api/invoices/:invoiceId/payments-status', authMiddleware, async (req, res) => {
  try {
    const status = await invoiceService.getInvoicePaymentsStatus(Number(req.params.invoiceId));
    res.json(status);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// 4. Productos y total de factura
router.get('/api/invoices/:invoiceId/products', authMiddleware, async (req, res) => {
  try {
    const data = await invoiceService.getInvoiceProducts(Number(req.params.invoiceId));
    res.json(data);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// 5. Pagos pendientes de factura
router.get('/api/invoices/:invoiceId/pending-payments', authMiddleware, async (req, res) => {
  try {
    const payments = await invoiceService.getPendingPayments(Number(req.params.invoiceId));
    res.json(payments);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// 6. Actualizar estado de pago
router.put('/api/payments/:paymentId/success', authMiddleware, async (req, res) => {
  try {
    const payment = await invoiceService.updatePaymentStatus(Number(req.params.paymentId));
    res.json(payment);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// 7. Total con descuento
router.get('/api/invoices/:invoiceId/total-with-discount', authMiddleware, async (req, res) => {
  try {
    const discountPercent = Number(req.query.discount) || 0;
    const total = await invoiceService.getInvoiceTotalWithDiscount(
      Number(req.params.invoiceId),
      discountPercent,
    );
    res.json({ total });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// 8. Facturas de usuario con pagos
router.get('/api/users/:userId/invoices-with-payments', authMiddleware, async (req, res) => {
  try {
    const invoices = await invoiceService.getUserInvoicesWithPayments(Number(req.params.userId));
    res.json(invoices);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// 9. Verificar si factura está pagada
router.get('/api/invoices/:invoiceId/is-paid', authMiddleware, async (req, res) => {
  try {
    const isPaid = await invoiceService.isInvoiceFullyPaid(Number(req.params.invoiceId));
    res.json({ isPaid });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// 10. Total con impuestos
router.get('/api/invoices/:invoiceId/total-with-taxes', authMiddleware, async (req, res) => {
  try {
    const taxRate = Number(req.query.taxRate) || 0;
    const total = await invoiceService.getInvoiceTotalWithTaxes(
      Number(req.params.invoiceId),
      taxRate,
    );
    res.json({ total });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
