import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('role')
@ApiTags('Роли')
export class RoleController {}
