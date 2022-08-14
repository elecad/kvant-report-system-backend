import { Module } from '@nestjs/common';
import { DirectionTableService } from './direction-table.service';
import { DirectionTableController } from './direction-table.controller';

@Module({
  controllers: [DirectionTableController],
  providers: [DirectionTableService]
})
export class DirectionTableModule {}
