import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { SessionModule } from '../session/session.module';
import { TaskModule } from '../task/task.module';
import { AboutDependencyModule } from '../about_dependency/about_dependency.module';
import { ReportModule } from '../report/report.module';
import { ProgrammModule } from '../programm/programm.module';
import { AccountModule } from '../account/account.module';

@Module({
  controllers: [ProfileController],
  providers: [ProfileService],
  imports: [
    SessionModule,
    TaskModule,
    AboutDependencyModule,
    ReportModule,
    ProgrammModule,
    AccountModule,
  ],
})
export class ProfileModule {}
