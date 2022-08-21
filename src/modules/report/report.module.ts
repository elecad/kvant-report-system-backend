import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { ReportTemplateTableModule } from '../entities/report-template-table/report-template-table.module';

@Module({
  controllers: [ReportController],
  providers: [ReportService],
  imports: [ReportTemplateTableModule],
  exports: [ReportService],
})
export class ReportModule {}
