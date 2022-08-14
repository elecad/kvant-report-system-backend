import { Injectable } from '@nestjs/common';
import { CreateEventTableDto } from './dto/create-event-table.dto';
import { UpdateEventTableDto } from './dto/update-event-table.dto';

@Injectable()
export class EventTableService {
  create(createEventTableDto: CreateEventTableDto) {
    return 'This action adds a new eventTable';
  }

  findAll() {
    return `This action returns all eventTable`;
  }

  findOne(id: number) {
    return `This action returns a #${id} eventTable`;
  }

  update(id: number, updateEventTableDto: UpdateEventTableDto) {
    return `This action updates a #${id} eventTable`;
  }

  remove(id: number) {
    return `This action removes a #${id} eventTable`;
  }
}
