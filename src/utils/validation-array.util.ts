import { BadRequestException } from '@nestjs/common';

export interface ValidationArrayProps<T, E = any> {
  validate: {
    array: any[];
    key: keyof T;
  };
  messages: {
    IsRepeatError: string;
    IsNotMatchingExempleError?: string;
  };
  exemple?: {
    array: any[];
    key: keyof E;
  };
}

export function validationArray<T, E = any>({
  messages,
  validate,
  exemple,
}: ValidationArrayProps<T, E>) {
  // console.log(
  //   'validate',
  //   validate.array.map((el) => el[validate.key]),
  // );
  // console.log(
  //   'exemple',
  //   exemple.array.map((el) => el[exemple.key]),
  // );

  const unique = new Set(validate.array.map((el) => el[validate.key]));

  if (unique.size != validate.array.length)
    throw new BadRequestException(messages.IsRepeatError ?? '');

  if (!exemple) return;

  if (unique.size != exemple.array.length)
    throw new BadRequestException(messages.IsNotMatchingExempleError ?? '');

  const exempleArray = exemple.array.map((el) => el[exemple.key]);
  unique.forEach((u) => {
    if (!exempleArray.includes(u))
      throw new BadRequestException(messages.IsNotMatchingExempleError ?? '');
  });
}
