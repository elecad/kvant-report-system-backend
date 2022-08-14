import { Injectable } from '@nestjs/common';
import { CreateTaskTableDto } from './dto/create-task-table.dto';
import { UpdateTaskTableDto } from './dto/update-task-table.dto';

@Injectable()
export class TaskTableService {
  create(createTaskTableDto: CreateTaskTableDto) {
    return 'This action adds a new taskTable';
  }

  findAll() {
    return `This action returns all taskTable`;
  }

  findOne(id: number) {
    return `This action returns a #${id} taskTable`;
  }

  update(id: number, updateTaskTableDto: UpdateTaskTableDto) {
    return `This action updates a #${id} taskTable`;
  }

  remove(id: number) {
    return `This action removes a #${id} taskTable`;
  }
}
