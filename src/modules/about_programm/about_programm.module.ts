import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AnswerModule } from '../answer/answer.module';
import { ProgrammModule } from '../programm/programm.module';
import { AboutProgrammController } from './about_programm.controller';
import { AboutProgrammService } from './about_programm.service';
import { AboutProgramm } from './entities/about_programm.entity';

@Module({
  controllers: [AboutProgrammController],
  providers: [AboutProgrammService],
  imports: [
    SequelizeModule.forFeature([AboutProgramm]),
    AnswerModule,
    ProgrammModule,
  ],
  exports: [AboutProgrammService],
})
export class AboutProgrammModule {}
