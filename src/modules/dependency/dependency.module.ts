import { Module } from '@nestjs/common';
import { AboutDependencyTableModule } from '../entities/about-dependency-table/about-dependency-table.module';
import { AccountTableModule } from '../entities/account-table/account-table.module';
import { DependencyTableModule } from '../entities/dependency-table/dependency-table.module';
import { TaskTableModule } from '../entities/task-table/task-table.module';
import { DependencyController } from './dependency.controller';
import { DependencyService } from './dependency.service';

@Module({
  controllers: [DependencyController],
  providers: [DependencyService],
  imports: [
    DependencyTableModule,
    AccountTableModule,
    TaskTableModule,
    AboutDependencyTableModule,
  ],
  exports: [DependencyService],
})
export class DependencyModule {}
