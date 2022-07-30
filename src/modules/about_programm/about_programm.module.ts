import { Module } from '@nestjs/common';
import { AboutProgrammService } from './about_programm.service';
import { AboutProgrammController } from './about_programm.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AboutProgramm } from './entities/about_programm.entity';
import { AnswerModule } from '../answer/answer.module';
import { ProgrammModule } from '../programm/programm.module';
import { DataModule } from '../data/data.module';

@Module({
  controllers: [AboutProgrammController],
  providers: [AboutProgrammService],
  imports: [
    SequelizeModule.forFeature([AboutProgramm]),
    AnswerModule,
    ProgrammModule,
    DataModule,
  ],
  exports: [AboutProgrammService],
})
export class AboutProgrammModule {}
