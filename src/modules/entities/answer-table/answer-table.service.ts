import { Injectable } from '@nestjs/common';
import { CreateAnswerTableDto } from './dto/create-answer-table.dto';
import { UpdateAnswerTableDto } from './dto/update-answer-table.dto';

@Injectable()
export class AnswerTableService {
  create(createAnswerTableDto: CreateAnswerTableDto) {
    return 'This action adds a new answerTable';
  }

  findAll() {
    return `This action returns all answerTable`;
  }

  findOne(id: number) {
    return `This action returns a #${id} answerTable`;
  }

  update(id: number, updateAnswerTableDto: UpdateAnswerTableDto) {
    return `This action updates a #${id} answerTable`;
  }

  remove(id: number) {
    return `This action removes a #${id} answerTable`;
  }
}
