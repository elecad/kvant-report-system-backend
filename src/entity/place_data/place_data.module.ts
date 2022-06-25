import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PlaceData } from './place_data.model';
import { PlaceDataController } from './place_data.controller';
import { PlaceDataService } from './place_data.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [SequelizeModule.forFeature([PlaceData]), AuthModule],
  controllers: [PlaceDataController],
  providers: [PlaceDataService],
})
export class PlaceDataModule {}
