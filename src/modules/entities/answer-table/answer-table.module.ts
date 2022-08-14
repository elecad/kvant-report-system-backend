import { Module } from '@nestjs/common';
import { AnswerTableService } from './answer-table.service';
import { AnswerTableController } from './answer-table.controller';

@Module({
  controllers: [AnswerTableController],
  providers: [AnswerTableService]
})
export class AnswerTableModule {}
