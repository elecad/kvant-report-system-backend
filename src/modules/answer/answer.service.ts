import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';
import {
  databaseValidateAll,
  databaseValidateOne,
  ValidateOption,
} from 'src/validators/dataBase.validator';
import { AccountService } from '../account/account.service';
import { TaskService } from '../task/task.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { Answer } from './entities/answer.entity';

@Injectable()
export class AnswerService {
  constructor(
    @InjectModel(Answer) private answerRepository: typeof Answer,

    @Inject(forwardRef(() => AccountService))
    private accountService: AccountService,
    private taskService: TaskService,
  ) {}

  private entityName = 'Ответ';

  async create(createAnswerDto: CreateAnswerDto) {
    await this.accountService.validateOne({
      type: 'existing',
      column: 'id',
      value: createAnswerDto.responder_id,
    });

    await this.taskService.validateOne({
      type: 'existing',
      column: 'id',
      value: createAnswerDto.task_id,
    });

    const { id } = await this.answerRepository.create(createAnswerDto);
    return { id };
  }

  findAll(option: FindOptions<Answer> = {}) {
    return this.answerRepository.findAll(option);
  }

  findOne(option: FindOptions<Answer> = {}) {
    return this.answerRepository.findOne(option);
  }

  async update(id: number, updateAnswerDto: UpdateAnswerDto) {
    const entity = await this.validateOne({
      type: 'existing',
      column: 'id',
      value: id,
    });

    if (entity.responder_id !== updateAnswerDto.responder_id)
      await this.accountService.validateOne({
        type: 'existing',
        column: 'id',
        value: updateAnswerDto.responder_id,
      });
    if (entity.task_id !== updateAnswerDto.task_id)
      await this.taskService.validateOne({
        type: 'existing',
        column: 'id',
        value: updateAnswerDto.task_id,
      });
    await entity.update(updateAnswerDto);
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

  async validateOne(props: ValidateOption<Answer>) {
    //? Одиночный валидатор
    return databaseValidateOne(Answer, this.entityName, props);
  }

  async validateAll(props: ValidateOption<Answer>[]) {
    //? Групповой валидатор
    return databaseValidateAll(Answer, this.entityName, props);
  }
}
