import { HttpException, HttpStatus, ParseIntPipeOptions } from '@nestjs/common';

export const parseIntOptions: ParseIntPipeOptions = {
  exceptionFactory: () => {
    throw new HttpException(
      'В качестве параметра необходим ID (целое положительное число)',
      HttpStatus.BAD_REQUEST,
    );
  },
};
