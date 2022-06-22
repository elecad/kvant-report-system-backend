import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PlaceData } from './place_data.model';
import { PlaceDataController } from './place_data.controller';
import { PlaceDataService } from './place_data.service';

@Module({ imports: [SequelizeModule.forFeature([PlaceData])], controllers: [PlaceDataController], providers: [PlaceDataService] })
export class PlaceDataModule {}
