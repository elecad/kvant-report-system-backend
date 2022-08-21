export class GetAnswerDependency {
  dependency_id: number;

  about_dependency: GetAnswerAbout[];

  programms: GetAnswerProgramm[];
}

export class GetAnswerAbout {
  data_of_type_id: number;
  about_id: number;
  value: number;
}

export class GetAnswerProgramm {
  programm_id: number;

  about_programm: GetAnswerAbout[];
}
