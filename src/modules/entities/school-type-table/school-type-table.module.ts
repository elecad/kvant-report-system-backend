import { Module } from '@nestjs/common';
import { SchoolTypeTableService } from './school-type-table.service';
import { SchoolTypeTableController } from './school-type-table.controller';

@Module({
  controllers: [SchoolTypeTableController],
  providers: [SchoolTypeTableService]
})
export class SchoolTypeTableModule {}
