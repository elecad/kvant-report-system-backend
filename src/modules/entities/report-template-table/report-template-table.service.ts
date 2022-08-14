import { Injectable } from '@nestjs/common';
import { CreateReportTemplateTableDto } from './dto/create-report-template-table.dto';
import { UpdateReportTemplateTableDto } from './dto/update-report-template-table.dto';

@Injectable()
export class ReportTemplateTableService {
  create(createReportTemplateTableDto: CreateReportTemplateTableDto) {
    return 'This action adds a new reportTemplateTable';
  }

  findAll() {
    return `This action returns all reportTemplateTable`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reportTemplateTable`;
  }

  update(id: number, updateReportTemplateTableDto: UpdateReportTemplateTableDto) {
    return `This action updates a #${id} reportTemplateTable`;
  }

  remove(id: number) {
    return `This action removes a #${id} reportTemplateTable`;
  }
}
