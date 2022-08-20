export class TaskProfileDto {
  id: number;
  year: number;
  half_year: number;
  author: {
    surname: string;
    name: string;
    middlename: string;
  };
  completed: boolean;
  answer_id?: number;
}
