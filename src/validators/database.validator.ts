import { HttpException, HttpStatus } from '@nestjs/common';
import { col, FindOptions, WhereOptions } from 'sequelize';
import { Attributes, Model, ModelStatic } from 'sequelize/types';
import { STRINGS } from 'src/res/strings';

export type ValidateType = 'unique' | 'existing';

export interface ValidateOption<T extends Model> {
  type: ValidateType;
  value: string | number;
  column: keyof Attributes<T>;
  findOptions?: FindOptions;
  message?: string;
}

export interface CheckEntityProps {
  type: ValidateType;
  column: string;
  data: Model;
  entityName: string;
  message?: string;
}

export async function databaseValidateOne<
  T extends Model,
  R extends ModelStatic<T> = ModelStatic<T>,
>(model: R, entityName: string, props: ValidateOption<T>) {
  //? Для одной сущности
  let { type, value, column, findOptions, message } = props;
  const whereOption: WhereOptions =
    findOptions && findOptions.where
      ? { [column]: value, ...findOptions.where }
      : { [column]: value };

  const entity = await model.findOne({
    ...findOptions,
    where: whereOption,
  } as FindOptions);
  column = column.toString();

  checkEntity({ type, column, data: entity, entityName, message });

  return entity;
}

export async function databaseValidateAll<
  T extends Model,
  R extends ModelStatic<T> = ModelStatic<T>,
>(model: R, entityName: string, props: ValidateOption<T>[]) {
  //? Для многих сущностей
  const entitys = await Promise.all(
    props.map(({ column, value, findOptions }) => {
      const whereOption: WhereOptions =
        findOptions && findOptions.where
          ? { [column]: value, ...findOptions.where }
          : { [column]: value };
      return model.findOne({
        ...findOptions,
        where: whereOption,
      } as FindOptions);
    }),
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
  message,
}: CheckEntityProps) {
  if (type === 'existing' && !data)
    throw new HttpException(
      message ?? STRINGS.IsExistingError(entityName, column),
      HttpStatus.BAD_REQUEST,
    );
  if (type === 'unique' && data)
    throw new HttpException(
      message ?? STRINGS.IsUniqueError(entityName, column),
      HttpStatus.BAD_REQUEST,
    );
}
