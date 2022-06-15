import { Module } from '@nestjs/common';
import { DataTypesService } from './data_types.service';
import { DataTypesController } from './data_types.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { DataTypes } from './data_types.model';

@Module({
  providers: [DataTypesService],
  controllers: [DataTypesController],
  imports: [SequelizeModule.forFeature([DataTypes])],
})
export class DataTypesModule {}
