import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Answer } from './answer.model';
import { AnswerService } from './answer.service';

@Module({
  providers: [AnswerService],
  imports: [SequelizeModule.forFeature([Answer])],
})
export class AnswerModule {}
