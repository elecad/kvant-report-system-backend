import { Injectable } from '@nestjs/common';
import { CreateSchoolTypeTableDto } from './dto/create-school-type-table.dto';
import { UpdateSchoolTypeTableDto } from './dto/update-school-type-table.dto';

@Injectable()
export class SchoolTypeTableService {
  create(createSchoolTypeTableDto: CreateSchoolTypeTableDto) {
    return 'This action adds a new schoolTypeTable';
  }

  findAll() {
    return `This action returns all schoolTypeTable`;
  }

  findOne(id: number) {
    return `This action returns a #${id} schoolTypeTable`;
  }

  update(id: number, updateSchoolTypeTableDto: UpdateSchoolTypeTableDto) {
    return `This action updates a #${id} schoolTypeTable`;
  }

  remove(id: number) {
    return `This action removes a #${id} schoolTypeTable`;
  }
}
