import { BadRequestException } from '@nestjs/common';

interface RepeatArrayCheckProps {
  array: any[];
  messages: string;
}

export function repeatArrayCheck({ array, messages }: RepeatArrayCheckProps) {
  const unique = new Set(array);

  if (unique.size != array.length) throw new BadRequestException(messages);
}
