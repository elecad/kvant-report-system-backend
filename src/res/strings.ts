export const STRINGS = {
  IsNotEmptyError: 'Это обязательное поле',
  IsEmailError: 'Это поле должно быть корректной электронной почтой',
  IsStringError: 'Это поле должно быть строкой',
  IsPositiveError: 'Это поле должно быть положительным целым числом',
  IsPositiveArrayError:
    'Это поле должно быть массивом положительных целых числел',
  IsUniqueError: (entity: string, collumn: string) =>
    `${entity} с таким ${collumn} уже имеется в системе`,
  IsExistingError: (entity: string, collumn: string) =>
    `${entity} с таким ${collumn} отсутсвует в системе`,
  IsNotValidUUID: 'Токен является некорректным',
  IsDateStringError: 'Это поле должно быть датой',
  LoginError: 'Не удалось найти такую учётную запись',
  UnauthorizedError: 'Пользователь не авторизован',
  ForbiddenError: 'Недостаточно прав для этого действия',
  IsInHalfYearError: 'Полугодие может быть только 1 или 2',
  IsIntError: 'Это поле должно быть целым числом',
  IsIntArrayError: 'Это поле должно быть массивом целых чисел',
  IsArrayError: 'Это поле должно быть массивом',
  IsBadTaskRequest:
    'Данное задание не нуждается в ответе текущего пользователя',
  DependencyRepeatError: 'В Зависимостях обнаружены повторения',
  DependencyNotMatchingTemplateError:
    'Зависимости не соотвествуют необходимому шаблону',
  TemplateDependencyTypeError: 'Шаблон для такого Типа Зависимости не найден',

  DataOfTypeDependencyRepeatError: (dependency_id: number) =>
    `В Типах Данных Зависимости с id ${dependency_id} обнаружено повторение`,
  DataOfTypeDependencyNotMatchingTemplateError: (dependency_id: number) =>
    `Типы данных Зависимости с id ${dependency_id} не соответсвуют шаблону`,

  ProgrammDependencyRepeatError: (dependency_id: number) =>
    `В Программах Зависимости с id ${dependency_id} обнаружены повторения`,
  ProgrammDependencyNotMatchingTemplateError: (dependency_id: number) =>
    `Программы Зависимости с id ${dependency_id} не соответсвуют шаблону`,

  DataOfTypeProgrammRepeatError: (dependency_id: number) =>
    `В Данных о Программах у Зависимости с id ${dependency_id} обнаружены повторения`,
  DataOfTypeProgrammNotMatchingTemplateError: (dependency_id: number) =>
    `Данные о Программах у Зависимости с id ${dependency_id} не соотвествуют шаблону`,

  ForbiddenAnswerError: 'Пользователь имеет доступ только к своим Ответам',
  AbsenceDependencyIdAboutDependencies:
    'Программа была добавлена для отсутсвующей в AboutDependency Зависимости',
};
