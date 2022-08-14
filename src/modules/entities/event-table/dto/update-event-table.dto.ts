import { PartialType } from '@nestjs/mapped-types';
import { CreateEventTableDto } from './create-event-table.dto';

export class UpdateEventTableDto extends PartialType(CreateEventTableDto) {}
