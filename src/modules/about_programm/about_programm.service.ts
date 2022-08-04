import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';
import {
  databaseValidateAll,
  databaseValidateOne,
  ValidateOption,
} from 'src/validators/dataBase.validator';
import { AnswerService } from '../answer/answer.service';
import { ProgrammService } from '../programm/programm.service';
import { CreateAboutProgrammDto } from './dto/create-about_programm.dto';
import { UpdateAboutProgrammDto } from './dto/update-about_programm.dto';
import { AboutProgramm } from './entities/about_programm.entity';

@Injectable()
export class AboutProgrammService {
  constructor(
    @InjectModel(AboutProgramm)
    private aboutProgrammRepository: typeof AboutProgramm,
    @Inject(forwardRef(() => AnswerService))
    private answerService: AnswerService,
    private programmService: ProgrammService,
  ) {}

  private entityName = 'Данные о программе';

  async create(createAboutProgrammDto: CreateAboutProgrammDto) {
    await this.answerService.validateOne({
      type: 'existing',
      column: 'id',
      value: createAboutProgrammDto.answer_id,
    });

    await this.programmService.validateOne({
      type: 'existing',
      column: 'id',
      value: createAboutProgrammDto.programm_id,
    });

    const { id } = await this.aboutProgrammRepository.create(
      createAboutProgrammDto,
    );
    return { id };
  }

  findAll(option: FindOptions<AboutProgramm> = {}) {
    return this.aboutProgrammRepository.findAll(option);
  }

  findOne(option: FindOptions<AboutProgramm> = {}) {
    return this.aboutProgrammRepository.findOne(option);
  }

  async update(id: number, updateAboutProgrammDto: UpdateAboutProgrammDto) {
    const entity = await this.validateOne({
      type: 'existing',
      column: 'id',
      value: id,
    });

    if (entity.answer_id !== updateAboutProgrammDto.answer_id)
      await this.answerService.validateOne({
        type: 'existing',
        column: 'id',
        value: updateAboutProgrammDto.answer_id,
      });
    if (entity.programm_id !== updateAboutProgrammDto.programm_id)
      await this.programmService.validateOne({
        type: 'existing',
        column: 'id',
        value: updateAboutProgrammDto.programm_id,
      });

    await entity.update(updateAboutProgrammDto);
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

  async validateOne(props: ValidateOption<AboutProgramm>) {
    //? Одиночный валидатор
    return databaseValidateOne(AboutProgramm, this.entityName, props);
  }

  async validateAll(props: ValidateOption<AboutProgramm>[]) {
    //? Групповой валидатор
    return databaseValidateAll(AboutProgramm, this.entityName, props);
  }
}
