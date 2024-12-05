// src/routes/role/roleRoutes.ts
import { Router } from 'express';
import { body, param } from 'express-validator';
import { RoleController } from '../../controllers/role/roleController';
import authMiddleware from '../../middlewares/authMiddleware';

const router = Router();
const roleController = new RoleController();

// Validaciones
const roleValidations = [
  body('roleName')
    .isString()
    .withMessage('El nombre del rol debe ser una cadena de texto')
    .trim()
    .notEmpty()
    .withMessage('El nombre del rol es requerido')
    .isLength({ min: 3, max: 45 })
    .withMessage('El nombre del rol debe tener entre 3 y 45 caracteres')
    .matches(/^[a-zA-Z_]+$/)
    .withMessage('El nombre del rol solo puede contener letras y guiones bajos'),
];

const idParamValidation = [
  param('id')
    .isInt()
    .withMessage('El ID debe ser un número válido'),
];

const nameParamValidation = [
  param('name')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('El nombre del rol es requerido'),
];

// Rutas públicas
router.get('/api/roles', roleController.getAll.bind(roleController));
router.get('/api/roles/count', roleController.count.bind(roleController));
router.get('/api/roles/:id',
  idParamValidation,
  roleController.getById.bind(roleController));
router.get('/api/roles/name/:name',
  nameParamValidation,
  roleController.getByName.bind(roleController));

// Rutas protegidas
router.post('/api/roles',
  [authMiddleware, ...roleValidations],
  roleController.create.bind(roleController));

router.put('/api/roles/:id',
  [authMiddleware, ...roleValidations, ...idParamValidation],
  roleController.update.bind(roleController));

router.delete('/api/roles/:id',
  [authMiddleware, ...idParamValidation],
  roleController.delete.bind(roleController));

export default router;
