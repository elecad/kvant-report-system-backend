import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReportTemplateTableService } from './report-template-table.service';
import { CreateReportTemplateTableDto } from './dto/create-report-template-table.dto';
import { UpdateReportTemplateTableDto } from './dto/update-report-template-table.dto';

@Controller('report-template-table')
export class ReportTemplateTableController {
  constructor(private readonly reportTemplateTableService: ReportTemplateTableService) {}

  @Post()
  create(@Body() createReportTemplateTableDto: CreateReportTemplateTableDto) {
    return this.reportTemplateTableService.create(createReportTemplateTableDto);
  }

  @Get()
  findAll() {
    return this.reportTemplateTableService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reportTemplateTableService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReportTemplateTableDto: UpdateReportTemplateTableDto) {
    return this.reportTemplateTableService.update(+id, updateReportTemplateTableDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reportTemplateTableService.remove(+id);
  }
}
