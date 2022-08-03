import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';
import {
  databaseValidateAll,
  databaseValidateOne,
  ValidateOption,
} from 'src/validators/dataBase.validator';
import { AnswerService } from '../answer/answer.service';
import { DependencyService } from '../dependency/dependency.service';
import { CreateAboutDependencyDto } from './dto/create-about_dependency.dto';
import { UpdateAboutDependencyDto } from './dto/update-about_dependency.dto';
import { AboutDependency } from './entities/about_dependency.entity';

@Injectable()
export class AboutDependencyService {
  constructor(
    @InjectModel(AboutDependency)
    private aboutProgrammRepository: typeof AboutDependency,
    private answerService: AnswerService,
  ) // private dependencyService: DependencyService,
  {}

  private entityName = 'Данные о зависимости';

  async create(createAboutDependencyDto: CreateAboutDependencyDto) {
    // await this.answerService.validateOne({
    //   type: 'existing',
    //   column: 'id',
    //   value: createAboutDependencyDto.answer_id,
    // });
    // await this.dependencyService.validateOne({
    //   type: 'existing',
    //   column: 'id',
    //   value: createAboutDependencyDto.dependency_id,
    // });
    // const { id } = await this.aboutProgrammRepository.create(
    //   createAboutDependencyDto,
    // );
    // return { id };
  }

  findAll(option: FindOptions<AboutDependency> = {}) {
    return this.aboutProgrammRepository.findAll(option);
  }

  findOne(option: FindOptions<AboutDependency> = {}) {
    return this.aboutProgrammRepository.findOne(option);
  }

  async update(id: number, updateAboutDependencyDto: UpdateAboutDependencyDto) {
    const entity = await this.validateOne({
      type: 'existing',
      column: 'id',
      value: id,
    });

    if (entity.answer_id !== updateAboutDependencyDto.answer_id)
      await this.answerService.validateOne({
        type: 'existing',
        column: 'id',
        value: updateAboutDependencyDto.answer_id,
      });
    if (entity.dependency_id !== updateAboutDependencyDto.dependency_id)
      // await this.dependencyService.validateOne({
      //   type: 'existing',
      //   column: 'id',
      //   value: updateAboutDependencyDto.dependency_id,
      // });

      await entity.update(updateAboutDependencyDto);
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

  async validateOne(props: ValidateOption<AboutDependency>) {
    //? Одиночный валидатор
    return databaseValidateOne(AboutDependency, this.entityName, props);
  }

  async validateAll(props: ValidateOption<AboutDependency>[]) {
    //? Групповой валидатор
    return databaseValidateAll(AboutDependency, this.entityName, props);
  }
}
