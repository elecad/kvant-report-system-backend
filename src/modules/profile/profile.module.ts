import { Module } from '@nestjs/common';
import { AccountModule } from '../account/account.module';
import { AnswerModule } from '../answer/answer.module';
import { DependencyModule } from '../dependency/dependency.module';
import { SessionTableModule } from '../entities/session-table/session-table.module';
import { TaskModule } from '../task/task.module';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

@Module({
  controllers: [ProfileController],
  providers: [ProfileService],
  imports: [
    SessionTableModule,
    TaskModule,
    AccountModule,
    DependencyModule,
    AnswerModule,
  ],
})
export class ProfileModule {}
