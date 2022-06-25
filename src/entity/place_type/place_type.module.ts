import { Module } from '@nestjs/common';
import { PlaceTypeService } from './place_type.service';
import { PlaceTypeController } from './place_type.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { PlaceType } from './place_type.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [PlaceTypeService],
  controllers: [PlaceTypeController],
  imports: [SequelizeModule.forFeature([PlaceType]), AuthModule],
})
export class PlaceTypeModule {}
