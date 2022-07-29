import { Module } from '@nestjs/common';
import { DataService } from './data.service';
import { DataController } from './data.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Datum } from './entities/datum.entity';
import { DataOfTypeModule } from '../data_of_type/data_of_type.module';

@Module({
  controllers: [DataController],
  providers: [DataService],
  imports: [SequelizeModule.forFeature([Datum]), DataOfTypeModule],
  exports: [DataService],
})
export class DataModule {}
