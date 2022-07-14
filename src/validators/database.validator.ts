import { HttpException, HttpStatus } from '@nestjs/common';
import { col, FindOptions } from 'sequelize';
import { Attributes, Model, ModelStatic } from 'sequelize/types';
import { STRINGS } from 'src/res/strings';

export type ValidateType = 'unique' | 'existing';

export interface ValidateOption<T extends Model> {
  type: ValidateType;
  value: string | number;
  column: keyof Attributes<T>;
  findOptions?: FindOptions;
}

export interface CheckEntityProps {
  type: ValidateType;
  column: string;
  data: Model;
  entityName: string;
}

export async function databaseValidateOne<
  T extends Model,
  R extends ModelStatic<T> = ModelStatic<T>,
>(model: R, entityName: string, props: ValidateOption<T>) {
  //? Для одной сущности
  let { type, value, column, findOptions } = props;
  const entity = await model.findOne({
    ...findOptions,
    where: { [column]: value },
  } as FindOptions);
  column = column.toString();

  checkEntity({ type, column, data: entity, entityName });

  return entity;
}

export async function databaseValidateAll<
  T extends Model,
  R extends ModelStatic<T> = ModelStatic<T>,
>(model: R, entityName: string, props: ValidateOption<T>[]) {
  //? Для многих сущностей
  const entitys = await Promise.all(
    props.map(({ column, value, findOptions }) =>
      model.findOne({
        ...findOptions,
        where: { [column]: value },
      } as FindOptions),
    ),
  );

  entitys.forEach((e, index) => {
    let { type, column } = props[index];
    column = column.toString();
    checkEntity({
      type: type,
      column,
      data: e,
      entityName,
    });
  });

  return entitys;
}

export function checkEntity({
  type,
  column,
  data,
  entityName,
}: CheckEntityProps) {
  if (type === 'existing' && !data)
    throw new HttpException(
      STRINGS.IsExistingError(entityName, column),
      HttpStatus.BAD_REQUEST,
    );
  if (type === 'unique' && data)
    throw new HttpException(
      STRINGS.IsUniqueError(entityName, column),
      HttpStatus.BAD_REQUEST,
    );
}
