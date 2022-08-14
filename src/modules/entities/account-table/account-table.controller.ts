import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AccountTableService } from './account-table.service';
import { CreateAccountTableDto } from './dto/create-account-table.dto';
import { UpdateAccountTableDto } from './dto/update-account-table.dto';

@Controller('account-table')
export class AccountTableController {
  constructor(private readonly accountTableService: AccountTableService) {}

  @Post()
  create(@Body() createAccountTableDto: CreateAccountTableDto) {
    return this.accountTableService.create(createAccountTableDto);
  }

  @Get()
  findAll() {
    return this.accountTableService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountTableService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccountTableDto: UpdateAccountTableDto) {
    return this.accountTableService.update(+id, updateAccountTableDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accountTableService.remove(+id);
  }
}
