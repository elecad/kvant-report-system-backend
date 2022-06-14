import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PlaceController } from './place.controller';
import { Place } from './place.model';
import { PlaceService } from './place.service';

@Module({
  controllers: [PlaceController],
  providers: [PlaceService],
  imports: [SequelizeModule.forFeature([Place])],
})
export class PlaceModule {}
