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
  IsRepeatDependencyError: 'Обнаружены повторения в Зависимостях',
  IsNotMatchingDependencyError:
    'Обнаружено несоответсвие с Зависимостями, требуемыми для Отчёта',
  DependencySearchError: 'Ошибка при поиске Dependency в запросе при валидации',
  IsRepeatAboutDependencyError:
    'Обнаружены повторения в Типах Данных Зависимости',
  IsNotMatchingAboutDependencyError: (type: string) =>
    `Обнаружено несоответсвие с Типами данных, требуемыми для Отчёта (О Зависимостях, Тип: ${type})`,
  AreaDependencyType: 'Район',
  SchoolDependencyType: 'Учереждение дополнительного образования',
  CheckAboutDependencyTypeError:
    'Ошибка при проверке данных в about_dependency',
  IsRepeatDataOfTypeProgrammError:
    'Обнаружены повторения в Типах Данных Программы',
  IsNotMatchingDataOfTypeProgrammError:
    'Обнаружено несоответсвие с Типами данных, требуемыми для Отчёта (О Программах)',
};
