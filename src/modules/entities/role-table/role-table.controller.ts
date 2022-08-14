import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { RoleTableService } from './role-table.service';
import { CreateRoleTableDto } from './dto/create-role-table.dto';
import { UpdateRoleTableDto } from './dto/update-role-table.dto';
import { parseIntOptions } from 'src/validators/options/parseIntPipe.option';

@Controller('role-table')
export class RoleTableController {
  constructor(private readonly roleTableService: RoleTableService) {}

  @Post()
  create(@Body() сreateRoleTableDto: CreateRoleTableDto) {
    return this.roleTableService.create(сreateRoleTableDto);
  }

  @Get()
  findAll() {
    return this.roleTableService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe(parseIntOptions)) id: number) {
    return this.roleTableService.validateOne({
      column: 'id',
      type: 'existing',
      value: id,
    });
  }

  @Patch(':id')
  update(
    @Param('id', new ParseIntPipe(parseIntOptions)) id: number,
    @Body() updateRoleTableDto: UpdateRoleTableDto,
  ) {
    return this.roleTableService.update(id, updateRoleTableDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseIntPipe(parseIntOptions)) id: number) {
    return this.roleTableService.remove(id);
  }
}
