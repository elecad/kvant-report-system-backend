import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AccountTableModule } from '../account-table/account-table.module';
import { TaskTableModule } from '../task-table/task-table.module';
import { AnswerTableController } from './answer-table.controller';
import { AnswerTableService } from './answer-table.service';
import { AnswerTable } from './entities/answer-table.entity';

@Module({
  controllers: [AnswerTableController],
  providers: [AnswerTableService],
  imports: [
    SequelizeModule.forFeature([AnswerTable]),
    AccountTableModule,
    TaskTableModule,
  ],
  exports: [AnswerTableService],
})
export class AnswerTableModule {}
