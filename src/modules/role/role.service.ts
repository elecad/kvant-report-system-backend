import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';
import { STRINGS } from 'src/res/strings';
import {
  databaseValidateAll,
  databaseValidateOne,
  ValidateOption,
} from 'src/validators/dataBase.validator';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

  private entityName = 'Роль';

  async create(createRoleDto: CreateRoleDto) {
    await this.validateOne({
      type: 'unique',
      column: 'code_name',
      value: createRoleDto.code_name,
    });
    const { id } = await this.roleRepository.create(createRoleDto);
    return { id };
  }

  findAll(option: FindOptions<Role> = {}) {
    return this.roleRepository.findAll(option);
  }

  findOne(option: FindOptions<Role> = {}) {
    return this.roleRepository.findOne(option);
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const entity = await this.validateOne({
      type: 'existing',
      column: 'id',
      value: id,
    });
    if (!(entity.code_name === updateRoleDto.code_name))
      await this.validateOne({
        type: 'unique',
        column: 'code_name',
        value: updateRoleDto.code_name,
      });

    await entity.update(updateRoleDto);
    return entity;
  }

  async remove(id: number) {
    const entity = await this.validateOne({
      type: 'existing',
      column: 'id',
      value: id,
    });
    await entity.destroy();
  }

  async validateOne(props: ValidateOption<Role>) {
    //? Одиночный валидатор
    return databaseValidateOne(Role, this.entityName, props);
  }

  async validateAll(props: ValidateOption<Role>[]) {
    //? Групповой валидатор
    return databaseValidateAll(Role, this.entityName, props);
  }
}
