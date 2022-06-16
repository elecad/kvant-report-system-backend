import { Body, Controller, Delete, HttpCode, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { addPermissionDto } from './dto/add-permission.dto';
import { PermissionService } from './permission.service';

@Controller('permission')
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
