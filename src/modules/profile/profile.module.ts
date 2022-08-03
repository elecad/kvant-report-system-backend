import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { SessionModule } from '../session/session.module';
import { TaskModule } from '../task/task.module';
import { AboutDependencyModule } from '../about_dependency/about_dependency.module';
import { ReportModule } from '../report/report.module';
import { ProgrammModule } from '../programm/programm.module';
import { AccountModule } from '../account/account.module';
import { DependencyModule } from '../dependency/dependency.module';
import { AnswerModule } from '../answer/answer.module';

@Module({
  controllers: [ProfileController],
  providers: [ProfileService],
  imports: [
    SessionModule,
    TaskModule,
    // AboutDependencyModule,
    // ReportModule,
    // ProgrammModule,
    AccountModule,
    DependencyModule,
    AnswerModule,
  ],
})
export class ProfileModule {}
