import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'isUnique', async: false })
export class isUnique implements ValidatorConstraintInterface {
  async validate(text: string | number, args: ValidationArguments) {
    const { model, where }: { model; where?: string } = args.constraints[0];

    const types = ['string', 'number'];

    if (!text || !types.find((t) => t === typeof text) || isNaN(+text))
      return false;

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
