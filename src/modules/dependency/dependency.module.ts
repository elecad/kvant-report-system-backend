import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DependencyTypeModule } from '../dependency_type/dependency_type.module';
import { DependencyController } from './dependency.controller';
import { DependencyService } from './dependency.service';
import { Dependency } from './entities/dependency.entity';

@Module({
  controllers: [DependencyController],
  providers: [DependencyService],
  imports: [DependencyTypeModule, SequelizeModule.forFeature([Dependency])],
  exports: [DependencyService],
})
export class DependencyModule {}
