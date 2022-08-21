import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize/types';
import {
  databaseValidateAll,
  databaseValidateOne,
  ValidateOption,
} from 'src/validators/database.validator';
import { AnswerTableService } from '../answer-table/answer-table.service';
import { DataOfTypeTableService } from '../data-of-type-table/data-of-type-table.service';
import { DependencyTableService } from '../dependency-table/dependency-table.service';
import { CreateAboutDependencyTableDto } from './dto/create-about-dependency-table.dto';
import { UpdateAboutDependencyTableDto } from './dto/update-about-dependency-table.dto';
import { AboutDependencyTable } from './entities/about-dependency-table.entity';

@Injectable()
export class AboutDependencyTableService {
  constructor(
    @InjectModel(AboutDependencyTable)
    private repository: typeof AboutDependencyTable,
    private readonly answerTableService: AnswerTableService,
    private readonly dataOfTypeTableService: DataOfTypeTableService,
    private readonly dependencyTableService: DependencyTableService,
  ) {}

  entityName = 'О Зависимостях';

  async create(createAboutDependencyTableDto: CreateAboutDependencyTableDto) {
    const { answer_id, data_of_type_id, dependency_id } =
      createAboutDependencyTableDto;

    await this.answerTableService.validateOne({
      column: 'id',
      type: 'existing',
      value: answer_id,
    });

    await this.dataOfTypeTableService.validateOne({
      column: 'id',
      type: 'existing',
      value: data_of_type_id,
    });

    await this.dependencyTableService.validateOne({
      column: 'id',
      type: 'existing',
      value: dependency_id,
    });

    return this.repository.create(createAboutDependencyTableDto);
  }

  findAll(option: FindOptions<AboutDependencyTable> = {}) {
    return this.repository.findAll(option);
  }

  findOne(option: FindOptions<AboutDependencyTable> = {}) {
    return this.repository.findOne(option);
  }

  async update(
    id: number,
    updateAboutDependencyTableDto: UpdateAboutDependencyTableDto,
  ) {
    const { answer_id, data_of_type_id, dependency_id } =
      updateAboutDependencyTableDto;

    const entity = await this.validateOne({
      type: 'existing',
      column: 'id',
      value: id,
    });

    if (entity.answer_id !== answer_id)
      await this.answerTableService.validateOne({
        column: 'id',
        type: 'existing',
        value: answer_id,
      });

    if (entity.data_of_type_id !== data_of_type_id)
      await this.dataOfTypeTableService.validateOne({
        column: 'id',
        type: 'existing',
        value: data_of_type_id,
      });

    if (entity.dependency_id !== dependency_id)
      await this.dependencyTableService.validateOne({
        column: 'id',
        type: 'existing',
        value: dependency_id,
      });

    return entity.update(updateAboutDependencyTableDto);
  }

  async remove(id: number) {
    const entity = await this.validateOne({
      type: 'existing',
      column: 'id',
      value: id,
    });

    await entity.destroy();
  }

  async validateOne(props: ValidateOption<AboutDependencyTable>) {
    //? Одиночный валидатор
    return databaseValidateOne(AboutDependencyTable, this.entityName, props);
  }

  async validateAll(props: ValidateOption<AboutDependencyTable>[]) {
    //? Групповой валидатор
    return databaseValidateAll(AboutDependencyTable, this.entityName, props);
  }
}
