import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';
import { STRINGS } from 'src/res/strings';
import { CreateDependencyTypeDto } from './dto/create-dependency_type.dto';
import { UpdateDependencyTypeDto } from './dto/update-dependency_type.dto';
import { DependencyType } from './entities/dependency_type.entity';

@Injectable()
export class DependencyTypeService {
  constructor(
    @InjectModel(DependencyType)
    private dependencyTypeRepository: typeof DependencyType,
  ) {}

  private entity = 'Тип зависимости';

  async create(createDependencyTypeDto: CreateDependencyTypeDto) {
    const { id } = await this.dependencyTypeRepository.create(
      createDependencyTypeDto,
    );
    return { id };
  }

  findAll(option: FindOptions<DependencyType> = {}) {
    return this.dependencyTypeRepository.findAll(option);
  }

  findOne(option: FindOptions<DependencyType> = {}) {
    return this.dependencyTypeRepository.findOne(option);
  }

  async update(id: number, updateDependencyTypeDto: UpdateDependencyTypeDto) {
    // const [entity] = await this.validateAll([
    //   {
    //     type: 'existing',
    //     column: 'id',
    //     value: id,
    //   },
    // ]);
    // await entity.update(updateDependencyTypeDto);
    // return entity;
  }

  async remove(id: number) {
    //   const entity = await this.validateOne({
    //     type: 'existing',
    //     column: 'id',
    //     value: id,
    //   });
    //   await entity.destroy();
    // }
    // async validateOne(props: ValidateOption<DependencyType>) {
    //   //? Для одной сущности
    //   const { type, value, column } = props;
    //   const entity = await this.findOne({ where: { [column]: value } });
    //   this.checkEntity({ type, column, data: entity });
    //   return entity;
    // }
    // async validateAll(props: ValidateOption<DependencyType>[]) {
    //   //? Для многих сущностей
    //   const entitys = await Promise.all(
    //     props.map(({ column, value }) =>
    //       this.dependencyTypeRepository.findOne({ where: { [column]: value } }),
    //     ),
    //   );
    //   entitys.forEach((e, index) => {
    //     const { type, column } = props[index];
    //     this.checkEntity({
    //       type: type,
    //       column,
    //       data: e,
    //     });
    //   });
    //   return entitys;
    // }
    // private checkEntity({ type, column, data }: CheckEntityProps) {
    //   if (type === 'existing' && !data)
    //     throw new HttpException(
    //       STRINGS.IsExistingError(this.entity, column),
    //       HttpStatus.BAD_REQUEST,
    //     );
    //   if (type === 'unique' && data)
    //     throw new HttpException(
    //       STRINGS.IsUniqueError(this.entity, column),
    //       HttpStatus.BAD_REQUEST,
    //     );
    // }
  }
}
