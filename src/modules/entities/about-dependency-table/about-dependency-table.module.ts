import { Module } from '@nestjs/common';
import { AboutDependencyTableService } from './about-dependency-table.service';
import { AboutDependencyTableController } from './about-dependency-table.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AboutDependencyTable } from './entities/about-dependency-table.entity';

@Module({
  controllers: [AboutDependencyTableController],
  providers: [AboutDependencyTableService],
  imports: [SequelizeModule.forFeature([AboutDependencyTable])],
  exports: [AboutDependencyTableService],
})
export class AboutDependencyTableModule {}
