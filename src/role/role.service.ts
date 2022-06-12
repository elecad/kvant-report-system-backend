import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { createRoleDto } from './dto/create-role.dto';
import { Role } from './role.model';

@Injectable()
export class RoleService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

  async getAllRole() {
    const role = await this.roleRepository.findAll();
    return role;
  }

  async getByIdRole(id: number) {
    const role = await this.roleRepository.findByPk(id);
    return role;
  }

  async createRole(dto: createRoleDto) {
    try {
      const role = await this.roleRepository.create(dto);
      return role;
    } catch {
      throw new HttpException('Ошибка добавления', HttpStatus.BAD_REQUEST);
    }
  }

  async updateRole(id, dto) {
    try {
      const role = await this.roleRepository.findByPk(id);
      await role.update(dto);
      return role;
    } catch {
      throw new HttpException('Ошибка изменения', HttpStatus.BAD_REQUEST);
    }
  }

  async deleteRole(id) {
    const role = await this.roleRepository.findByPk(id);
    console.log(role);
    if (role) {
      await role.destroy();
      return role;
    } else {
      throw new HttpException('Ошибка удаления', HttpStatus.BAD_REQUEST);
    }
  }
}
