import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';
import {
  databaseValidateAll,
  databaseValidateOne,
  ValidateOption,
} from 'src/validators/database.validator';
import { AccountTableService } from '../account-table/account-table.service';
import { TaskTableService } from '../task-table/task-table.service';
import { CreateAnswerTableDto } from './dto/create-answer-table.dto';
import { UpdateAnswerTableDto } from './dto/update-answer-table.dto';
import { AnswerTable } from './entities/answer-table.entity';

@Injectable()
export class AnswerTableService {
  constructor(
    @InjectModel(AnswerTable) private repository: typeof AnswerTable,
    private readonly accountTableService: AccountTableService,
    private readonly taskTableService: TaskTableService,
  ) {}

  entityName = 'Ответ';

  async create(createAnswerTableDto: CreateAnswerTableDto) {
    const { responder_id, task_id } = createAnswerTableDto;

    await this.accountTableService.validateOne({
      column: 'id',
      type: 'existing',
      value: responder_id,
    });

    await this.taskTableService.validateOne({
      column: 'id',
      type: 'existing',
      value: task_id,
    });

    return this.repository.create(createAnswerTableDto);
  }

  findAll(option: FindOptions<AnswerTable> = {}) {
    return this.repository.findAll(option);
  }

  findOne(option: FindOptions<AnswerTable> = {}) {
    return this.repository.findOne(option);
  }

  async update(id: number, updateAnswerTableDto: UpdateAnswerTableDto) {
    const { responder_id, task_id } = updateAnswerTableDto;

    const entity = await this.validateOne({
      type: 'existing',
      column: 'id',
      value: id,
    });

    if (entity.responder_id !== responder_id)
      await this.accountTableService.validateOne({
        column: 'id',
        type: 'existing',
        value: responder_id,
      });

    if (entity.task_id !== task_id)
      await this.taskTableService.validateOne({
        column: 'id',
        type: 'existing',
        value: task_id,
      });

    return entity.update(updateAnswerTableDto);
  }

  async remove(id: number) {
    const entity = await this.validateOne({
      type: 'existing',
      column: 'id',
      value: id,
    });

    await entity.destroy();
  }

  async validateOne(props: ValidateOption<AnswerTable>) {
    //? Одиночный валидатор
    return databaseValidateOne(AnswerTable, this.entityName, props);
  }

  async validateAll(props: ValidateOption<AnswerTable>[]) {
    //? Групповой валидатор
    return databaseValidateAll(AnswerTable, this.entityName, props);
  }
}
