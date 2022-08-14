import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';
import {
  databaseValidateAll,
  databaseValidateOne,
  ValidateOption,
} from 'src/validators/database.validator';
import { TaskTableService } from '../task-table/task-table.service';
import { CreateFileTableDto } from './dto/create-file-table.dto';
import { UpdateFileTableDto } from './dto/update-file-table.dto';
import { FileTable } from './entities/file-table.entity';

@Injectable()
export class FileTableService {
  constructor(
    @InjectModel(FileTable) private repository: typeof FileTable,
    private readonly taskTableService: TaskTableService,
  ) {}

  entityName = 'Файл';

  async create(createFileTableDto: CreateFileTableDto) {
    const { task_id } = createFileTableDto;

    await this.taskTableService.validateOne({
      column: 'id',
      type: 'unique',
      value: task_id,
    });

    return this.repository.create(createFileTableDto);
  }

  findAll(option: FindOptions<FileTable> = {}) {
    return this.repository.findAll(option);
  }

  findOne(option: FindOptions<FileTable> = {}) {
    return this.repository.findOne(option);
  }

  async update(id: number, updateFileTableDto: UpdateFileTableDto) {
    const { task_id } = updateFileTableDto;

    const entity = await this.validateOne({
      type: 'existing',
      column: 'id',
      value: id,
    });

    if (entity.task_id !== task_id)
      await this.taskTableService.validateOne({
        column: 'id',
        type: 'unique',
        value: task_id,
      });

    return entity.update(updateFileTableDto);
  }

  async remove(id: number) {
    const entity = await this.validateOne({
      type: 'existing',
      column: 'id',
      value: id,
    });

    await entity.destroy();
  }

  async validateOne(props: ValidateOption<FileTable>) {
    //? Одиночный валидатор
    return databaseValidateOne(FileTable, this.entityName, props);
  }

  async validateAll(props: ValidateOption<FileTable>[]) {
    //? Групповой валидатор
    return databaseValidateAll(FileTable, this.entityName, props);
  }
}
