import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { createRoleDto } from './dto/create-role.dto';
import { Role } from './role.model';
import { RoleService } from './role.service';

@Controller('role')
@ApiTags('Роли')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Просмотр роли по ID' })
  @ApiResponse({ status: 200, type: Role })
  getByID(@Param() params) {
    const id: number = +params.id;
    return this.roleService.getById(id);
  }

  @Get()
  @ApiOperation({ summary: 'Просмотр всех аккаунтов' })
  @ApiResponse({ status: 200, type: [Role] })
  getAll() {
    return this.roleService.getAll();
  }

  @Post()
  @ApiOperation({ summary: 'Создание нового аккаунта' })
  @ApiResponse({ status: 200, type: Role })
  create(@Body() accountDto: createRoleDto) {
    return this.roleService.create(accountDto);
  }

  @Put(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Изменение аккаунта' })
  @ApiResponse({ status: 204 })
  update(@Param() params, @Body() dto: createRoleDto) {
    const id: number = +params.id;
    return this.roleService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Удаление аккаунта' })
  @ApiResponse({ status: 204 })
  delete(@Param() params) {
    const id: number = +params.id;
    return this.roleService.delete(id);
  }
}
