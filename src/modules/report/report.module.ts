import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Report } from './entities/report.entity';

@Module({
  controllers: [ReportController],
  providers: [ReportService],
  imports: [SequelizeModule.forFeature([Report])],
  exports: [ReportService],
})
export class ReportModule {}
