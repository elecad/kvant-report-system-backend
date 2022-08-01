export interface IUser {
  id: number;
  surname: string;
  name: string;
  middlename: string;
  roles: IRole[];
  dependencies: IDependency[];
}

export interface IRole {
  id: number;
  name: string;
  code_name: string;
  description: string;
}

export interface IDependency {
  id: number;
  name: string;
  short_name: string;
  dependency_type: IDependencyType;
}

export interface IDependencyType {
  id: number;
  name: string;
}
