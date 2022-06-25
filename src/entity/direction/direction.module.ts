import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { DirectionController } from './direction.controller';
import { Direction } from './direction.model';
import { DirectionService } from './direction.service';

@Module({
  controllers: [DirectionController],
  providers: [DirectionService],
  imports: [SequelizeModule.forFeature([Direction]), AuthModule],
})
export class DirectionModule {}
