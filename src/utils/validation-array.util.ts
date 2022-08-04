import { BadRequestException } from '@nestjs/common';

export interface ValidationArrayProps {
  validate: any[];
  messages: {
    IsRepeatError: string;
    IsNotMatchingExempleError?: string;
  };
  exemple: any[];
}

export function validationArray<T, E = any>({
  messages,
  validate,
  exemple,
}: ValidationArrayProps) {
  // console.log(
  //   'validate',
  //   validate.array.map((el) => el[validate.key]),
  // );
  // console.log(
  //   'exemple',
  //   exemple.array.map((el) => el[exemple.key]),
  // );

  const unique = new Set(exemple);

  if (unique.size != validate.length)
    throw new BadRequestException(messages.IsRepeatError ?? '');

  if (!exemple) return;

  if (unique.size != exemple.length)
    throw new BadRequestException(messages.IsNotMatchingExempleError ?? '');

  unique.forEach((u) => {
    if (!exemple.includes(u))
      throw new BadRequestException(messages.IsNotMatchingExempleError ?? '');
  });
}
