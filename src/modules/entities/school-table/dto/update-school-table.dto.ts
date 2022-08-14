import { PartialType } from '@nestjs/mapped-types';
import { CreateSchoolTableDto } from './create-school-table.dto';

export class UpdateSchoolTableDto extends PartialType(CreateSchoolTableDto) {}
