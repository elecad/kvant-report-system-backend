import { Module } from '@nestjs/common';
import { ReportTemplateTableService } from './report-template-table.service';
import { ReportTemplateTableController } from './report-template-table.controller';

@Module({
  controllers: [ReportTemplateTableController],
  providers: [ReportTemplateTableService]
})
export class ReportTemplateTableModule {}
