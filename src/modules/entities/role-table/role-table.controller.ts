import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoleTableService } from './role-table.service';
import { CreateRoleTableDto } from './dto/create-role-table.dto';
import { UpdateRoleTableDto } from './dto/update-role-table.dto';

@Controller('role-table')
export class RoleTableController {
  constructor(private readonly roleTableService: RoleTableService) {}

  @Post()
  create(@Body() createRoleTableDto: CreateRoleTableDto) {
    return this.roleTableService.create(createRoleTableDto);
  }

  @Get()
  findAll() {
    return this.roleTableService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleTableService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleTableDto: UpdateRoleTableDto) {
    return this.roleTableService.update(+id, updateRoleTableDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleTableService.remove(+id);
  }
}
