import { Injectable } from '@nestjs/common';
import { CreateProgrammTableDto } from './dto/create-programm-table.dto';
import { UpdateProgrammTableDto } from './dto/update-programm-table.dto';

@Injectable()
export class ProgrammTableService {
  create(createProgrammTableDto: CreateProgrammTableDto) {
    return 'This action adds a new programmTable';
  }

  findAll() {
    return `This action returns all programmTable`;
  }

  findOne(id: number) {
    return `This action returns a #${id} programmTable`;
  }

  update(id: number, updateProgrammTableDto: UpdateProgrammTableDto) {
    return `This action updates a #${id} programmTable`;
  }

  remove(id: number) {
    return `This action removes a #${id} programmTable`;
  }
}
