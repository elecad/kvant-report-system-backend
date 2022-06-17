import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { createEventDto } from './dto/create-event.dto';
import { Event } from './event.model';

@Injectable()
export class EventService {
  constructor(@InjectModel(Event) private eventRepository: typeof Event) {}

  async getAll() {
    const event = await this.eventRepository.findAll();
    return event;
  }

  async getById(id: number) {
    const event = await this.eventRepository.findByPk(id);
    if (!event)
      throw new HttpException(
        'Мероприятие с таким ID не найдено',
        HttpStatus.BAD_REQUEST,
      );
    return event;
  }

  async create(dto: createEventDto) {
    const event = await this.eventRepository.create(dto);
    return { id: event.id };
  }

  async update(id, dto) {
    const event = await this.getById(id);
    event.update(dto);
  }

  async delete(id) {
    const event = await this.getById(id);
    event.destroy();
  }
}
