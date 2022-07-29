import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Task } from './entities/task.entity';
import { AccountModule } from '../account/account.module';

@Module({
  controllers: [TaskController],
  providers: [TaskService],
  imports: [SequelizeModule.forFeature([Task]), AccountModule],
  exports: [TaskService],
})
export class TaskModule {}
