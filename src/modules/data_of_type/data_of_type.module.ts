import { Module } from '@nestjs/common';
import { DataOfTypeService } from './data_of_type.service';
import { DataOfTypeController } from './data_of_type.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { DataOfType } from './entities/data_of_type.entity';
import { ReportModule } from '../report/report.module';

@Module({
  controllers: [DataOfTypeController],
  providers: [DataOfTypeService],
  imports: [SequelizeModule.forFeature([DataOfType]), ReportModule],
})
export class DataOfTypeModule {}
