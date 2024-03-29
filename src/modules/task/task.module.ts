import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TaskTableModule } from '../entities/task-table/task-table.module';
import { SessionTableModule } from '../entities/session-table/session-table.module';
import { AccountModule } from '../account/account.module';

@Module({
  controllers: [TaskController],
  providers: [TaskService],
  imports: [TaskTableModule, SessionTableModule, TaskModule],
  exports: [TaskService],
})
export class TaskModule {}
