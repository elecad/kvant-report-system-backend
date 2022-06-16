import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'isID', async: false })
export class isID implements ValidatorConstraintInterface {
  async validate(text: string | number, args: ValidationArguments) {
    return !!+text;
  }

  defaultMessage(args: ValidationArguments) {
    return 'ID в запросе должен быть числом';
  }
}
