import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { PlaceController } from './place.controller';
import { Place } from './place.model';
import { PlaceService } from './place.service';

@Module({
  controllers: [PlaceController],
  providers: [PlaceService],
  imports: [SequelizeModule.forFeature([Place]), AuthModule],
  exports: [PlaceService],
})
export class PlaceModule {}
