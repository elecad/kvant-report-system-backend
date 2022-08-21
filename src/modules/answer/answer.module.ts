import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';
import { AnswerTableModule } from '../entities/answer-table/answer-table.module';
import { ReportModule } from '../report/report.module';
import { AboutDependencyTableModule } from '../entities/about-dependency-table/about-dependency-table.module';
import { AboutProgrammTableModule } from '../entities/about-programm-table/about-programm-table.module';

@Module({
  controllers: [AnswerController],
  providers: [AnswerService],
  exports: [AnswerService],
  imports: [
    AnswerTableModule,
    ReportModule,
    AboutDependencyTableModule,
    AboutProgrammTableModule,
  ],
})
export class AnswerModule {}
