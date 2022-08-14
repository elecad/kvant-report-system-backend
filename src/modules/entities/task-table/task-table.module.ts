import { Module } from '@nestjs/common';
import { TaskTableService } from './task-table.service';
import { TaskTableController } from './task-table.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { TaskTable } from './entities/task-table.entity';

@Module({
  controllers: [TaskTableController],
  providers: [TaskTableService],
  imports: [SequelizeModule.forFeature([TaskTable])],
  exports: [TaskTableService],
})
export class TaskTableModule {}
