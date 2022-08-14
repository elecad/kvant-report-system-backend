import { Module } from '@nestjs/common';
import { AnswerTableService } from './answer-table.service';
import { AnswerTableController } from './answer-table.controller';
import { AnswerTable } from './entities/answer-table.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  controllers: [AnswerTableController],
  providers: [AnswerTableService],
  imports: [SequelizeModule.forFeature([AnswerTable])],
  exports: [AnswerTableService],
})
export class AnswerTableModule {}
