import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DirectionController } from './direction.controller';
import { Direction } from './direction.model';
import { DirectionService } from './direction.service';

@Module({
  controllers: [DirectionController],
  providers: [DirectionService],
  imports: [SequelizeModule.forFeature([Direction])],
})
export class DirectionModule {}
