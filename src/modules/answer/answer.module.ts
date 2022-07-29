import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Answer } from './entities/answer.entity';
import { AccountModule } from '../account/account.module';
import { TaskModule } from '../task/task.module';

@Module({
  controllers: [AnswerController],
  providers: [AnswerService],
  imports: [SequelizeModule.forFeature([Answer]), AccountModule, TaskModule],
  exports: [AnswerService],
})
export class AnswerModule {}
