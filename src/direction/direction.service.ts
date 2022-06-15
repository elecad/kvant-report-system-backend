import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Direction } from './direction.model';
import { createDirectionDto } from './dto/create-direction.dto';

@Injectable()
export class DirectionService {
  constructor(
    @InjectModel(Direction) private directionRepository: typeof Direction,
  ) {}

  async getAll() {
    const direction = await this.directionRepository.findAll();
    return direction;
  }

  async getById(id: number) {
    const direction = await this.directionRepository.findByPk(id);
    if (!direction)
      throw new HttpException(
        'Направление с таким ID не найден',
        HttpStatus.BAD_REQUEST,
      );
    return direction;
  }

  async create(dto: createDirectionDto) {
    const direction = await this.directionRepository.create(dto);
    return { id: direction.id };
  }

  async update(id, dto) {
    const direction = await this.getById(id);
    direction.update(dto);
  }

  async delete(id) {
    const direction = await this.getById(id);
    direction.destroy();
  }
}
