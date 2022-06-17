import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'isHasDB', async: false })
export class isHasDB implements ValidatorConstraintInterface {
  async validate(text: string | number, args: ValidationArguments) {
    const { model, where }: { model; where?: string } = args.constraints[0];

    const types = ['string', 'number'];

    if (!text || !types.find((t) => t === typeof text)) return false;
    if (where)
      return !!(await model.findOne({
        where: { [where]: text },
      }));

    return !!(await model.findByPk(text));
  }

  defaultMessage(args: ValidationArguments) {
    return 'Одно из значений не найдено в базе данных';
  }
}
