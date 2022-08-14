import { Module } from '@nestjs/common';
import { SchoolTableService } from './school-table.service';
import { SchoolTableController } from './school-table.controller';

@Module({
  controllers: [SchoolTableController],
  providers: [SchoolTableService]
})
export class SchoolTableModule {}
