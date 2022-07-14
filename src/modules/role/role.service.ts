import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';
import { STRINGS } from 'src/res/strings';
import { CheckEntityProps, ValidateOption } from 'src/types/validate.type';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

  private entity = 'Роль';

  async create(createRoleDto: CreateRoleDto) {
    await this.validateOne({
      type: 'unique',
      column: 'code_name',
      value: createRoleDto.code_name,
    });
    const { id } = await this.roleRepository.create(createRoleDto);
    return { id };
  }

  findAll(option: FindOptions<Role> = {}) {
    return this.roleRepository.findAll(option);
  }

  findOne(option: FindOptions<Role> = {}) {
    return this.roleRepository.findOne(option);
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const [entity] = await this.validateAll([
      {
        type: 'existing',
        column: 'id',
        value: id,
      },
      {
        type: 'unique',
        column: 'code_name',
        value: updateRoleDto.code_name,
      },
    ]);
    await entity.update(updateRoleDto);

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

  async validateOne(props: ValidateOption<Role>) {
    //? Для одной сущности
    const { type, value, column } = props;
    const entity = await this.findOne({ where: { [column]: value } });

    this.checkEntity({ type, column, data: entity });

    return entity;
  }

  async validateAll(props: ValidateOption<Role>[]) {
    //? Для многих сущностей
    const entitys = await Promise.all(
      props.map(({ column, value }) =>
        this.roleRepository.findOne({ where: { [column]: value } }),
      ),
    );

    entitys.forEach((e, index) => {
      const { type, column } = props[index];
      this.checkEntity({
        type: type,
        column,
        data: e,
      });
    });

    return entitys;
  }

  private checkEntity({ type, column, data }: CheckEntityProps) {
    if (type === 'existing' && !data)
      throw new HttpException(
        STRINGS.IsExistingError(this.entity, column),
        HttpStatus.BAD_REQUEST,
      );
    if (type === 'unique' && data)
      throw new HttpException(
        STRINGS.IsUniqueError(this.entity, column),
        HttpStatus.BAD_REQUEST,
      );
  }
}
