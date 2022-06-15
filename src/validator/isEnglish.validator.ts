import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'isEnglish', async: false })
export class isEnglish implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    return /^[a-zA-Z_]+$/.test(text);
  }

  defaultMessage(args: ValidationArguments) {
    return 'Данные должны содержать только латинские буквы';
  }
}
