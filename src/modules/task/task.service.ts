import { Injectable } from '@nestjs/common';
import { CreateTaskTableDto } from '../entities/task-table/dto/create-task-table.dto';
import { UpdateTaskTableDto } from '../entities/task-table/dto/update-task-table.dto';
import { TaskTableService } from '../entities/task-table/task-table.service';

@Injectable()
export class TaskService {
  constructor(private readonly taskTableService: TaskTableService) {}
  async create(createTaskDto: CreateTaskTableDto) {
    const { author_id, ...clientTask } = (
      await this.taskTableService.create(createTaskDto)
    ).toJSON();
    return clientTask;
  }

  async update(id: number, updateTaskDto: UpdateTaskTableDto) {
    const task = await this.taskTableService.validateOne({
      column: 'id',
      type: 'existing',
      value: id,
    });

    await task.update(updateTaskDto);
    return task.toJSON();
  }
}
