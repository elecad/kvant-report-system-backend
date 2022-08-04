import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AnswerModule } from '../answer/answer.module';
import { DependencyModule } from '../dependency/dependency.module';
import { AboutDependencyController } from './about_dependency.controller';
import { AboutDependencyService } from './about_dependency.service';
import { AboutDependency } from './entities/about_dependency.entity';

@Module({
  controllers: [AboutDependencyController],
  providers: [AboutDependencyService],
  imports: [
    SequelizeModule.forFeature([AboutDependency]),
    forwardRef(() => AnswerModule),
    forwardRef(() => DependencyModule),
  ],
  exports: [AboutDependencyService],
})
export class AboutDependencyModule {}
