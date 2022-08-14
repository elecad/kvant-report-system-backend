import { Module } from '@nestjs/common';
import { DependencyTableService } from './dependency-table.service';
import { DependencyTableController } from './dependency-table.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { DependencyTable } from './entities/dependency-table.entity';

@Module({
  controllers: [DependencyTableController],
  providers: [DependencyTableService],
  imports: [SequelizeModule.forFeature([DependencyTable])],
})
export class DependencyTableModule {}
