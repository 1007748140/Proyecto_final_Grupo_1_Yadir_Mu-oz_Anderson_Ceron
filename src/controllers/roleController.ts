// src/controllers/roleController.ts
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { RoleService } from '../services/roleService';
import UserRole from '../models/userRoleModel';

export class RoleController {
  private roleService: RoleService;

  constructor() {
    this.roleService = new RoleService();
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      // Verifica si ya existe un rol con el mismo nombre
      const existingRole = await this.roleService.getByName(req.body.roleName).catch(() => null);
      if (existingRole) {
        res.status(400).json({ error: 'Ya existe un rol con este nombre' });
        return;
      }

      const role = await this.roleService.create(req.body);
      res.status(201).json(role);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAll(_req: Request, res: Response): Promise<void> {
    try {
      const roles = await this.roleService.getAll();
      res.status(200).json(roles);
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

      const role = await this.roleService.getById(Number(req.params.id));
      if (!role) {
        res.status(404).json({ error: 'Rol no encontrado' });
        return;
      }
      res.status(200).json(role);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getByName(req: Request, res: Response): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const role = await this.roleService.getByName(req.params.name);
      if (!role) {
        res.status(404).json({ error: 'Rol no encontrado' });
        return;
      }
      res.status(200).json(role);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async count(_req: Request, res: Response): Promise<void> {
    try {
      const count = await this.roleService.count();
      res.status(200).json({ count });
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

      // Verificar si existe el rol a actualizar
      const existingRole = await this.roleService.getById(Number(req.params.id));
      if (!existingRole) {
        res.status(404).json({ error: 'Rol no encontrado' });
        return;
      }

      // Verificar si el nuevo nombre ya está en uso por otro rol
      if (req.body.roleName !== existingRole.roleName) {
        const roleWithName = await this.roleService.getByName(req.body.roleName).catch(() => null);
        if (roleWithName) {
          res.status(400).json({ error: 'Ya existe un rol con este nombre' });
          return;
        }
      }

      const role = await this.roleService.update(Number(req.params.id), req.body);
      res.status(200).json(role);
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

      // Verificar si el rol existe
      const role = await this.roleService.getById(Number(req.params.id));
      if (!role) {
        res.status(404).json({ error: 'Rol no encontrado' });
        return;
      }

      // Verificar si el rol está en uso
      const usersWithRole = await UserRole.count({
        where: { idRole: req.params.id },
      });

      if (usersWithRole > 0) {
        res.status(400).json({
          error: 'No se puede eliminar el rol porque está asignado a usuarios',
          usersCount: usersWithRole,
        });
        return;
      }

      await this.roleService.delete(Number(req.params.id));
      res.status(200).json({ message: 'Rol eliminado exitosamente' });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
