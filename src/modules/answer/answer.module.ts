import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AboutDependencyModule } from '../about_dependency/about_dependency.module';
import { AboutProgrammModule } from '../about_programm/about_programm.module';
import { AccountModule } from '../account/account.module';
import { ProgrammModule } from '../programm/programm.module';
import { ReportModule } from '../report/report.module';
import { TaskModule } from '../task/task.module';
import { AnswerController } from './answer.controller';
import { AnswerService } from './answer.service';
import { Answer } from './entities/answer.entity';

@Module({
  controllers: [AnswerController],
  providers: [AnswerService],
  imports: [
    SequelizeModule.forFeature([Answer]),
    forwardRef(() => AccountModule),
    TaskModule,
    ReportModule,
    forwardRef(() => ProgrammModule),
    AboutProgrammModule,
    forwardRef(() => AboutDependencyModule),
  ],
  exports: [AnswerService],
})
export class AnswerModule {}
