import { PartialType } from '@nestjs/mapped-types';
import { CreateAboutProgrammTableDto } from './create-about-programm-table.dto';

export class UpdateAboutProgrammTableDto extends PartialType(CreateAboutProgrammTableDto) {}
