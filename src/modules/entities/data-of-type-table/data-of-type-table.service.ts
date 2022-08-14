import { Injectable } from '@nestjs/common';
import { CreateDataOfTypeTableDto } from './dto/create-data-of-type-table.dto';
import { UpdateDataOfTypeTableDto } from './dto/update-data-of-type-table.dto';

@Injectable()
export class DataOfTypeTableService {
  create(createDataOfTypeTableDto: CreateDataOfTypeTableDto) {
    return 'This action adds a new dataOfTypeTable';
  }

  findAll() {
    return `This action returns all dataOfTypeTable`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dataOfTypeTable`;
  }

  update(id: number, updateDataOfTypeTableDto: UpdateDataOfTypeTableDto) {
    return `This action updates a #${id} dataOfTypeTable`;
  }

  remove(id: number) {
    return `This action removes a #${id} dataOfTypeTable`;
  }
}
