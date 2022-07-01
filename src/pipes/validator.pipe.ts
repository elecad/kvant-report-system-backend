import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

export enum VALIDATOR_GROUP {
  base = 'base',
  database = 'bd',
}

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const obj = plainToClass(metadata.metatype, value);
    console.log(obj);

    if (metadata.type !== 'custom') {
      this.messages(
        await validate(obj, {
          forbidUnknownValues: true,
          groups: [VALIDATOR_GROUP.base],
        }),
      );

      this.messages(await validate(obj));
    }

    return value;
  }

  messages(errors: ValidationError[]) {
    if (errors.length) {
      throw new HttpException(
        {
          statusCode: 400,
          message: this.analyse(errors),
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  analyse(errors: ValidationError[], message: Object = {}) {
    errors.forEach((error) => {
      if (error.constraints)
        message[error.property] = Object.values(error.constraints);

      if (error.children) this.analyse(error.children, message);
    });
    return message;
  }
}
