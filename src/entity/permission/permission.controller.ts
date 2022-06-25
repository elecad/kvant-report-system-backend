import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles-auth.decorator';
import { RolesGuard } from 'src/guards/roles-auth.guard';
import { addPermissionDto } from './dto/add-permission.dto';
import { PermissionService } from './permission.service';

@Controller('entity/permission')
@UseGuards(RolesGuard)
@Roles('ADMIN')
@ApiTags('Привелегии')
export class PermissionController {
  constructor(private permissionService: PermissionService) {}
  @Post()
  @ApiOperation({ summary: 'Добавление новой роли аккаунту' })
  @ApiResponse({ status: 200 })
  create(@Body() permissionDto: addPermissionDto) {
    return this.permissionService.add(permissionDto);
  }

  @Delete()
  @HttpCode(204)
  @ApiOperation({ summary: 'Удаление роли у аккаунта' })
  @ApiResponse({ status: 204 })
  remove(@Body() permissionDto: addPermissionDto) {
    return this.permissionService.remove(permissionDto);
  }
}
