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

      this.messages(
        await validate(obj, {
          groups: [VALIDATOR_GROUP.database],
        }),
      );
    }

    return value;
  }

  messages(errors: ValidationError[]) {
    if (errors.length) {
      const message = {};

      errors.forEach((err) => {
        message[err.property] = Object.values(err.constraints);
      });
      throw new HttpException(
        {
          statusCode: 400,
          message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
