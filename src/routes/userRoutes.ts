// src/routes/userRoutes.ts
import { Router } from 'express';
import { body } from 'express-validator';
import { register } from '../controllers/register';
import { login } from '../controllers/login';
import { getProfile } from '../controllers/getProfile';
import { updateProfile } from '../controllers/updateProfile';
import { deleteProfile } from '../controllers/deleteProfile';
import authMiddleware from '../middlewares/authMiddleware';

const router: Router = Router();

// Rutas públicas
router.post('/api/users/register', [
  body('firstName').notEmpty().withMessage('El nombre es requerido'),
  body('middleName').optional(),
  body('lastName').notEmpty().withMessage('El apellido es requerido'),
  body('phone').optional().matches(/^\d{10}$/).withMessage('El teléfono debe tener entre 10 dígitos'),
  body('email').isEmail().withMessage('Debe ser un email válido'),
  body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
  body('idAddress').notEmpty().isInt().withMessage('La dirección es requerida'),
], register);

router.post('/api/users/login', [
  body('email').isEmail().withMessage('Debe ser un email válido'),
  body('password').notEmpty().withMessage('La contraseña es requerida'),
], login);

// Rutas protegidas
router.get('/api/users/profile', authMiddleware, getProfile);

router.put('/api/users/profile/:userId', [
  authMiddleware,
  body('firstName').optional().notEmpty().withMessage('El nombre no puede estar vacío'),
  body('middleName').optional(),
  body('lastName').optional().notEmpty().withMessage('El apellido no puede estar vacío'),
  body('phone').optional().matches(/^\d{10}$/).withMessage('El teléfono debe tener entre 10 dígitos'),
  body('email').optional().isEmail().withMessage('Debe ser un email válido'),
  body('password').optional().isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
  body('idAddress').optional().isInt().withMessage('La dirección debe ser un número válido'),
], updateProfile);

router.delete('/api/users/profile/:userId', authMiddleware, deleteProfile);

export default router;
