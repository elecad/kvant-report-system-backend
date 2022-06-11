import { Body, Controller, Post } from '@nestjs/common';
import { AccountService } from './account.service';
import { createAccountDto } from './dto/create-account.dto';

@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Post()
  create(@Body() accountDto: createAccountDto) {
    return this.accountService.createAccount(accountDto);
  }
}
