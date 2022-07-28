import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';
import {
  databaseValidateAll,
  databaseValidateOne,
  ValidateOption,
} from 'src/validators/dataBase.validator';
import { DependencyService } from '../dependency/dependency.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event) private eventRepository: typeof Event,
    private readonly dependencyService: DependencyService,
  ) {}

  private entityName = 'Мероприятие';

  async create(createEventDto: CreateEventDto) {
    await this.dependencyService.validateOne({
      type: 'existing',
      column: 'id',
      value: createEventDto.dependency_id,
    });

    const entity = await this.eventRepository.create(createEventDto);

    const { id } = entity;
    return { id };
  }

  findAll(option: FindOptions<Event> = {}) {
    return this.eventRepository.findAll(option);
  }

  findOne(option: FindOptions<Event> = {}) {
    return this.eventRepository.findOne(option);
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    const entity = await this.validateOne({
      type: 'existing',
      column: 'id',
      value: id,
    });

    if (entity.dependency_id !== updateEventDto.dependency_id)
      await this.validateOne({
        type: 'existing',
        column: 'dependency_id',
        value: updateEventDto.dependency_id,
      });
    await entity.update(updateEventDto);
    return entity;
  }

  async remove(id: number) {
    const entity = await this.validateOne({
      type: 'existing',
      column: 'id',
      value: id,
    });

    await entity.destroy();
  }

  async validateOne(props: ValidateOption<Event>) {
    //? Одиночный валидатор
    return databaseValidateOne(Event, this.entityName, props);
  }

  async validateAll(props: ValidateOption<Event>[]) {
    //? Групповой валидатор
    return databaseValidateAll(Event, this.entityName, props);
  }
}
