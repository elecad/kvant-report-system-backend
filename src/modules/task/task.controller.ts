import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth-guard/auth.guard';
import { Roles } from 'src/guards/auth-guard/decorators/roles.decorator';
import { User } from 'src/guards/auth-guard/decorators/user.decorator';
import { AuthUser } from 'src/guards/auth-guard/interfaces/auth.interface';
import { parseIntOptions } from 'src/validators/options/parseIntPipe.option';
import { CreateTaskTableDto } from '../entities/task-table/dto/create-task-table.dto';
import { UpdateTaskTableDto } from '../entities/task-table/dto/update-task-table.dto';
import { TaskTableService } from '../entities/task-table/task-table.service';
import { TaskService } from './task.service';

@Controller('task')
@UseGuards(AuthGuard)
@Roles('admin')
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
    private readonly taskTableService: TaskTableService,
  ) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskTableDto, @User() user: AuthUser) {
    return this.taskTableService.create({
      ...createTaskDto,
      author_id: user.id,
    });
  }

  @Get()
  findAll() {
    return this.taskTableService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe(parseIntOptions)) id: number) {
    return this.taskTableService.validateOne({
      type: 'existing',
      column: 'id',
      value: id,
    });
  }

  @Patch(':id')
  update(
    @Param('id', new ParseIntPipe(parseIntOptions)) id: number,
    @Body() updateTaskDto: UpdateTaskTableDto,
    @User() user: AuthUser,
  ) {
    return this.taskTableService.update(id, {
      ...updateTaskDto,
      author_id: user.id,
    });
  }

  @Delete(':id')
  remove(@Param('id', new ParseIntPipe(parseIntOptions)) id: number) {
    return this.taskTableService.remove(id);
  }
}
