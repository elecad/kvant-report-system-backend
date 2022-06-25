import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DataTypes } from './data_types.model';
import { DataTypesController } from './data_types.controller';
import { DataTypesService } from './data_types.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [DataTypesService],
  controllers: [DataTypesController],
  imports: [SequelizeModule.forFeature([DataTypes]), AuthModule],
})
export class DataTypesModule {}
