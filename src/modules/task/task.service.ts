import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';
import {
  databaseValidateAll,
  databaseValidateOne,
  ValidateOption,
} from 'src/validators/dataBase.validator';
import { AccountService } from '../account/account.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task) private taskRepository: typeof Task,
    private accountService: AccountService,
  ) {}

  private entityName = 'Задание';

  async create(createTaskDto: CreateTaskDto) {
    await this.validateOne({
      type: 'existing',
      column: 'id',
      value: createTaskDto.author_id,
    });

    const { id } = await this.taskRepository.create(createTaskDto);
    return { id };
  }

  findAll(option: FindOptions<Task> = {}) {
    return this.taskRepository.findAll(option);
  }

  findOne(option: FindOptions<Task> = {}) {
    return this.taskRepository.findOne(option);
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const entity = await this.validateOne({
      type: 'existing',
      column: 'id',
      value: id,
    });

    if (entity.author_id !== updateTaskDto.author_id)
      await this.accountService.validateOne({
        type: 'existing',
        column: 'id',
        value: updateTaskDto.author_id,
      });

    await entity.update(updateTaskDto);
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

  async validateOne(props: ValidateOption<Task>) {
    //? Одиночный валидатор
    return databaseValidateOne(Task, this.entityName, props);
  }

  async validateAll(props: ValidateOption<Task>[]) {
    //? Групповой валидатор
    return databaseValidateAll(Task, this.entityName, props);
  }
}
