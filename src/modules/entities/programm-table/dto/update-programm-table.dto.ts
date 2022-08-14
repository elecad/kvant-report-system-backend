import { PartialType } from '@nestjs/mapped-types';
import { CreateProgrammTableDto } from './create-programm-table.dto';

export class UpdateProgrammTableDto extends PartialType(CreateProgrammTableDto) {}
