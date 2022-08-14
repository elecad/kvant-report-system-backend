import { PartialType } from '@nestjs/mapped-types';
import { CreateAnswerTableDto } from './create-answer-table.dto';

export class UpdateAnswerTableDto extends PartialType(CreateAnswerTableDto) {}
