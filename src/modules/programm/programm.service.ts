import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';
import {
  databaseValidateAll,
  databaseValidateOne,
  ValidateOption,
} from 'src/validators/dataBase.validator';
import { DependencyService } from '../dependency/dependency.service';
import { DirectionService } from '../direction/direction.service';
import { SchoolService } from '../school/school.service';
import { CreateProgrammDto } from './dto/create-programm.dto';
import { UpdateProgrammDto } from './dto/update-programm.dto';
import { Programm } from './entities/programm.entity';

@Injectable()
export class ProgrammService {
  constructor(
    @InjectModel(Programm) private programmRepository: typeof Programm,
    @Inject(forwardRef(() => DependencyService))
    private dependencyService: DependencyService,

    private directionService: DirectionService,
    private schoolService: SchoolService,
  ) {}

  private entityName = 'Программа';

  async create(createProgrammDto: CreateProgrammDto) {
    await this.dependencyService.validateOne({
      type: 'existing',
      column: 'id',
      value: createProgrammDto.dependency_id,
    });

    await this.directionService.validateOne({
      type: 'existing',
      column: 'id',
      value: createProgrammDto.direction_id,
    });

    await this.schoolService.validateOne({
      type: 'existing',
      column: 'id',
      value: createProgrammDto.school_id,
    });

    const { id } = await this.programmRepository.create(createProgrammDto);
    return { id };
  }

  findAll(option: FindOptions<Programm> = {}) {
    return this.programmRepository.findAll(option);
  }

  findOne(option: FindOptions<Programm> = {}) {
    return this.programmRepository.findOne(option);
  }

  async update(id: number, updateProgrammDto: UpdateProgrammDto) {
    const entity = await this.validateOne({
      type: 'existing',
      column: 'id',
      value: id,
    });

    if (entity.dependency_id !== updateProgrammDto.dependency_id)
      await this.dependencyService.validateOne({
        type: 'existing',
        column: 'id',
        value: updateProgrammDto.dependency_id,
      });

    if (entity.direction_id !== updateProgrammDto.direction_id)
      await this.directionService.validateOne({
        type: 'existing',
        column: 'id',
        value: updateProgrammDto.direction_id,
      });
    if (entity.school_id !== updateProgrammDto.school_id)
      await this.schoolService.validateOne({
        type: 'existing',
        column: 'id',
        value: updateProgrammDto.school_id,
      });
    await entity.update(updateProgrammDto);
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

  async validateOne(props: ValidateOption<Programm>) {
    //? Одиночный валидатор
    return databaseValidateOne(Programm, this.entityName, props);
  }

  async validateAll(props: ValidateOption<Programm>[]) {
    //? Групповой валидатор
    return databaseValidateAll(Programm, this.entityName, props);
  }
}
