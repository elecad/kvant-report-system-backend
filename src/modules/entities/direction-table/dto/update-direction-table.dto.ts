import { PartialType } from '@nestjs/mapped-types';
import { CreateDirectionTableDto } from './create-direction-table.dto';

export class UpdateDirectionTableDto extends PartialType(CreateDirectionTableDto) {}
