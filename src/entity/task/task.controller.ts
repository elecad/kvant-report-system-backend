import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { queryIdDto } from 'src/dto/query-id.dto';
import { createTaskDto } from './dto/create-task.dto';
import { Task } from './task.model';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Просмотр Программы по ID' })
  @ApiResponse({ status: 200, type: Task })
  getByID(@Param() params: queryIdDto) {
    const id: number = +params.id;
    return this.taskService.getById(id);
  }

  @Get()
  @ApiOperation({ summary: 'Просмотр всех Программ' })
  @ApiResponse({ status: 200, type: [Task] })
  getAll() {
    return this.taskService.getAll();
  }

  @Post()
  @ApiOperation({ summary: 'Создание новой Программы' })
  @ApiResponse({ status: 200 })
  create(@Body() accountDto: createTaskDto) {
    return this.taskService.create(accountDto);
  }

  @Put(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Изменение Программы' })
  @ApiResponse({ status: 204 })
  update(@Param() params: queryIdDto, @Body() dto: createTaskDto) {
    const id: number = +params.id;
    return this.taskService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Удаление Программы' })
  @ApiResponse({ status: 204 })
  delete(@Param() params: queryIdDto) {
    const id: number = +params.id;
    return this.taskService.delete(id);
  }
}
