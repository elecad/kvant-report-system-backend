import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

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
