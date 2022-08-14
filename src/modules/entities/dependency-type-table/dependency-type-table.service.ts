import { Injectable } from '@nestjs/common';
import { CreateDependencyTypeTableDto } from './dto/create-dependency-type-table.dto';
import { UpdateDependencyTypeTableDto } from './dto/update-dependency-type-table.dto';

@Injectable()
export class DependencyTypeTableService {
  create(createDependencyTypeTableDto: CreateDependencyTypeTableDto) {
    return 'This action adds a new dependencyTypeTable';
  }

  findAll() {
    return `This action returns all dependencyTypeTable`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dependencyTypeTable`;
  }

  update(id: number, updateDependencyTypeTableDto: UpdateDependencyTypeTableDto) {
    return `This action updates a #${id} dependencyTypeTable`;
  }

  remove(id: number) {
    return `This action removes a #${id} dependencyTypeTable`;
  }
}
