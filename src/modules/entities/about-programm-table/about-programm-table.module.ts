import { Module } from '@nestjs/common';
import { AboutProgrammTableService } from './about-programm-table.service';
import { AboutProgrammTableController } from './about-programm-table.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AboutProgrammTable } from './entities/about-programm-table.entity';

@Module({
  controllers: [AboutProgrammTableController],
  providers: [AboutProgrammTableService],
  imports: [SequelizeModule.forFeature([AboutProgrammTable])],
  exports: [AboutProgrammTableService],
})
export class AboutProgrammTableModule {}
