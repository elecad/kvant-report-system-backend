import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { createPlaceTypeDto } from './dto/create-place_type.dto';
import { PlaceType } from './place_type.model';

@Injectable()
export class PlaceTypeService {
  constructor(
    @InjectModel(PlaceType) private placeTypeRepository: typeof PlaceType,
  ) {}

  async getAll() {
    const placeType = await this.placeTypeRepository.findAll();
    return placeType;
  }

  async getById(id: number) {
    const placeType = await this.placeTypeRepository.findByPk(id);
    if (!placeType)
      throw new HttpException(
        'Тип учреждения с таким ID не найден',
        HttpStatus.BAD_REQUEST,
      );
    return placeType;
  }

  async create(dto: createPlaceTypeDto) {
    const placeType = await this.placeTypeRepository.create(dto);
    return { id: placeType.id };
  }

  async update(id, dto) {
    const placeType = await this.getById(id);
    placeType.update(dto);
  }

  async delete(id) {
    const placeType = await this.getById(id);
    placeType.destroy();
  }
}
