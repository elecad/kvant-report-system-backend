import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';
import { createPlaceDataDto } from './dto/create-place_data';
import { PlaceData } from './place_data.model';

@Injectable()
export class PlaceDataService {
  constructor(
    @InjectModel(PlaceData) private placeDataRepository: typeof PlaceData,
  ) {}

  async getAll(option: FindOptions<PlaceData> = {}) {
    const placeData = await this.placeDataRepository.findAll(option);
    return placeData;
  }

  async getOne(option: FindOptions<PlaceData> = {}) {
    const answer = await this.placeDataRepository.findOne(option);
    return answer;
  }

  async getById(id: number) {
    const placeData = await this.placeDataRepository.findByPk(id);
    if (!placeData)
      throw new HttpException(
        'Данные о месте с таким ID не найдено',
        HttpStatus.BAD_REQUEST,
      );
    return placeData;
  }

  async create(dto: createPlaceDataDto) {
    const placeData = await this.placeDataRepository.create(dto);
    return { id: placeData.id };
  }

  async update(id, dto) {
    const placeData = await this.getById(id);
    placeData.update(dto);
  }

  async delete(id) {
    const placeData = await this.getById(id);
    placeData.destroy();
  }
}
