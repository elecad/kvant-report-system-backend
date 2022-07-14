import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';
import { STRINGS } from 'src/res/strings';
import {
  databaseValidateAll,
  databaseValidateOne,
  ValidateOption,
} from 'src/validators/dataBase.validator';
import { Account_Role } from '../account/entities/account_role.entity';
import { CreateDependencyTypeDto } from './dto/create-dependency_type.dto';
import { UpdateDependencyTypeDto } from './dto/update-dependency_type.dto';
import { DependencyType } from './entities/dependency_type.entity';

@Injectable()
export class DependencyTypeService {
  constructor(
    @InjectModel(DependencyType)
    private dependencyTypeRepository: typeof DependencyType,
  ) {}

  private entityName = 'Тип зависимости';

  async create(createDependencyTypeDto: CreateDependencyTypeDto) {
    const { id } = await this.dependencyTypeRepository.create(
      createDependencyTypeDto,
    );
    return { id };
  }

  findAll(option: FindOptions<DependencyType> = {}) {
    return this.dependencyTypeRepository.findAll(option);
  }

  findOne(option: FindOptions<DependencyType> = {}) {
    return this.dependencyTypeRepository.findOne(option);
  }

  async update(id: number, updateDependencyTypeDto: UpdateDependencyTypeDto) {
    const entity = await this.validateOne({
      type: 'existing',
      column: 'id',
      value: id,
    });
    await entity.update(updateDependencyTypeDto);
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

  async validateOne(props: ValidateOption<DependencyType>) {
    //? Одиночный валидатор
    return databaseValidateOne(DependencyType, this.entityName, props);
  }

  async validateAll(props: ValidateOption<DependencyType>[]) {
    //? Групповой валидатор
    return databaseValidateAll(DependencyType, this.entityName, props);
  }
}
