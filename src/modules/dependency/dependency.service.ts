import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';
import { AuthUser } from 'src/guards/auth-guard/interfaces/auth.interface';
import { STRINGS } from 'src/res/strings';
import {
  databaseValidateAll,
  databaseValidateOne,
  ValidateOption,
} from 'src/validators/dataBase.validator';
import { AboutDependencyService } from '../about_dependency/about_dependency.service';
import { Answer } from '../answer/entities/answer.entity';
import { DependencyTypeService } from '../dependency_type/dependency_type.service';
import { TaskService } from '../task/task.service';
import { CreateDependencyDto } from './dto/create-dependency.dto';
import { UpdateDependencyDto } from './dto/update-dependency.dto';
import { Dependency } from './entities/dependency.entity';

@Injectable()
export class DependencyService {
  constructor(
    @InjectModel(Dependency) private dependencyRepository: typeof Dependency,
    private dependencyTypeService: DependencyTypeService,
    private aboutDependencyService: AboutDependencyService,
    private taskService: TaskService,
  ) {}

  private entityName = 'Зависимость';

  async create(createDependencyDto: CreateDependencyDto) {
    await this.dependencyTypeService.validateOne({
      type: 'existing',
      column: 'id',
      value: createDependencyDto.dependency_type_id,
    });

    const { id } = await this.dependencyRepository.create(createDependencyDto);
    return { id };
  }

  findAll(option: FindOptions<Dependency> = {}) {
    return this.dependencyRepository.findAll(option);
  }

  findOne(option: FindOptions<Dependency> = {}) {
    return this.dependencyRepository.findOne(option);
  }

  async update(id: number, updateDependencyDto: UpdateDependencyDto) {
    const entity = await this.validateOne({
      type: 'existing',
      column: 'id',
      value: id,
    });
    if (entity.dependency_type_id !== updateDependencyDto.dependency_type_id)
      await this.dependencyTypeService.validateOne({
        type: 'existing',
        column: 'id',
        value: updateDependencyDto.dependency_type_id,
      });
    await entity.update(updateDependencyDto);
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

  async getByTaskId(task_id: number, user: AuthUser) {
    await this.taskService.validateOne({
      column: 'id',
      type: 'existing',
      value: task_id,
    });

    const tasks = await this.taskService.getByUserID(user.id);

    const currentTask = tasks.find(
      (t) => t.id === task_id && t.completed === false,
    );

    if (!currentTask) throw new BadRequestException(STRINGS.IsBadTaskRequest);

    const aboutDependecies = await Promise.all(
      user.dependencies.map((d) =>
        this.aboutDependencyService.findOne({
          where: { dependency_id: d.id },
          include: { model: Answer, where: { task_id } },
        }),
      ),
    );

    return user.dependencies.filter((_, index) => !aboutDependecies[index]);
  }

  async validateOne(props: ValidateOption<Dependency>) {
    //? Одиночный валидатор
    return databaseValidateOne(Dependency, this.entityName, props);
  }

  async validateAll(props: ValidateOption<Dependency>[]) {
    //? Групповой валидатор
    return databaseValidateAll(Dependency, this.entityName, props);
  }
}
