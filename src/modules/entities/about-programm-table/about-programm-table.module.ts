import { Module } from '@nestjs/common';
import { AboutProgrammTableService } from './about-programm-table.service';
import { AboutProgrammTableController } from './about-programm-table.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AboutProgrammTable } from './entities/about-programm-table.entity';
import { AnswerTableModule } from '../answer-table/answer-table.module';
import { DataOfTypeTableModule } from '../data-of-type-table/data-of-type-table.module';
import { ProgrammTableModule } from '../programm-table/programm-table.module';

@Module({
  controllers: [AboutProgrammTableController],
  providers: [AboutProgrammTableService],
  imports: [
    SequelizeModule.forFeature([AboutProgrammTable]),
    AnswerTableModule,
    DataOfTypeTableModule,
    ProgrammTableModule,
  ],
  exports: [AboutProgrammTableService],
})
export class AboutProgrammTableModule {}
