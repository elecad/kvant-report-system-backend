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
import { parseIntOptions } from 'src/validators/options/parseIntPipe.option';
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
  findOne(@Param('id', new ParseIntPipe(parseIntOptions)) id: number) {
    return this.accountTableService.validateOne({
      column: 'id',
      type: 'existing',
      value: id,
    });
  }

  @Patch(':id')
  update(
    @Param('id', new ParseIntPipe(parseIntOptions)) id: number,
    @Body() updateAccountTableDto: UpdateAccountTableDto,
  ) {
    return this.accountTableService.update(id, updateAccountTableDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseIntPipe(parseIntOptions)) id: number) {
    return this.accountTableService.remove(id);
  }
}
