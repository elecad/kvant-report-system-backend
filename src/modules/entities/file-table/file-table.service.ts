import { Injectable } from '@nestjs/common';
import { CreateFileTableDto } from './dto/create-file-table.dto';
import { UpdateFileTableDto } from './dto/update-file-table.dto';

@Injectable()
export class FileTableService {
  create(createFileTableDto: CreateFileTableDto) {
    return 'This action adds a new fileTable';
  }

  findAll() {
    return `This action returns all fileTable`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fileTable`;
  }

  update(id: number, updateFileTableDto: UpdateFileTableDto) {
    return `This action updates a #${id} fileTable`;
  }

  remove(id: number) {
    return `This action removes a #${id} fileTable`;
  }
}
