import { Attributes, Model } from 'sequelize/types';

export type ValidateType = 'unique' | 'existing';

export interface ValidateOneProps<T extends Model> {
  type: ValidateType;
  options: ValidateOption<T>;
}

export interface ValidateAllProps<T extends Model> {
  type: ValidateType;
  options: ValidateOption<T>[];
}

export interface ValidateOption<T extends Model> {
  value: string | number;
  collumn: keyof Attributes<T>;
}

export interface CheckEntityProps {
  type: ValidateType;
  collumn: string;
  data: Model;
}
