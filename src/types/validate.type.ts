import { HttpException, HttpStatus } from '@nestjs/common';
import { col, FindOptions } from 'sequelize';
import { Attributes, Model, ModelStatic } from 'sequelize/types';
import { STRINGS } from 'src/res/strings';

export type ValidateType = 'unique' | 'existing';

export interface ValidateOption<T extends Model> {
  type: ValidateType;
  value: string | number;
  column: keyof Attributes<T>;
}

export interface CheckEntityProps {
  type: ValidateType;
  column: string;
  data: Model;
}

export async function databaseValidateOne<
  T extends Model,
  R extends ModelStatic<T> = ModelStatic<T>,
>(model: R, props: ValidateOption<T>) {
  //? Для одной сущности
  let { type, value, column } = props;
  const entity = await model.findOne({
    where: { [column]: value },
  } as FindOptions);
  column = column.toString();
  console.log(column);

  checkEntity({ type, column, data: entity });

  return entity;
}

export async function databaseValidateAll<
  T extends Model,
  R extends ModelStatic<T> = ModelStatic<T>,
>(model: R, props: ValidateOption<T>[]) {
  //? Для многих сущностей
  const entitys = await Promise.all(
    props.map(({ column, value }) =>
      model.findOne({ where: { [column]: value } } as FindOptions),
    ),
  );

  entitys.forEach((e, index) => {
    let { type, column } = props[index];
    column = column.toString();
    checkEntity({
      type: type,
      column,
      data: e,
    });
  });

  return entitys;
}

export function checkEntity({ type, column, data }: CheckEntityProps) {
  if (type === 'existing' && !data)
    throw new HttpException(
      STRINGS.IsExistingError('this.entity', column),
      HttpStatus.BAD_REQUEST,
    );
  if (type === 'unique' && data)
    throw new HttpException(
      STRINGS.IsUniqueError('this.entity', column),
      HttpStatus.BAD_REQUEST,
    );
}
