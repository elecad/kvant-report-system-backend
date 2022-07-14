export const STRINGS = {
  IsNotEmptyError: 'Это обязательное поле',
  IsEmailError: 'Это поле должно быть корректной электронной почтой',
  IsStringError: 'Это поле должно быть строкой',
  IsUniqueError: (entity: string, collumn: string) =>
    `${entity} с таким ${collumn} уже имеется в системе`,
  IsExistingError: (entity: string, collumn: string) =>
    `${entity} с таким ${collumn} отсутсвует в системе`,
};
