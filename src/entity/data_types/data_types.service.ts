import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { DataTypes } from './data_types.model';
import { createDataTypesDto } from './dto/create-data_types.dto';

@Injectable()
export class DataTypesService {
  constructor(
    @InjectModel(DataTypes) private dataTypesRepository: typeof DataTypes,
  ) {}

  async getAll() {
    const dataTypes = await this.dataTypesRepository.findAll();
    return dataTypes;
  }

  async getById(id: number) {
    const dataTypes = await this.dataTypesRepository.findByPk(id);
    if (!dataTypes)
      throw new HttpException(
        'Направление с таким ID не найдено',
        HttpStatus.BAD_REQUEST,
      );
    return dataTypes;
  }

  async create(dto: createDataTypesDto) {
    const dataTypes = await this.dataTypesRepository.create(dto);
    return { id: dataTypes.id };
  }

  async update(id, dto) {
    const dataTypes = await this.getById(id);
    dataTypes.update(dto);
  }

  async delete(id) {
    const dataTypes = await this.getById(id);
    dataTypes.destroy();
  }
}
