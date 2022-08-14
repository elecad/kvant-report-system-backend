import { Module } from '@nestjs/common';
import { ProgrammTableService } from './programm-table.service';
import { ProgrammTableController } from './programm-table.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProgrammTable } from './entities/programm-table.entity';

@Module({
  controllers: [ProgrammTableController],
  providers: [ProgrammTableService],
  imports: [SequelizeModule.forFeature([ProgrammTable])],
  exports: [ProgrammTableService],
})
export class ProgrammTableModule {}
