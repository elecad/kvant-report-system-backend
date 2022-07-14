import { Module } from '@nestjs/common';
import { DependencyTypeService } from './dependency_type.service';
import { DependencyTypeController } from './dependency_type.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { DependencyType } from './entities/dependency_type.entity';

@Module({
  controllers: [DependencyTypeController],
  providers: [DependencyTypeService],
  imports: [SequelizeModule.forFeature([DependencyType])],
  exports: [DependencyTypeService],
})
export class DependencyTypeModule {}
