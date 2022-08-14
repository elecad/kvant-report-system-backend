import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';
import {
  databaseValidateAll,
  databaseValidateOne,
  ValidateOption,
} from 'src/validators/database.validator';
import { CreateDependencyTypeTableDto } from './dto/create-dependency-type-table.dto';
import { UpdateDependencyTypeTableDto } from './dto/update-dependency-type-table.dto';
import { DependencyTypeTable } from './entities/dependency-type-table.entity';

@Injectable()
export class DependencyTypeTableService {
  constructor(
    @InjectModel(DependencyTypeTable)
    private repository: typeof DependencyTypeTable,
  ) {}

  entityName = 'Тип зависимости';

  async create(CreateDependencyTypeTableDto: CreateDependencyTypeTableDto) {
    const { code_name } = CreateDependencyTypeTableDto;
    await this.validateOne({
      column: 'code_name',
      type: 'unique',
      value: code_name,
    });
    return this.repository.create(CreateDependencyTypeTableDto);
  }

  findAll(option: FindOptions<DependencyTypeTable> = {}) {
    return this.repository.findAll(option);
  }

  findOne(option: FindOptions<DependencyTypeTable> = {}) {
    return this.repository.findOne(option);
  }

  async update(
    id: number,
    updateDependencyTypeTableDto: UpdateDependencyTypeTableDto,
  ) {
    const { code_name } = updateDependencyTypeTableDto;

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

    return entity.update(updateDependencyTypeTableDto);
  }

  async remove(id: number) {
    const entity = await this.validateOne({
      type: 'existing',
      column: 'id',
      value: id,
    });

    await entity.destroy();
  }

  async validateOne(props: ValidateOption<DependencyTypeTable>) {
    //? Одиночный валидатор
    return databaseValidateOne(DependencyTypeTable, this.entityName, props);
  }

  async validateAll(props: ValidateOption<DependencyTypeTable>[]) {
    //? Групповой валидатор
    return databaseValidateAll(DependencyTypeTable, this.entityName, props);
  }
}
