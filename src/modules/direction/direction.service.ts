import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';
import {
  databaseValidateAll,
  databaseValidateOne,
  ValidateOption,
} from 'src/validators/dataBase.validator';
import { CreateDirectionDto } from './dto/create-direction.dto';
import { UpdateDirectionDto } from './dto/update-direction.dto';
import { Direction } from './entities/direction.entity';

@Injectable()
export class DirectionService {
  constructor(
    @InjectModel(Direction) private directionRepository: typeof Direction,
  ) {}

  private entityName = 'Направление';

  async create(createDirectionDto: CreateDirectionDto) {
    const entity = await this.directionRepository.create(createDirectionDto);

    const { id } = entity;
    return { id };
  }

  findAll(option: FindOptions<Direction> = {}) {
    return this.directionRepository.findAll(option);
  }

  findOne(option: FindOptions<Direction> = {}) {
    return this.directionRepository.findOne(option);
  }

  async update(id: number, updateDirectionDto: UpdateDirectionDto) {
    const entity = await this.validateOne({
      type: 'existing',
      column: 'id',
      value: id,
    });
    await entity.update(updateDirectionDto);
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

  async validateOne(props: ValidateOption<Direction>) {
    //? Одиночный валидатор
    return databaseValidateOne(Direction, this.entityName, props);
  }

  async validateAll(props: ValidateOption<Direction>[]) {
    //? Групповой валидатор
    return databaseValidateAll(Direction, this.entityName, props);
  }
}
