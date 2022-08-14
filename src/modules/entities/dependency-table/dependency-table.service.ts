import { Injectable } from '@nestjs/common';
import { CreateDependencyTableDto } from './dto/create-dependency-table.dto';
import { UpdateDependencyTableDto } from './dto/update-dependency-table.dto';

@Injectable()
export class DependencyTableService {
  create(createDependencyTableDto: CreateDependencyTableDto) {
    return 'This action adds a new dependencyTable';
  }

  findAll() {
    return `This action returns all dependencyTable`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dependencyTable`;
  }

  update(id: number, updateDependencyTableDto: UpdateDependencyTableDto) {
    return `This action updates a #${id} dependencyTable`;
  }

  remove(id: number) {
    return `This action removes a #${id} dependencyTable`;
  }
}
