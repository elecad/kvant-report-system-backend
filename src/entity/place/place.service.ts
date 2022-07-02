import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';
import { createPlaceDto } from './dto/create-place.dto';
import { Place } from './place.model';

@Injectable()
export class PlaceService {
  constructor(@InjectModel(Place) private placeRepository: typeof Place) {}

  async getAll(option: FindOptions<Place> = {}) {
    const place = await this.placeRepository.findAll(option);
    return place;
  }

  async getOne(option: FindOptions<Place> = {}) {
    const answer = await this.placeRepository.findAll(option);
    return answer;
  }

  async getById(id: number) {
    const place = await this.placeRepository.findByPk(id, {
      include: { all: true },
    });
    if (!place)
      throw new HttpException(
        'Место с таким ID не найдено',
        HttpStatus.BAD_REQUEST,
      );
    return place;
  }

  async create(dto: createPlaceDto) {
    const place = await this.placeRepository.create(dto);
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
