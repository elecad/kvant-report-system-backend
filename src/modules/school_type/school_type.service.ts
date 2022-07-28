import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';
import {
  databaseValidateAll,
  databaseValidateOne,
  ValidateOption,
} from 'src/validators/dataBase.validator';
import { CreateSchoolTypeDto } from './dto/create-school_type.dto';
import { UpdateSchoolTypeDto } from './dto/update-school_type.dto';
import { SchoolType } from './entities/school_type.entity';

@Injectable()
export class SchoolTypeService {
  constructor(
    @InjectModel(SchoolType) private eventRepository: typeof SchoolType,
  ) {}

  private entityName = 'Тип учреждения';

  async create(createSchoolTypeDto: CreateSchoolTypeDto) {
    const entity = await this.eventRepository.create(createSchoolTypeDto);

    const { id } = entity;
    return { id };
  }

  findAll(option: FindOptions<SchoolType> = {}) {
    return this.eventRepository.findAll(option);
  }

  findOne(option: FindOptions<SchoolType> = {}) {
    return this.eventRepository.findOne(option);
  }

  async update(id: number, updateSchoolTypeDto: UpdateSchoolTypeDto) {
    const entity = await this.validateOne({
      type: 'existing',
      column: 'id',
      value: id,
    });
    await entity.update(updateSchoolTypeDto);
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

  async validateOne(props: ValidateOption<SchoolType>) {
    //? Одиночный валидатор
    return databaseValidateOne(SchoolType, this.entityName, props);
  }

  async validateAll(props: ValidateOption<SchoolType>[]) {
    //? Групповой валидатор
    return databaseValidateAll(SchoolType, this.entityName, props);
  }
}
