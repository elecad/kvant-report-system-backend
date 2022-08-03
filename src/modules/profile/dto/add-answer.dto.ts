import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsPositive,
  ValidateNested,
} from 'class-validator';
import { STRINGS } from 'src/res/strings';

export class AddAnswerDto {
  @IsNotEmpty({
    message: STRINGS.IsNotEmptyError,
  })
  @IsPositive({
    message: STRINGS.IsPositiveError,
  })
  @IsInt({ message: STRINGS.IsIntError })
  task_id: number;

  @IsArray({ message: STRINGS.IsArrayError })
  @ValidateNested({})
  @Type(() => AddAnswerDependency)
  dependencies: AddAnswerDependency[];
}

export class AddAnswerDependency {
  @IsNotEmpty({
    message: STRINGS.IsNotEmptyError,
  })
  @IsPositive({
    message: STRINGS.IsPositiveError,
  })
  @IsInt({ message: STRINGS.IsIntError })
  dependency_id: number;

  @IsArray({ message: STRINGS.IsArrayError })
  @ValidateNested({})
  @Type(() => AddAnswerAbout)
  about_dependency: AddAnswerAbout[];

  @IsArray({ message: STRINGS.IsArrayError })
  @ValidateNested({})
  @Type(() => AddAnswerProgramm)
  programms: AddAnswerProgramm[];
}

export class AddAnswerAbout {
  @IsNotEmpty({
    message: STRINGS.IsNotEmptyError,
  })
  @IsPositive({
    message: STRINGS.IsPositiveError,
  })
  @IsInt({ message: STRINGS.IsIntError })
  data_of_type_id: number;

  @IsNotEmpty({
    message: STRINGS.IsNotEmptyError,
  })
  @IsPositive({
    message: STRINGS.IsPositiveError,
  })
  @IsInt({ message: STRINGS.IsIntError })
  value: number;
}

export class AddAnswerProgramm {
  @IsNotEmpty({
    message: STRINGS.IsNotEmptyError,
  })
  @IsPositive({
    message: STRINGS.IsPositiveError,
  })
  @IsInt({ message: STRINGS.IsIntError })
  programm_id: number;

  @IsArray({ message: STRINGS.IsArrayError })
  @ValidateNested({})
  @Type(() => AddAnswerAbout)
  about_programm: AddAnswerAbout[];
}
