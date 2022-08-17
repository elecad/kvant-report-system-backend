import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { FindOptions } from 'sequelize';
import { parseIntOptions } from 'src/validators/options/parseIntPipe.option';
import { AccountTableService } from '../entities/account-table/account-table.service';
import { AccountTable } from '../entities/account-table/entities/account-table.entity';
import { DependencyTable } from '../entities/dependency-table/entities/dependency-table.entity';
import { DependencyTypeTable } from '../entities/dependency-type-table/entities/dependency-type-table.entity';
import { RoleTable } from '../entities/role-table/entities/role-table.entity';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Controller('account')
export class AccountController {
  constructor(
    private readonly accountService: AccountService,
    private readonly accountTableService: AccountTableService,
  ) {}

  findParams: FindOptions<AccountTable> = {
    include: [
      {
        model: RoleTable,
        through: { attributes: [] },
      },
      {
        model: DependencyTable,
        include: [DependencyTypeTable],
        attributes: ['id', 'name', 'short_name'],
        through: { attributes: [] },
      },
    ],
  };

  @Post()
  async create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountService.create(createAccountDto);
  }

  @Get()
  findAll() {
    return this.accountTableService.findAll(this.findParams);
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe(parseIntOptions)) id: number) {
    return this.accountTableService.validateOne({
      type: 'existing',
      column: 'id',
      value: id,
      findOptions: this.findParams,
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
  remove(@Param('id', new ParseIntPipe(parseIntOptions)) id: number) {
    return this.accountTableService.remove(id);
  }
}
