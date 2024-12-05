// src/controllers/userRoleController.ts
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { UserRoleService } from '../services/userRoleService';
import User from '../models/userModel';
import Role from '../models/roleModel';

export class UserRoleController {
  private userRoleService: UserRoleService;

  constructor() {
    this.userRoleService = new UserRoleService();
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      // Validar que el usuario existe
      const user = await User.findByPk(req.body.idUser);
      if (!user) {
        res.status(404).json({ error: 'Usuario no encontrado' });
        return;
      }

      // Validar que el rol existe
      const role = await Role.findByPk(req.body.idRole);
      if (!role) {
        res.status(404).json({ error: 'Rol no encontrado' });
        return;
      }

      // Verificar si la relación ya existe
      const existingUserRoles = await this.userRoleService.getUserRoles(req.body.idUser);
      const roleExists = existingUserRoles.some((ur) => ur.idRole === req.body.idRole);
      if (roleExists) {
        res.status(400).json({ error: 'El usuario ya tiene asignado este rol' });
        return;
      }

      const userRole = await this.userRoleService.create(req.body);
      res.status(201).json(userRole);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getUserRoles(req: Request, res: Response): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      // Validar que el usuario existe
      const user = await User.findByPk(req.params.userId);
      if (!user) {
        res.status(404).json({ error: 'Usuario no encontrado' });
        return;
      }

      const userRoles = await this.userRoleService.getUserRoles(Number(req.params.userId));
      res.status(200).json(userRoles);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async countUserRoles(req: Request, res: Response): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      // Validar que el usuario existe
      const user = await User.findByPk(req.params.userId);
      if (!user) {
        res.status(404).json({ error: 'Usuario no encontrado' });
        return;
      }

      const count = await this.userRoleService.countUserRoles(Number(req.params.userId));
      res.status(200).json({ count });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateMultipleRoles(req: Request, res: Response): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      // Validar que el usuario existe
      const user = await User.findByPk(req.params.userId);
      if (!user) {
        res.status(404).json({ error: 'Usuario no encontrado' });
        return;
      }

      // Validar que todos los roles existen
      const roles = await Role.findAll({
        where: { id: req.body.roleIds },
      });

      if (roles.length !== req.body.roleIds.length) {
        res.status(400).json({
          error: 'Uno o más roles no existen',
          found: roles.length,
          requested: req.body.roleIds.length,
        });
        return;
      }

      // Validar que no haya duplicados en roleIds
      const uniqueRoleIds = new Set(req.body.roleIds);
      if (uniqueRoleIds.size !== req.body.roleIds.length) {
        res.status(400).json({ error: 'La lista contiene roles duplicados' });
        return;
      }

      await this.userRoleService.updateMultipleRoles(
        Number(req.params.userId),
        req.body.roleIds,
      );

      // Obtener los roles actualizados para la respuesta
      const updatedRoles = await this.userRoleService.getUserRoles(Number(req.params.userId));
      res.status(200).json({
        message: 'Roles actualizados exitosamente',
        roles: updatedRoles,
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
