import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';
import {
  databaseValidateAll,
  databaseValidateOne,
  ValidateOption,
} from 'src/validators/dataBase.validator';
import { TaskService } from '../task/task.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { File } from './entities/file.entity';

@Injectable()
export class FileService {
  constructor(
    @InjectModel(File) private fileRepository: typeof File,
    private taskTypeService: TaskService,
  ) {}

  private entityName = 'Файл';

  async create(createFileDto: CreateFileDto) {
    await this.taskTypeService.validateOne({
      type: 'existing',
      column: 'id',
      value: createFileDto.task_id,
    });

    const { id } = await this.fileRepository.create(createFileDto);
    return { id };
  }

  findAll(option: FindOptions<File> = {}) {
    return this.fileRepository.findAll(option);
  }

  findOne(option: FindOptions<File> = {}) {
    return this.fileRepository.findOne(option);
  }

  async update(id: number, updateFileDto: UpdateFileDto) {
    const entity = await this.validateOne({
      type: 'existing',
      column: 'id',
      value: id,
    });
    if (entity.task_id !== updateFileDto.task_id)
      await this.taskTypeService.validateOne({
        type: 'existing',
        column: 'id',
        value: updateFileDto.task_id,
      });
    await entity.update(updateFileDto);
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

  async validateOne(props: ValidateOption<File>) {
    //? Одиночный валидатор
    return databaseValidateOne(File, this.entityName, props);
  }

  async validateAll(props: ValidateOption<File>[]) {
    //? Групповой валидатор
    return databaseValidateAll(File, this.entityName, props);
  }
}
