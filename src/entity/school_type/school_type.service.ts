import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { createSchoolTypeDto } from './dto/create-school_type.dto';
import { SchoolType } from './school_type.model';

@Injectable()
export class SchoolTypeService {
  constructor(
    @InjectModel(SchoolType) private schoolTypeRepository: typeof SchoolType,
  ) {}

  async getAll() {
    const schoolType = await this.schoolTypeRepository.findAll();
    return schoolType;
  }

  async getById(id: number) {
    const schoolType = await this.schoolTypeRepository.findByPk(id);
    if (!schoolType)
      throw new HttpException(
        'Тип учреждения с таким ID не найден',
        HttpStatus.BAD_REQUEST,
      );
    return schoolType;
  }

  async create(dto: createSchoolTypeDto) {
    const schoolType = await this.schoolTypeRepository.create(dto);
    return { id: schoolType.id };
  }

  async update(id, dto) {
    const schoolType = await this.getById(id);
    schoolType.update(dto);
  }

  async delete(id) {
    const schoolType = await this.getById(id);
    schoolType.destroy();
  }
}
