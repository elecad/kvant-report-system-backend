import { PartialType } from '@nestjs/mapped-types';
import { CreateReportTemplateTableDto } from './create-report-template-table.dto';

export class UpdateReportTemplateTableDto extends PartialType(CreateReportTemplateTableDto) {}
