import { Injectable } from '@nestjs/common';
import { CreateAccountTableDto } from './dto/create-account-table.dto';
import { UpdateAccountTableDto } from './dto/update-account-table.dto';

@Injectable()
export class AccountTableService {
  create(createAccountTableDto: CreateAccountTableDto) {
    return 'This action adds a new accountTable';
  }

  findAll() {
    return `This action returns all accountTable`;
  }

  findOne(id: number) {
    return `This action returns a #${id} accountTable`;
  }

  update(id: number, updateAccountTableDto: UpdateAccountTableDto) {
    return `This action updates a #${id} accountTable`;
  }

  remove(id: number) {
    return `This action removes a #${id} accountTable`;
  }
}
