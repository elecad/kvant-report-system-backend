import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';
import {
  databaseValidateAll,
  databaseValidateOne,
  ValidateOption,
} from 'src/validators/database.validator';
import { CreateRoleTableDto } from './dto/create-role-table.dto';
import { UpdateRoleTableDto } from './dto/update-role-table.dto';
import { RoleTable } from './entities/role-table.entity';

@Injectable()
export class RoleTableService {
  constructor(@InjectModel(RoleTable) private repository: typeof RoleTable) {}

  entityName = 'Роль';

  async create(сreateRoleTableDto: CreateRoleTableDto) {
    const { code_name } = сreateRoleTableDto;
    await this.validateOne({
      column: 'code_name',
      type: 'unique',
      value: code_name,
    });
    return this.repository.create(сreateRoleTableDto);
  }

  findAll(option: FindOptions<RoleTable> = {}) {
    return this.repository.findAll(option);
  }

  findOne(option: FindOptions<RoleTable> = {}) {
    return this.repository.findOne(option);
  }

  async update(id: number, updateRoleTableDto: UpdateRoleTableDto) {
    const { code_name } = updateRoleTableDto;

    const entity = await this.validateOne({
      type: 'existing',
      column: 'id',
      value: id,
    });

    if (entity.code_name !== code_name)
      await this.validateOne({
        type: 'unique',
        column: 'code_name',
        value: code_name,
      });

    return entity.update(updateRoleTableDto);
  }

  async remove(id: number) {
    const entity = await this.validateOne({
      type: 'existing',
      column: 'id',
      value: id,
    });

    await entity.destroy();
  }

  async validateOne(props: ValidateOption<RoleTable>) {
    //? Одиночный валидатор
    return databaseValidateOne(RoleTable, this.entityName, props);
  }

  async validateAll(props: ValidateOption<RoleTable>[]) {
    //? Групповой валидатор
    return databaseValidateAll(RoleTable, this.entityName, props);
  }
}
