import { Module } from '@nestjs/common';
import { DataOfTypeTableService } from './data-of-type-table.service';
import { DataOfTypeTableController } from './data-of-type-table.controller';

@Module({
  controllers: [DataOfTypeTableController],
  providers: [DataOfTypeTableService]
})
export class DataOfTypeTableModule {}
