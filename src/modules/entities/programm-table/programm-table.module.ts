import { Module } from '@nestjs/common';
import { ProgrammTableService } from './programm-table.service';
import { ProgrammTableController } from './programm-table.controller';

@Module({
  controllers: [ProgrammTableController],
  providers: [ProgrammTableService]
})
export class ProgrammTableModule {}
