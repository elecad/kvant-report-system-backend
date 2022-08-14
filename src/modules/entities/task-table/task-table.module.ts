import { Module } from '@nestjs/common';
import { TaskTableService } from './task-table.service';
import { TaskTableController } from './task-table.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { TaskTable } from './entities/task-table.entity';
import { AccountTableModule } from '../account-table/account-table.module';

@Module({
  controllers: [TaskTableController],
  providers: [TaskTableService],
  imports: [SequelizeModule.forFeature([TaskTable]), AccountTableModule],
  exports: [TaskTableService],
})
export class TaskTableModule {}
