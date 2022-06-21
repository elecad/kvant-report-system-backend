import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { createProgrammDto } from './dto/create-programm.dto';
import { Programm } from './programm.model';

@Injectable()
export class ProgrammService {
  constructor(
    @InjectModel(Programm) private programmRepository: typeof Programm,
  ) {}

  async getAll() {
    const programm = await this.programmRepository.findAll();
    return programm;
  }

  async getById(id: number) {
    const programm = await this.programmRepository.findByPk(id);
    if (!programm)
      throw new HttpException(
        'Направление с таким ID не найдено',
        HttpStatus.BAD_REQUEST,
      );
    return programm;
  }

  async create(dto: createProgrammDto) {
    const programm = await this.programmRepository.create(dto);
    return { id: programm.id };
  }

  async update(id, dto) {
    const programm = await this.getById(id);
    programm.update(dto);
  }

  async delete(id) {
    const programm = await this.getById(id);
    programm.destroy();
  }
}
