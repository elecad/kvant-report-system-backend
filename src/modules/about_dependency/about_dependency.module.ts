import { Module } from '@nestjs/common';
import { AboutDependencyService } from './about_dependency.service';
import { AboutDependencyController } from './about_dependency.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AboutDependency } from './entities/about_dependency.entity';
import { AnswerModule } from '../answer/answer.module';
import { DependencyModule } from '../dependency/dependency.module';
import { DataModule } from '../data/data.module';

@Module({
  controllers: [AboutDependencyController],
  providers: [AboutDependencyService],
  imports: [
    SequelizeModule.forFeature([AboutDependency]),
    AnswerModule,
    DependencyModule,
    DataModule,
  ],
  exports: [AboutDependencyService],
})
export class AboutDependencyModule {}
