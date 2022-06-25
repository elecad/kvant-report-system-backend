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
import { ControlService } from './control.service';
import { addControlDto } from './dto/add-control.dto';

@Controller('entity/control')
@UseGuards(RolesGuard)
@Roles('ADMIN')
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
