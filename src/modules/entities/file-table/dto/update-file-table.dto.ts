import { PartialType } from '@nestjs/mapped-types';
import { CreateFileTableDto } from './create-file-table.dto';

export class UpdateFileTableDto extends PartialType(CreateFileTableDto) {}
