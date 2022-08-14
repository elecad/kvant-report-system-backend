import { PartialType } from '@nestjs/mapped-types';
import { CreateSchoolTypeTableDto } from './create-school-type-table.dto';

export class UpdateSchoolTypeTableDto extends PartialType(CreateSchoolTypeTableDto) {}
