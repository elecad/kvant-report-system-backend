import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';
import {
  databaseValidateAll,
  databaseValidateOne,
  ValidateOption,
} from 'src/validators/database.validator';
import { DependencyTableService } from '../dependency-table/dependency-table.service';
import { SchoolTypeTableService } from '../school-type-table/school-type-table.service';
import { CreateSchoolTableDto } from './dto/create-school-table.dto';
import { UpdateSchoolTableDto } from './dto/update-school-table.dto';
import { SchoolTable } from './entities/school-table.entity';

@Injectable()
export class SchoolTableService {
  constructor(
    @InjectModel(SchoolTable) private repository: typeof SchoolTable,
    private readonly dependencyTableService: DependencyTableService,
    private readonly schoolTypeTableService: SchoolTypeTableService,
  ) {}

  entityName = 'Учреждение';

  async create(createSchoolTableDto: CreateSchoolTableDto) {
    const { dependency_id, school_type_id } = createSchoolTableDto;

    this.dependencyTableService.validateOne({
      column: 'id',
      type: 'existing',
      value: dependency_id,
    });
    this.schoolTypeTableService.validateOne({
      column: 'id',
      type: 'existing',
      value: school_type_id,
    });

    return this.repository.create(createSchoolTableDto);
  }

  findAll(option: FindOptions<SchoolTable> = {}) {
    return this.repository.findAll(option);
  }

  findOne(option: FindOptions<SchoolTable> = {}) {
    return this.repository.findOne(option);
  }

  async update(id: number, updateSchoolTableDto: UpdateSchoolTableDto) {
    const { dependency_id, school_type_id } = updateSchoolTableDto;

    const entity = await this.validateOne({
      type: 'existing',
      column: 'id',
      value: id,
    });

    if (entity.dependency_id !== dependency_id)
      await this.dependencyTableService.validateOne({
        type: 'unique',
        column: 'id',
        value: dependency_id,
      });

    if (entity.dependency_id !== school_type_id)
      await this.schoolTypeTableService.validateOne({
        type: 'unique',
        column: 'id',
        value: school_type_id,
      });

    return entity.update(updateSchoolTableDto);
  }

  async remove(id: number) {
    const entity = await this.validateOne({
      type: 'existing',
      column: 'id',
      value: id,
    });

    await entity.destroy();
  }

  async validateOne(props: ValidateOption<SchoolTable>) {
    //? Одиночный валидатор
    return databaseValidateOne(SchoolTable, this.entityName, props);
  }

  async validateAll(props: ValidateOption<SchoolTable>[]) {
    //? Групповой валидатор
    return databaseValidateAll(SchoolTable, this.entityName, props);
  }
}
