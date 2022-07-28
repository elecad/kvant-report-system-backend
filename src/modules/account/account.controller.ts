import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth-guard/auth.guard';
import { Roles } from 'src/guards/auth-guard/decorators/roles.decorator';
import { parseIntOptions } from 'src/validators/options/parseIntPipe.option';
import { Dependency } from '../dependency/entities/dependency.entity';
import { Role } from '../role/entities/role.entity';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountService.create(createAccountDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  @Roles('admin')
  findAll() {
    return this.accountService.findAll({ include: [Role, Dependency] });
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe(parseIntOptions)) id: number) {
    return this.accountService.validateOne({
      type: 'existing',
      column: 'id',
      value: id,
    });
  }

  @Patch(':id')
  update(
    @Param('id', new ParseIntPipe(parseIntOptions)) id: number,
    @Body() updateAccountDto: UpdateAccountDto,
  ) {
    return this.accountService.update(id, updateAccountDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', new ParseIntPipe(parseIntOptions)) id: number) {
    return this.accountService.remove(id);
  }
}
