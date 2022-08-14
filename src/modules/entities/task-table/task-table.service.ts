import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';
import {
  databaseValidateAll,
  databaseValidateOne,
  ValidateOption,
} from 'src/validators/database.validator';
import { AccountTableService } from '../account-table/account-table.service';
import { CreateTaskTableDto } from './dto/create-task-table.dto';
import { UpdateTaskTableDto } from './dto/update-task-table.dto';
import { TaskTable } from './entities/task-table.entity';

@Injectable()
export class TaskTableService {
  constructor(
    @InjectModel(TaskTable) private repository: typeof TaskTable,
    private readonly accountTableService: AccountTableService,
  ) {}

  entityName = 'Задание';

  async create(createTaskTableDto: CreateTaskTableDto) {
    const { author_id } = createTaskTableDto;
    await this.accountTableService.validateOne({
      column: 'id',
      type: 'existing',
      value: author_id,
    });
    return this.repository.create(createTaskTableDto);
  }

  findAll(option: FindOptions<TaskTable> = {}) {
    return this.repository.findAll(option);
  }

  findOne(option: FindOptions<TaskTable> = {}) {
    return this.repository.findOne(option);
  }

  async update(id: number, updateTaskTableDto: UpdateTaskTableDto) {
    const { author_id } = updateTaskTableDto;

    const entity = await this.validateOne({
      type: 'existing',
      column: 'id',
      value: id,
    });

    if (entity.author_id !== author_id)
      await this.accountTableService.validateOne({
        column: 'id',
        type: 'existing',
        value: author_id,
      });

    return entity.update(updateTaskTableDto);
  }

  async remove(id: number) {
    const entity = await this.validateOne({
      type: 'existing',
      column: 'id',
      value: id,
    });

    await entity.destroy();
  }

  async validateOne(props: ValidateOption<TaskTable>) {
    //? Одиночный валидатор
    return databaseValidateOne(TaskTable, this.entityName, props);
  }

  async validateAll(props: ValidateOption<TaskTable>[]) {
    //? Групповой валидатор
    return databaseValidateAll(TaskTable, this.entityName, props);
  }
}
