import { Injectable } from '@nestjs/common';
import { CreateProgrammDto } from './dto/create-programm.dto';
import { UpdateProgrammDto } from './dto/update-programm.dto';

@Injectable()
export class ProgrammService {
  create(createProgrammDto: CreateProgrammDto) {
    return 'This action adds a new programm';
  }

  findAll() {
    return `This action returns all programm`;
  }

  findOne(id: number) {
    return `This action returns a #${id} programm`;
  }

  update(id: number, updateProgrammDto: UpdateProgrammDto) {
    return `This action updates a #${id} programm`;
  }

  remove(id: number) {
    return `This action removes a #${id} programm`;
  }
}
