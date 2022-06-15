import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import { DataTypes } from 'src/data_types/data_types.model';

@ValidatorConstraint({ name: 'isUnique', async: false })
export class isUnique implements ValidatorConstraintInterface {
  async validate(text: string | number, args: ValidationArguments) {
    const { model, where }: { model; where?: string } = args.constraints[0];

    if (where)
      return !!!(await model.findOne({
        where: { [where]: text },
      }));
    return !!!(await model.findByPk(text));
  }

  defaultMessage(args: ValidationArguments) {
    return 'Одно из значений является не уникальным';
  }
}
