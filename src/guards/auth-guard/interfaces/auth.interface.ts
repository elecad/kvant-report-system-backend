export interface BasePropertyDB {
  id: number;
  name: string;
}

export interface AuthUser {
  id: number;
  surname: string;
  name: string;
  middlename: string;
  roles: AuthRole[];
  dependencies: AuthDependency[];
}

export interface AuthRole extends BasePropertyDB {
  code_name: string;
  description: string;
}

export interface AuthDependency extends BasePropertyDB {
  short_name: string;
  dependency_type: AuthDependencyType;
  programms: AuthProgramm[];
}

export interface AuthDependencyType extends BasePropertyDB {}

export interface AuthDirection extends BasePropertyDB {}

export interface AuthSchoolType extends BasePropertyDB {}

export interface AuthSchool extends BasePropertyDB {
  adress: string;
  school_type: AuthSchoolType;
}

export interface AuthProgramm extends BasePropertyDB {
  navigator_id: number;
  start_age: number;
  end_age: number;
  direction: AuthDirection;
  school: AuthSchool;
}
