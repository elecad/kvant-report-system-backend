import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AboutDependencyModule } from '../about_dependency/about_dependency.module';
import { DependencyTypeModule } from '../dependency_type/dependency_type.module';
import { TaskModule } from '../task/task.module';
import { DependencyController } from './dependency.controller';
import { DependencyService } from './dependency.service';
import { Dependency } from './entities/dependency.entity';

@Module({
  controllers: [DependencyController],
  providers: [DependencyService],
  imports: [
    DependencyTypeModule,
    SequelizeModule.forFeature([Dependency]),
    TaskModule,
    AboutDependencyModule,
  ],
  exports: [DependencyService],
})
export class DependencyModule {}
