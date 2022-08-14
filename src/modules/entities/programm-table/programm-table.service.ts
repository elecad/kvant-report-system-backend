import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';
import {
  databaseValidateAll,
  databaseValidateOne,
  ValidateOption,
} from 'src/validators/database.validator';
import { DependencyTableService } from '../dependency-table/dependency-table.service';
import { DirectionTableService } from '../direction-table/direction-table.service';
import { SchoolTableService } from '../school-table/school-table.service';
import { CreateProgrammTableDto } from './dto/create-programm-table.dto';
import { UpdateProgrammTableDto } from './dto/update-programm-table.dto';
import { ProgrammTable } from './entities/programm-table.entity';

@Injectable()
export class ProgrammTableService {
  constructor(
    @InjectModel(ProgrammTable) private repository: typeof ProgrammTable,
    private readonly directionTableService: DirectionTableService,
    private readonly dependencyTableService: DependencyTableService,
    private readonly schoolTableService: SchoolTableService,
  ) {}

  entityName = 'Программа';

  async create(createProgrammTableDto: CreateProgrammTableDto) {
    const { direction_id, dependency_id, school_id } = createProgrammTableDto;

    await this.directionTableService.validateOne({
      column: 'id',
      type: 'existing',
      value: direction_id,
    });
    await this.dependencyTableService.validateOne({
      column: 'id',
      type: 'existing',
      value: dependency_id,
    });
    await this.schoolTableService.validateOne({
      column: 'id',
      type: 'existing',
      value: school_id,
    });

    return this.repository.create(createProgrammTableDto);
  }

  findAll(option: FindOptions<ProgrammTable> = {}) {
    return this.repository.findAll(option);
  }

  findOne(option: FindOptions<ProgrammTable> = {}) {
    return this.repository.findOne(option);
  }

  async update(id: number, updateProgrammTableDto: UpdateProgrammTableDto) {
    const { direction_id, dependency_id, school_id } = updateProgrammTableDto;

    const entity = await this.validateOne({
      type: 'existing',
      column: 'id',
      value: id,
    });

    if (entity.direction_id !== direction_id)
      await this.directionTableService.validateOne({
        column: 'id',
        type: 'existing',
        value: direction_id,
      });

    if (entity.direction_id !== dependency_id)
      await this.dependencyTableService.validateOne({
        column: 'id',
        type: 'existing',
        value: dependency_id,
      });

    if (entity.direction_id !== school_id)
      await this.schoolTableService.validateOne({
        column: 'id',
        type: 'existing',
        value: school_id,
      });

    return entity.update(updateProgrammTableDto);
  }

  async remove(id: number) {
    const entity = await this.validateOne({
      type: 'existing',
      column: 'id',
      value: id,
    });

    await entity.destroy();
  }

  async validateOne(props: ValidateOption<ProgrammTable>) {
    //? Одиночный валидатор
    return databaseValidateOne(ProgrammTable, this.entityName, props);
  }

  async validateAll(props: ValidateOption<ProgrammTable>[]) {
    //? Групповой валидатор
    return databaseValidateAll(ProgrammTable, this.entityName, props);
  }
}
