import { Injectable } from '@nestjs/common';
import { CreateSessionTableDto } from './dto/create-session-table.dto';
import { UpdateSessionTableDto } from './dto/update-session-table.dto';

@Injectable()
export class SessionTableService {
  create(createSessionTableDto: CreateSessionTableDto) {
    return 'This action adds a new sessionTable';
  }

  findAll() {
    return `This action returns all sessionTable`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sessionTable`;
  }

  update(id: number, updateSessionTableDto: UpdateSessionTableDto) {
    return `This action updates a #${id} sessionTable`;
  }

  remove(id: number) {
    return `This action removes a #${id} sessionTable`;
  }
}
