import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';
import {
  databaseValidateAll,
  databaseValidateOne,
  ValidateOption,
} from 'src/validators/dataBase.validator';
import { DependencyTypeService } from '../dependency_type/dependency_type.service';
import { CreateDependencyDto } from './dto/create-dependency.dto';
import { UpdateDependencyDto } from './dto/update-dependency.dto';
import { Dependency } from './entities/dependency.entity';

@Injectable()
export class DependencyService {
  constructor(
    @InjectModel(Dependency) private dependencyRepository: typeof Dependency,
    private dependencyTypeService: DependencyTypeService,
  ) {}

  private entityName = 'Зависимость';

  async create(createDependencyDto: CreateDependencyDto) {
    await this.dependencyTypeService.validateOne({
      type: 'existing',
      column: 'id',
      value: createDependencyDto.dependency_type_id,
    });

    const { id } = await this.dependencyRepository.create(createDependencyDto);
    return { id };
  }

  findAll(option: FindOptions<Dependency> = {}) {
    return this.dependencyRepository.findAll(option);
  }

  findOne(option: FindOptions<Dependency> = {}) {
    return this.dependencyRepository.findOne(option);
  }

  async update(id: number, updateDependencyDto: UpdateDependencyDto) {
    const entity = await this.validateOne({
      type: 'existing',
      column: 'id',
      value: id,
    });
    if (entity.dependency_type_id !== updateDependencyDto.dependency_type_id)
      await this.dependencyTypeService.validateOne({
        type: 'existing',
        column: 'id',
        value: updateDependencyDto.dependency_type_id,
      });
    await entity.update(updateDependencyDto);
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

  async validateOne(props: ValidateOption<Dependency>) {
    //? Одиночный валидатор
    return databaseValidateOne(Dependency, this.entityName, props);
  }

  async validateAll(props: ValidateOption<Dependency>[]) {
    //? Групповой валидатор
    return databaseValidateAll(Dependency, this.entityName, props);
  }
}
