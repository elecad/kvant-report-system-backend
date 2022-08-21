import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';
import {
  databaseValidateAll,
  databaseValidateOne,
  ValidateOption,
} from 'src/validators/database.validator';
import { AnswerTableService } from '../answer-table/answer-table.service';
import { DataOfTypeTableService } from '../data-of-type-table/data-of-type-table.service';
import { ProgrammTableService } from '../programm-table/programm-table.service';
import { CreateAboutProgrammTableDto } from './dto/create-about-programm-table.dto';
import { UpdateAboutProgrammTableDto } from './dto/update-about-programm-table.dto';
import { AboutProgrammTable } from './entities/about-programm-table.entity';

@Injectable()
export class AboutProgrammTableService {
  constructor(
    @InjectModel(AboutProgrammTable)
    private repository: typeof AboutProgrammTable,
    private readonly answerTableService: AnswerTableService,
    private readonly dataOfTypeTableService: DataOfTypeTableService,
    private readonly programmTableService: ProgrammTableService,
  ) {}

  entityName = 'О Программах';

  async create(createAboutProgrammTableDto: CreateAboutProgrammTableDto) {
    const { answer_id, data_of_type_id, programm_id } =
      createAboutProgrammTableDto;

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

    await this.programmTableService.validateOne({
      column: 'id',
      type: 'existing',
      value: programm_id,
    });

    return this.repository.create(createAboutProgrammTableDto);
  }

  findAll(option: FindOptions<AboutProgrammTable> = {}) {
    return this.repository.findAll(option);
  }

  findOne(option: FindOptions<AboutProgrammTable> = {}) {
    return this.repository.findOne(option);
  }

  async update(
    id: number,
    updateAboutProgrammTableDto: UpdateAboutProgrammTableDto,
  ) {
    const { answer_id, data_of_type_id, programm_id } =
      updateAboutProgrammTableDto;

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

    if (entity.programm_id !== programm_id)
      await this.programmTableService.validateOne({
        column: 'id',
        type: 'existing',
        value: programm_id,
      });

    return entity.update(updateAboutProgrammTableDto);
  }

  async remove(id: number) {
    const entity = await this.validateOne({
      type: 'existing',
      column: 'id',
      value: id,
    });

    await entity.destroy();
  }

  async validateOne(props: ValidateOption<AboutProgrammTable>) {
    //? Одиночный валидатор
    return databaseValidateOne(AboutProgrammTable, this.entityName, props);
  }

  async validateAll(props: ValidateOption<AboutProgrammTable>[]) {
    //? Групповой валидатор
    return databaseValidateAll(AboutProgrammTable, this.entityName, props);
  }
}
