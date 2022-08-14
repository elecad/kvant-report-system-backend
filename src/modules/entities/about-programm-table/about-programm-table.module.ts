import { Module } from '@nestjs/common';
import { AboutProgrammTableService } from './about-programm-table.service';
import { AboutProgrammTableController } from './about-programm-table.controller';

@Module({
  controllers: [AboutProgrammTableController],
  providers: [AboutProgrammTableService]
})
export class AboutProgrammTableModule {}
