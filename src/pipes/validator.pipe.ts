import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const obj = plainToInstance(metadata.metatype, value);
    this.messages(
      await validate(obj, {
        forbidUnknownValues: true,
      }),
    );
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
