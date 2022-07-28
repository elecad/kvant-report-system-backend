import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';
import {
  databaseValidateAll,
  databaseValidateOne,
  ValidateOption,
} from 'src/validators/dataBase.validator';
import { DependencyService } from '../dependency/dependency.service';
import { SchoolTypeService } from '../school_type/school_type.service';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { School } from './entities/school.entity';

@Injectable()
export class SchoolService {
  constructor(
    @InjectModel(School) private schoolRepository: typeof School,
    private dependencyService: DependencyService,
    private schoolTypeService: SchoolTypeService,
  ) {}

  private entityName = 'Образовательное учреждение';

  async create(createSchoolDto: CreateSchoolDto) {
    await this.dependencyService.validateOne({
      type: 'existing',
      column: 'id',
      value: createSchoolDto.dependency_id,
    });

    await this.schoolTypeService.validateOne({
      type: 'existing',
      column: 'id',
      value: createSchoolDto.school_type_id,
    });

    const { id } = await this.schoolRepository.create(createSchoolDto);
    return { id };
  }

  findAll(option: FindOptions<School> = {}) {
    return this.schoolRepository.findAll(option);
  }

  findOne(option: FindOptions<School> = {}) {
    return this.schoolRepository.findOne(option);
  }

  async update(id: number, updateSchoolDto: UpdateSchoolDto) {
    const entity = await this.validateOne({
      type: 'existing',
      column: 'id',
      value: id,
    });

    if (entity.dependency_id !== updateSchoolDto.dependency_id)
      await this.dependencyService.validateOne({
        type: 'existing',
        column: 'id',
        value: updateSchoolDto.dependency_id,
      });

    if (entity.school_type_id !== updateSchoolDto.school_type_id)
      await this.schoolTypeService.validateOne({
        type: 'existing',
        column: 'id',
        value: updateSchoolDto.school_type_id,
      });

    await entity.update(updateSchoolDto);
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

  async validateOne(props: ValidateOption<School>) {
    //? Одиночный валидатор
    return databaseValidateOne(School, this.entityName, props);
  }

  async validateAll(props: ValidateOption<School>[]) {
    //? Групповой валидатор
    return databaseValidateAll(School, this.entityName, props);
  }
}
