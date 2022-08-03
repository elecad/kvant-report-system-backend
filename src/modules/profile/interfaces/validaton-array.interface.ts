export interface ValidationArrayProps<T, E = any> {
  validate: {
    array: any[];
    key: keyof T;
  };
  messages: {
    IsRepeatError: string;
    IsNotMatchingExemple?: string;
  };
  exemple?: {
    array: any[];
    key: keyof E;
  };
}
