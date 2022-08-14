import { Module } from '@nestjs/common';
import { ReportTemplateTableService } from './report-template-table.service';
import { ReportTemplateTableController } from './report-template-table.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ReportTemplateTable } from './entities/report-template-table.entity';

@Module({
  controllers: [ReportTemplateTableController],
  providers: [ReportTemplateTableService],
  imports: [SequelizeModule.forFeature([ReportTemplateTable])],
  exports: [ReportTemplateTableService],
})
export class ReportTemplateTableModule {}
