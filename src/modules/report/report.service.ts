import { Injectable } from '@nestjs/common';
import { DataOfTypeTable } from '../entities/data-of-type-table/entities/data-of-type-table.entity';
import { ReportTemplateTableService } from '../entities/report-template-table/report-template-table.service';

@Injectable()
export class ReportService {
  constructor(
    private readonly reportTemplateTableService: ReportTemplateTableService,
  ) {}

  async getTemplate() {
    const { data_of_type: area } = (
      await this.reportTemplateTableService.findOne({
        where: { code_name: 'table2' },
        include: { model: DataOfTypeTable },
      })
    ).toJSON();

    const { data_of_type: school } = (
      await this.reportTemplateTableService.findOne({
        where: { code_name: 'table71' },
        include: { model: DataOfTypeTable },
      })
    ).toJSON();

    const { data_of_type: programm } = (
      await this.reportTemplateTableService.findOne({
        where: { code_name: 'table72' },
        include: { model: DataOfTypeTable },
      })
    ).toJSON();

    return {
      area,
      school,
      programm,
    };
  }
}
