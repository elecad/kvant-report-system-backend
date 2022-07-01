import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions, WhereOptions } from 'sequelize';
import { Includeable } from 'sequelize/types';
import { Answer } from './answer.model';
import { createAnswerDto } from './dto/create-answer.dto';

export interface getProps<T> {
  where?: WhereOptions<T>;
  include?: Includeable | Includeable[];
}

@Injectable()
export class AnswerService {
  constructor(@InjectModel(Answer) private answerRepository: typeof Answer) {}

  async getAll(option: FindOptions<Answer> = {}) {
    const answer = await this.answerRepository.findAll(option);
    return answer;
  }

  async getById(id: number) {
    const place = await this.answerRepository.findByPk(id, {
      include: { all: true },
    });
    if (!place)
      throw new HttpException(
        'Место с таким ID не найдено',
        HttpStatus.BAD_REQUEST,
      );
    return place;
  }

  async getOne(option: FindOptions<Answer> = {}) {
    const answer = await this.answerRepository.findOne(option);
    return answer;
  }

  async create(dto: createAnswerDto) {
    const place = await this.answerRepository.create(dto);
    return { id: place.id };
  }

  async update(id, dto) {
    const place = await this.getById(id);
    place.update(dto);
  }

  async delete(id) {
    const place = await this.getById(id);
    place.destroy();
  }
}
