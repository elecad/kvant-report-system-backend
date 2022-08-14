import { Injectable } from '@nestjs/common';
import { CreateDirectionTableDto } from './dto/create-direction-table.dto';
import { UpdateDirectionTableDto } from './dto/update-direction-table.dto';

@Injectable()
export class DirectionTableService {
  create(createDirectionTableDto: CreateDirectionTableDto) {
    return 'This action adds a new directionTable';
  }

  findAll() {
    return `This action returns all directionTable`;
  }

  findOne(id: number) {
    return `This action returns a #${id} directionTable`;
  }

  update(id: number, updateDirectionTableDto: UpdateDirectionTableDto) {
    return `This action updates a #${id} directionTable`;
  }

  remove(id: number) {
    return `This action removes a #${id} directionTable`;
  }
}
