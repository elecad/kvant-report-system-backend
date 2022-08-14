import { Injectable } from '@nestjs/common';
import { CreateRoleTableDto } from './dto/create-role-table.dto';
import { UpdateRoleTableDto } from './dto/update-role-table.dto';

@Injectable()
export class RoleTableService {
  create(createRoleTableDto: CreateRoleTableDto) {
    return 'This action adds a new roleTable';
  }

  findAll() {
    return `This action returns all roleTable`;
  }

  findOne(id: number) {
    return `This action returns a #${id} roleTable`;
  }

  update(id: number, updateRoleTableDto: UpdateRoleTableDto) {
    return `This action updates a #${id} roleTable`;
  }

  remove(id: number) {
    return `This action removes a #${id} roleTable`;
  }
}
