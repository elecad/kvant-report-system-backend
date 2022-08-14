import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';
import {
  databaseValidateAll,
  databaseValidateOne,
  ValidateOption,
} from 'src/validators/database.validator';
import { CreateEventTableDto } from './dto/create-event-table.dto';
import { UpdateEventTableDto } from './dto/update-event-table.dto';
import { EventTable } from './entities/event-table.entity';

@Injectable()
export class EventTableService {
  constructor(@InjectModel(EventTable) private repository: typeof EventTable) {}

  entityName = 'Мероприятие';

  async create(createEventTableDto: CreateEventTableDto) {
    return this.repository.create(createEventTableDto);
  }

  findAll(option: FindOptions<EventTable> = {}) {
    return this.repository.findAll(option);
  }

  findOne(option: FindOptions<EventTable> = {}) {
    return this.repository.findOne(option);
  }

  async update(id: number, updateEventTableDto: UpdateEventTableDto) {
    const entity = await this.validateOne({
      type: 'existing',
      column: 'id',
      value: id,
    });

    return entity.update(updateEventTableDto);
  }

  async remove(id: number) {
    const entity = await this.validateOne({
      type: 'existing',
      column: 'id',
      value: id,
    });

    await entity.destroy();
  }

  async validateOne(props: ValidateOption<EventTable>) {
    //? Одиночный валидатор
    return databaseValidateOne(EventTable, this.entityName, props);
  }

  async validateAll(props: ValidateOption<EventTable>[]) {
    //? Групповой валидатор
    return databaseValidateAll(EventTable, this.entityName, props);
  }
}
