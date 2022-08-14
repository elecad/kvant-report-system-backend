import { Injectable } from '@nestjs/common';
import { CreateAboutProgrammTableDto } from './dto/create-about-programm-table.dto';
import { UpdateAboutProgrammTableDto } from './dto/update-about-programm-table.dto';

@Injectable()
export class AboutProgrammTableService {
  create(createAboutProgrammTableDto: CreateAboutProgrammTableDto) {
    return 'This action adds a new aboutProgrammTable';
  }

  findAll() {
    return `This action returns all aboutProgrammTable`;
  }

  findOne(id: number) {
    return `This action returns a #${id} aboutProgrammTable`;
  }

  update(id: number, updateAboutProgrammTableDto: UpdateAboutProgrammTableDto) {
    return `This action updates a #${id} aboutProgrammTable`;
  }

  remove(id: number) {
    return `This action removes a #${id} aboutProgrammTable`;
  }
}
