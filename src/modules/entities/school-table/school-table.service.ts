import { Injectable } from '@nestjs/common';
import { CreateSchoolTableDto } from './dto/create-school-table.dto';
import { UpdateSchoolTableDto } from './dto/update-school-table.dto';

@Injectable()
export class SchoolTableService {
  create(createSchoolTableDto: CreateSchoolTableDto) {
    return 'This action adds a new schoolTable';
  }

  findAll() {
    return `This action returns all schoolTable`;
  }

  findOne(id: number) {
    return `This action returns a #${id} schoolTable`;
  }

  update(id: number, updateSchoolTableDto: UpdateSchoolTableDto) {
    return `This action updates a #${id} schoolTable`;
  }

  remove(id: number) {
    return `This action removes a #${id} schoolTable`;
  }
}
