import { Injectable } from '@nestjs/common';
import { STRINGS } from 'src/res/strings';
import { AccountTableService } from '../entities/account-table/account-table.service';
import { SessionTableService } from '../entities/session-table/session-table.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private readonly sessionTableService: SessionTableService,
    private readonly accountTableService: AccountTableService,
  ) {}

  async authentication({ email, password }: LoginAuthDto) {
    const { id: account_id } = await this.accountTableService.validateOne({
      column: 'email',
      type: 'existing',
      value: email,
      message: STRINGS.LoginError,
      findOptions: { where: { password: password } },
    });

    const { token } = await this.sessionTableService.create({
      account_id,
      token: uuid(),
    });

    return { token };
  }

  async exit(token: string) {
    return this.sessionTableService.removeByToken(token);
  }
}
