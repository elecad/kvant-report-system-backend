import { Body, Controller, Delete, HttpCode, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ControlService } from './control.service';
import { addControlDto } from './dto/add-control.dto';

@Controller('control')
@ApiTags('Управление')
export class ControlController {
  constructor(private controlService: ControlService) {}
  @Post()
  @ApiOperation({ summary: 'Добавление нового контроля аккаунту' })
  @ApiResponse({ status: 200 })
  create(@Body() permissionDto: addControlDto) {
    return this.controlService.add(permissionDto);
  }

  @Delete()
  @HttpCode(204)
  @ApiOperation({ summary: 'Удаление роли у аккаунта' })
  @ApiResponse({ status: 204 })
  remove(@Body() permissionDto: addControlDto) {
    return this.controlService.remove(permissionDto);
  }
}
