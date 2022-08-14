import { Module } from '@nestjs/common';
import { SchoolTypeTableService } from './school-type-table.service';
import { SchoolTypeTableController } from './school-type-table.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { SchoolTypeTable } from './entities/school-type-table.entity';

@Module({
  controllers: [SchoolTypeTableController],
  providers: [SchoolTypeTableService],
  imports: [SequelizeModule.forFeature([SchoolTypeTable])],
  exports: [SchoolTypeTableService],
})
export class SchoolTypeTableModule {}
