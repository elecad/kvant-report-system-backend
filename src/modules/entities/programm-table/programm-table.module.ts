import { Module } from '@nestjs/common';
import { ProgrammTableService } from './programm-table.service';
import { ProgrammTableController } from './programm-table.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProgrammTable } from './entities/programm-table.entity';
import { DirectionTableModule } from '../direction-table/direction-table.module';
import { DependencyTableModule } from '../dependency-table/dependency-table.module';
import { SchoolTableModule } from '../school-table/school-table.module';

@Module({
  controllers: [ProgrammTableController],
  providers: [ProgrammTableService],
  imports: [
    SequelizeModule.forFeature([ProgrammTable]),
    DirectionTableModule,
    DependencyTableModule,
    SchoolTableModule,
  ],
  exports: [ProgrammTableService],
})
export class ProgrammTableModule {}
