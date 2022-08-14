import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';
import {
  databaseValidateAll,
  databaseValidateOne,
  ValidateOption,
} from 'src/validators/database.validator';
import { CreateDependencyTableDto } from './dto/create-dependency-table.dto';
import { UpdateDependencyTableDto } from './dto/update-dependency-table.dto';
import { DependencyTable } from './entities/dependency-table.entity';

@Injectable()
export class DependencyTableService {
  constructor(
    @InjectModel(DependencyTable) private repository: typeof DependencyTable,
  ) {}

  entityName = 'Зависимость';

  async create(createDependencyTableDto: CreateDependencyTableDto) {
    return this.repository.create(createDependencyTableDto);
  }

  findAll(option: FindOptions<DependencyTable> = {}) {
    return this.repository.findAll(option);
  }

  findOne(option: FindOptions<DependencyTable> = {}) {
    return this.repository.findOne(option);
  }

  async update(id: number, updateDependencyTableDto: UpdateDependencyTableDto) {
    const entity = await this.validateOne({
      type: 'existing',
      column: 'id',
      value: id,
    });

    return entity.update(updateDependencyTableDto);
  }

  async remove(id: number) {
    const entity = await this.validateOne({
      type: 'existing',
      column: 'id',
      value: id,
    });

    await entity.destroy();
  }

  async validateOne(props: ValidateOption<DependencyTable>) {
    //? Одиночный валидатор
    return databaseValidateOne(DependencyTable, this.entityName, props);
  }

  async validateAll(props: ValidateOption<DependencyTable>[]) {
    //? Групповой валидатор
    return databaseValidateAll(DependencyTable, this.entityName, props);
  }
}
