import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const obj = plainToClass(metadata.metatype, value);
    const errors = await validate(obj);

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
    return value;
  }
}
