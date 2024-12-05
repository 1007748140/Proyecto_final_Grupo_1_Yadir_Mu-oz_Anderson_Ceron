// src/services/userRoleService.ts
import UserRole from '../models/userRoleModel';
import Role from '../models/roleModel';

export class UserRoleService {
  async create(userRoleData: { idUser: number; idRole: number }): Promise<UserRole> {
    const userRole = await UserRole.create(userRoleData);
    return userRole;
  }

  async getUserRoles(userId: number): Promise<UserRole[]> {
    const userRoles = await UserRole.findAll({
      where: { idUser: userId },
      include: [{ model: Role }],
    });
    return userRoles;
  }

  async countUserRoles(userId: number): Promise<number> {
    return UserRole.count({
      where: { idUser: userId },
    });
  }

  async updateMultipleRoles(userId: number, roleIds: number[]): Promise<void> {
    // Primero eliminamos todos los roles existentes
    await UserRole.destroy({
      where: { idUser: userId },
    });

    // Luego creamos los nuevos roles
    const userRoles = roleIds.map((roleId) => ({
      idUser: userId,
      idRole: roleId,
    }));

    await UserRole.bulkCreate(userRoles);
  }

  async delete(id: number): Promise<void> {
    const userRole = await UserRole.findByPk(id);
    if (!userRole) {
      throw new Error('Relación usuario-rol no encontrada');
    }
    await userRole.destroy();
  }
}
