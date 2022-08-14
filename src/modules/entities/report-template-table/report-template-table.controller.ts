import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ReportTemplateTableService } from './report-template-table.service';
import { CreateReportTemplateTableDto } from './dto/create-report-template-table.dto';
import { UpdateReportTemplateTableDto } from './dto/update-report-template-table.dto';
import { parseIntOptions } from 'src/validators/options/parseIntPipe.option';

@Controller('report-template-table')
export class ReportTemplateTableController {
  constructor(
    private readonly reportTemplateTableService: ReportTemplateTableService,
  ) {}

  @Post()
  create(@Body() createReportTemplateTableDto: CreateReportTemplateTableDto) {
    return this.reportTemplateTableService.create(createReportTemplateTableDto);
  }

  @Get()
  findAll() {
    return this.reportTemplateTableService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe(parseIntOptions)) id: number) {
    return this.reportTemplateTableService.validateOne({
      column: 'id',
      type: 'existing',
      value: id,
    });
  }

  @Patch(':id')
  update(
    @Param('id', new ParseIntPipe(parseIntOptions)) id: number,
    @Body() updateReportTemplateTableDto: UpdateReportTemplateTableDto,
  ) {
    return this.reportTemplateTableService.update(
      id,
      updateReportTemplateTableDto,
    );
  }

  @Delete(':id')
  remove(@Param('id', new ParseIntPipe(parseIntOptions)) id: number) {
    return this.reportTemplateTableService.remove(id);
  }
}
