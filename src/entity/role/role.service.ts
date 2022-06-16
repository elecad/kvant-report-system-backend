import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { createRoleDto } from './dto/create-role.dto';
import { Role } from './role.model';

@Injectable()
export class RoleService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

  async getAll() {
    const roles = await this.roleRepository.findAll();
    return roles;
  }

  async getById(id: number) {
    const role = await this.roleRepository.findByPk(id);
    if (!role)
      throw new HttpException(
        'Роль с таким ID не найдена',
        HttpStatus.BAD_REQUEST,
      );
    return role;
  }

  async getByName(name: string) {
    return await this.roleRepository.findOne({
      where: { name: name },
    });
  }

  async create(dto: createRoleDto) {
    const role = await this.roleRepository.create(dto);
    return { id: role.id };
  }

  async update(id, dto) {
    const candidat = await this.getById(id);
    if (!candidat)
      throw new HttpException(
        'Роль с таким ID не найдена',
        HttpStatus.NOT_FOUND,
      );
    candidat.update(dto);
  }

  async delete(id) {
    const candidat = await this.getById(id);

    if (candidat) {
      candidat.destroy();
      return;
    }

    throw new HttpException('Роль с таким ID не найдена', HttpStatus.NOT_FOUND);
  }
}
