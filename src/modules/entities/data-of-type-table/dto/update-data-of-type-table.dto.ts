import { PartialType } from '@nestjs/mapped-types';
import { CreateDataOfTypeTableDto } from './create-data-of-type-table.dto';

export class UpdateDataOfTypeTableDto extends PartialType(CreateDataOfTypeTableDto) {}
