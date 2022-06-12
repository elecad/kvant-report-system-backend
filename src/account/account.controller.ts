import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ValidationPipe } from 'src/pipes/validator.pipe';
import { Account } from './account.model';
import { AccountService } from './account.service';
import { createAccountDto } from './dto/create-account.dto';

@Controller('account')
@ApiTags('Аккаунты')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Просмотр аккаунта по ID' })
  @ApiResponse({ status: 200, type: Account })
  getByID(@Param() params) {
    const id: number = +params.id;
    return this.accountService.getByIdAccount(id);
  }

  @Get()
  @ApiOperation({ summary: 'Просмотр всех аккаунтов' })
  @ApiResponse({ status: 200, type: [Account] })
  getAll() {
    return this.accountService.getAllAccount();
  }

  @Post()
  @ApiOperation({ summary: 'Создание нового аккаунта' })
  @ApiResponse({ status: 200, type: Account })
  create(@Body() accountDto: createAccountDto) {
    return this.accountService.createAccount(accountDto);
  }

  @Put(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Изменение аккаунта' })
  @ApiResponse({ status: 204 })
  update(@Param() params, @Body() dto: createAccountDto) {
    const id: number = +params.id;
    this.accountService.updateAccount(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Удаление аккаунта' })
  @ApiResponse({ status: 204 })
  delete(@Param() params) {
    const id: number = +params.id;
    this.accountService.deleteAccount(id);
  }
}
