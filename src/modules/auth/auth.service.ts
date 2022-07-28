import { Injectable } from '@nestjs/common';
import { STRINGS } from 'src/res/strings';
import { AccountService } from '../account/account.service';
import { SessionService } from '../session/session.service';
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly sessionService: SessionService,
    private readonly accountService: AccountService,
  ) {}

  async authentication({ email, password }: LoginAuthDto) {
    const candidat = await this.accountService.validateOne({
      column: 'email',
      type: 'existing',
      value: email,
      message: STRINGS.LoginError,
      findOptions: { where: { password: password } },
    });

    const { token } = await this.sessionService.create(candidat.id);

    return { token };
  }

  async exit(token: string) {
    return this.sessionService.remove(token);
  }
}
