import { forwardRef, Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Answer } from './entities/answer.entity';
import { AccountModule } from '../account/account.module';
import { TaskModule } from '../task/task.module';
import { ReportModule } from '../report/report.module';
import { ProgrammModule } from '../programm/programm.module';

@Module({
  controllers: [AnswerController],
  providers: [AnswerService],
  imports: [
    SequelizeModule.forFeature([Answer]),
    forwardRef(() => AccountModule),
    TaskModule,
    ReportModule,
    forwardRef(() => ProgrammModule),
  ],
  exports: [AnswerService],
})
export class AnswerModule {}
