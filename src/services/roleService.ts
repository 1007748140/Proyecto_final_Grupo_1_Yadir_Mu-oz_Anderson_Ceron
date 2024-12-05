// src/services/roleService.ts
import Role from '../models/roleModel';

export class RoleService {
  async create(roleData: { roleName: string }): Promise<Role> {
    const role = await Role.create(roleData);
    return role;
  }

  async getAll(): Promise<Role[]> {
    const roles = await Role.findAll();
    return roles;
  }

  async getById(id: number): Promise<Role | null> {
    const role = await Role.findByPk(id);
    if (!role) {
      throw new Error('Rol no encontrado');
    }
    return role;
  }

  async getByName(roleName: string): Promise<Role | null> {
    const role = await Role.findOne({ where: { roleName } });
    if (!role) {
      throw new Error('Rol no encontrado');
    }
    return role;
  }

  async update(id: number, roleData: Partial<Role>): Promise<Role> {
    const role = await this.getById(id);
    if (!role) {
      throw new Error('Rol no encontrado');
    }
    await role.update(roleData);
    return role;
  }

  async delete(id: number): Promise<void> {
    const role = await this.getById(id);
    if (!role) {
      throw new Error('Rol no encontrado');
    }
    await role.destroy();
  }

  async count(): Promise<number> {
    return Role.count();
  }
}
