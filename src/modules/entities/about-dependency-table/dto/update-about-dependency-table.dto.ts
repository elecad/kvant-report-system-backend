import { PartialType } from '@nestjs/mapped-types';
import { CreateAboutDependencyTableDto } from './create-about-dependency-table.dto';

export class UpdateAboutDependencyTableDto extends PartialType(CreateAboutDependencyTableDto) {}
