import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { createTaskDto } from './dto/create-task.dto';
import { Task } from './task.model';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task) private taskRepository: typeof Task) {}

  async getAll() {
    const programm = await this.taskRepository.findAll();
    return programm;
  }

  async getById(id: number) {
    const programm = await this.taskRepository.findByPk(id);
    if (!programm)
      throw new HttpException(
        'Задание с таким ID не найдено',
        HttpStatus.BAD_REQUEST,
      );
    return programm;
  }

  async create(dto: createTaskDto) {
    const programm = await this.taskRepository.create(dto);
    return { id: programm.id };
  }

  async update(id, dto) {
    const programm = await this.getById(id);
    programm.update(dto);
  }

  async delete(id) {
    const programm = await this.getById(id);
    programm.destroy();
  }
}
