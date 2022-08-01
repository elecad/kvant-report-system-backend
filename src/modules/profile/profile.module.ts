import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { SessionModule } from '../session/session.module';
import { TaskModule } from '../task/task.module';
import { AboutDependencyModule } from '../about_dependency/about_dependency.module';

@Module({
  controllers: [ProfileController],
  providers: [ProfileService],
  imports: [SessionModule, TaskModule, AboutDependencyModule],
})
export class ProfileModule {}
