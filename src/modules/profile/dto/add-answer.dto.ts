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
  @Type(() => AboutDependency)
  about_dependencies: AboutDependency[];
}

export class AboutDependency {
  @IsNotEmpty({
    message: STRINGS.IsNotEmptyError,
  })
  @IsPositive({
    message: STRINGS.IsPositiveError,
  })
  @IsInt({ message: STRINGS.IsIntError })
  dependency_id: number;

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

  @IsArray({ message: STRINGS.IsArrayError })
  @ValidateNested({})
  @Type(() => AboutProgramm)
  about_programms: AboutProgramm[];
}

export class AboutProgramm {
  @IsNotEmpty({
    message: STRINGS.IsNotEmptyError,
  })
  @IsPositive({
    message: STRINGS.IsPositiveError,
  })
  @IsInt({ message: STRINGS.IsIntError })
  programm_id: number;

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
