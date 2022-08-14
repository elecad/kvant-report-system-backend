import { Injectable } from '@nestjs/common';
import { CreateAboutDependencyTableDto } from './dto/create-about-dependency-table.dto';
import { UpdateAboutDependencyTableDto } from './dto/update-about-dependency-table.dto';

@Injectable()
export class AboutDependencyTableService {
  create(createAboutDependencyTableDto: CreateAboutDependencyTableDto) {
    return 'This action adds a new aboutDependencyTable';
  }

  findAll() {
    return `This action returns all aboutDependencyTable`;
  }

  findOne(id: number) {
    return `This action returns a #${id} aboutDependencyTable`;
  }

  update(id: number, updateAboutDependencyTableDto: UpdateAboutDependencyTableDto) {
    return `This action updates a #${id} aboutDependencyTable`;
  }

  remove(id: number) {
    return `This action removes a #${id} aboutDependencyTable`;
  }
}
