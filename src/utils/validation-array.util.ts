import { BadRequestException } from '@nestjs/common';

export interface ValidationArrayProps {
  validate: any[];
  messages: {
    IsRepeatError: string;
    IsNotMatchingExempleError?: string;
  };
  exemple: any[];
}

export function validationArray({
  messages,
  validate,
  exemple,
}: ValidationArrayProps) {
  const unique = new Set(validate);

  // console.log(validate, exemple);

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
