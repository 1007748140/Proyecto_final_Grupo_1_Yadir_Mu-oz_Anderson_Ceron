// src/routes/userRoleRoutes.ts
import { Router } from 'express';
import { body, param } from 'express-validator';
import { UserRoleController } from '../controllers/userRoleController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();
const userRoleController = new UserRoleController();

// Validaciones
const createUserRoleValidations = [
  body('idUser')
    .isInt({ min: 1 })
    .withMessage('ID de usuario debe ser un número entero positivo'),
  body('idRole')
    .isInt({ min: 1 })
    .withMessage('ID de rol debe ser un número entero positivo'),
];

const updateMultipleRolesValidations = [
  param('userId')
    .isInt({ min: 1 })
    .withMessage('ID de usuario debe ser un número entero positivo'),
  body('roleIds')
    .isArray({ min: 1 })
    .withMessage('Debe proporcionar al menos un rol')
    .custom((value) => {
      if (!Array.isArray(value)) return false;
      return value.every((id) => Number.isInteger(id) && id > 0);
    })
    .withMessage('Todos los IDs de roles deben ser números enteros positivos'),
];

const userIdParamValidation = [
  param('userId')
    .isInt({ min: 1 })
    .withMessage('ID de usuario debe ser un número entero positivo'),
];

// Todas las rutas protegidas
router.use(authMiddleware);

// Rutas
router.post('/api/user-roles',
  createUserRoleValidations,
  userRoleController.create.bind(userRoleController));

router.get('/api/users/:userId/roles',
  userIdParamValidation,
  userRoleController.getUserRoles.bind(userRoleController));

router.get('/api/users/:userId/roles/count',
  userIdParamValidation,
  userRoleController.countUserRoles.bind(userRoleController));

router.put('/api/users/:userId/roles',
  updateMultipleRolesValidations,
  userRoleController.updateMultipleRoles.bind(userRoleController));

export default router;
