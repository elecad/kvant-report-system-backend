import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ReportModule } from '../report/report.module';
import { DataOfTypeController } from './data_of_type.controller';
import { DataOfTypeService } from './data_of_type.service';
import { DataOfType } from './entities/data_of_type.entity';

@Module({
  controllers: [DataOfTypeController],
  providers: [DataOfTypeService],
  imports: [SequelizeModule.forFeature([DataOfType]), ReportModule],
  exports: [DataOfTypeService],
})
export class DataOfTypeModule {}
