import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { createProgrammDataDto } from './dto/create-programm_data.dto';
import { ProgrammData } from './programm_data.model';

@Injectable()
export class ProgrammDataService {
  constructor(
    @InjectModel(ProgrammData)
    private programmDataRepository: typeof ProgrammData,
  ) {}

  async getAll() {
    const placeData = await this.programmDataRepository.findAll();
    return placeData;
  }

  async getById(id: number) {
    const placeData = await this.programmDataRepository.findByPk(id);
    if (!placeData)
      throw new HttpException(
        'Данные о месте с таким ID не найдено',
        HttpStatus.BAD_REQUEST,
      );
    return placeData;
  }

  async create(dto: createProgrammDataDto) {
    const placeData = await this.programmDataRepository.create(dto);
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
