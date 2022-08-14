import { Module } from '@nestjs/common';
import { SchoolTableService } from './school-table.service';
import { SchoolTableController } from './school-table.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { SchoolTable } from './entities/school-table.entity';
import { SchoolTypeTableModule } from '../school-type-table/school-type-table.module';
import { DependencyTableModule } from '../dependency-table/dependency-table.module';

@Module({
  controllers: [SchoolTableController],
  providers: [SchoolTableService],
  imports: [
    SequelizeModule.forFeature([SchoolTable]),
    SchoolTypeTableModule,
    DependencyTableModule,
  ],
  exports: [SchoolTableService],
})
export class SchoolTableModule {}
