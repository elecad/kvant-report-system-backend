import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';
import {
  databaseValidateAll,
  databaseValidateOne,
  ValidateOption,
} from 'src/validators/database.validator';
import { CreateSchoolTypeTableDto } from './dto/create-school-type-table.dto';
import { UpdateSchoolTypeTableDto } from './dto/update-school-type-table.dto';
import { SchoolTypeTable } from './entities/school-type-table.entity';

@Injectable()
export class SchoolTypeTableService {
  constructor(
    @InjectModel(SchoolTypeTable) private repository: typeof SchoolTypeTable,
  ) {}

  entityName = 'Тип учреждения';

  async create(createSchoolTypeTableDto: CreateSchoolTypeTableDto) {
    const { code_name } = createSchoolTypeTableDto;
    await this.validateOne({
      column: 'code_name',
      type: 'unique',
      value: code_name,
    });
    return this.repository.create(createSchoolTypeTableDto);
  }

  findAll(option: FindOptions<SchoolTypeTable> = {}) {
    return this.repository.findAll(option);
  }

  findOne(option: FindOptions<SchoolTypeTable> = {}) {
    return this.repository.findOne(option);
  }

  async update(id: number, updateSchoolTypeTableDto: UpdateSchoolTypeTableDto) {
    const { code_name } = updateSchoolTypeTableDto;

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

    return entity.update(updateSchoolTypeTableDto);
  }

  async remove(id: number) {
    const entity = await this.validateOne({
      type: 'existing',
      column: 'id',
      value: id,
    });

    await entity.destroy();
  }

  async validateOne(props: ValidateOption<SchoolTypeTable>) {
    //? Одиночный валидатор
    return databaseValidateOne(SchoolTypeTable, this.entityName, props);
  }

  async validateAll(props: ValidateOption<SchoolTypeTable>[]) {
    //? Групповой валидатор
    return databaseValidateAll(SchoolTypeTable, this.entityName, props);
  }
}
