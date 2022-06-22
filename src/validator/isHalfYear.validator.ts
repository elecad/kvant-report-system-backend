import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'isHalfYear', async: false })
export class isHalfYear implements ValidatorConstraintInterface {
  async validate(text: string | number, args: ValidationArguments) {
    const values = [1, 2];
    return !!values.find((t) => t === +text);
  }

  defaultMessage(args: ValidationArguments) {
    return 'Полугодие не должно быть меньше 1 или больше 2';
  }
}
