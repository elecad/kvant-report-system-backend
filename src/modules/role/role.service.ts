import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

  private entity = 'Роль';

  create(createRoleDto: CreateRoleDto) {
    return 'This action adds a new role';
  }

  findAll(option: FindOptions<Role> = {}) {
    return this.roleRepository.findAll(option);
  }

  findOne(option: FindOptions<Role> = {}) {
    return this.roleRepository.findOne(option);
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
