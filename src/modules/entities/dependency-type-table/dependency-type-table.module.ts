import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DependencyTypeTableController } from './dependency-type-table.controller';
import { DependencyTypeTableService } from './dependency-type-table.service';
import { DependencyTypeTable } from './entities/dependency-type-table.entity';

@Module({
  controllers: [DependencyTypeTableController],
  providers: [DependencyTypeTableService],
  imports: [SequelizeModule.forFeature([DependencyTypeTable])],
  exports: [DependencyTypeTableService],
})
export class DependencyTypeTableModule {}
