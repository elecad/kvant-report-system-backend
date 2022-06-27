export class AuthDto {
  mail: string;
  id: number;
  roles: { id: number; name: string; description: string; code_name: string }[];
  places: {
    id: number;
    name: string;
    place_type: { id: number; name: string };
  }[];
}
