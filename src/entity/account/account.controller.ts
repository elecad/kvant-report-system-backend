import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/decorators/account-auth.decorator';
import { Roles } from 'src/decorators/roles-auth.decorator';
import { queryIdDto } from 'src/dto/query-id.dto';
import { RolesGuard } from 'src/guards/roles-auth.guard';
import { Role } from '../role/role.model';
import { Account } from './account.model';
import { AccountService } from './account.service';
import { createAccountDto } from './dto/create-account.dto';

@Controller('entity/account')
@UseGuards(RolesGuard)
@Roles('Администратор')
@ApiTags('Аккаунты')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Просмотр аккаунта по ID' })
  @ApiResponse({ status: 200, type: Account })
  getByID(@Param() params: queryIdDto) {
    const id: number = +params.id;
    return this.accountService.getById({ id, include: Role });
  }

  @Get()
  @ApiOperation({ summary: 'Просмотр всех аккаунтов' })
  @ApiResponse({ status: 200, type: [Account] })
  getAll(@Auth() user) {
    console.log(user);

    return this.accountService.getAll();
  }

  @Post()
  @ApiOperation({ summary: 'Создание нового аккаунта' })
  @ApiResponse({ status: 200, type: Account })
  create(@Body() accountDto: createAccountDto) {
    return this.accountService.create(accountDto);
  }

  @Put(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Изменение аккаунта' })
  @ApiResponse({ status: 204 })
  update(@Param() params: queryIdDto, @Body() dto: createAccountDto) {
    const id: number = +params.id;
    return this.accountService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Удаление аккаунта' })
  @ApiResponse({ status: 204 })
  delete(@Param() params: queryIdDto) {
    const id: number = +params.id;
    return this.accountService.delete(id);
  }
}
