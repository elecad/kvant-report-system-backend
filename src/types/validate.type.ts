import { Attributes, Model } from 'sequelize/types';

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
