import { Module } from '@nestjs/common';
import { ProgrammDataService } from './programm_data.service';
import { ProgrammDataController } from './programm_data.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProgrammData } from './programm_data.model';

@Module({
  providers: [ProgrammDataService],
  controllers: [ProgrammDataController],
  imports: [SequelizeModule.forFeature([ProgrammData])],
})
export class ProgrammDataModule {}
