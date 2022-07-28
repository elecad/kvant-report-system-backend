import { Module } from '@nestjs/common';
import { DirectionService } from './direction.service';
import { DirectionController } from './direction.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Direction } from './entities/direction.entity';

@Module({
  controllers: [DirectionController],
  providers: [DirectionService],
  imports: [SequelizeModule.forFeature([Direction])],
})
export class DirectionModule {}
