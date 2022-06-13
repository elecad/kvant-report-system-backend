import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { addPermissionDto } from './dto/add-permission.dto';
import { PermissionService } from './permission.service';

@Controller('permission')
export class PermissionController {
  constructor(private permissionService: PermissionService) {}
  @Post()
  @ApiOperation({ summary: 'Добавление новой роли аккаунту' })
  @ApiResponse({ status: 200 })
  create(@Body() permissionDto: addPermissionDto) {
    return this.permissionService.add(permissionDto);
  }
}
