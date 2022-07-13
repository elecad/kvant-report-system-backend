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
  UsePipes,
} from '@nestjs/common';
import { ValidationPipe } from 'src/pipes/validator.pipe';
import { parseIntOptions } from 'src/validators/options/parseIntPipe.option';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Controller('account')
@UsePipes(ValidationPipe)
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountService.create(createAccountDto);
  }

  @Get()
  findAll() {
    return this.accountService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe(parseIntOptions)) id: number) {
    return this.accountService.validateOne({
      type: 'existing',
      collumn: 'id',
      value: id,
    });
  }

  @Patch(':id')
  update(
    @Param('id', new ParseIntPipe(parseIntOptions)) id: string,
    @Body() updateAccountDto: UpdateAccountDto,
  ) {
    return this.accountService.update(Number(id), updateAccountDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', new ParseIntPipe(parseIntOptions)) id: string) {
    return this.accountService.remove(Number(id));
  }
}
