import { AddAnswerDto } from 'src/modules/profile/dto/add-answer.dto';

export interface GetAnswerDto extends AddAnswerDto {
  id: number;
}
