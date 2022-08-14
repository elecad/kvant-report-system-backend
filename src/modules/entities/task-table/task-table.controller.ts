import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { TaskTableService } from './task-table.service';
import { CreateTaskTableDto } from './dto/create-task-table.dto';
import { UpdateTaskTableDto } from './dto/update-task-table.dto';
import { parseIntOptions } from 'src/validators/options/parseIntPipe.option';

@Controller('task-table')
export class TaskTableController {
  constructor(private readonly taskTableService: TaskTableService) {}

  @Post()
  create(@Body() createTaskTableDto: CreateTaskTableDto) {
    return this.taskTableService.create(createTaskTableDto);
  }

  @Get()
  findAll() {
    return this.taskTableService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe(parseIntOptions)) id: number) {
    return this.taskTableService.validateOne({
      column: 'id',
      type: 'existing',
      value: id,
    });
  }

  @Patch(':id')
  update(
    @Param('id', new ParseIntPipe(parseIntOptions)) id: number,
    @Body() updateTaskTableDto: UpdateTaskTableDto,
  ) {
    return this.taskTableService.update(id, updateTaskTableDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseIntPipe(parseIntOptions)) id: number) {
    return this.taskTableService.remove(id);
  }
}
