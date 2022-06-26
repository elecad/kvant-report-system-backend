import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Account } from 'src/entity/account/account.model';
import { AccountService } from 'src/entity/account/account.service';
import { Control } from 'src/entity/control/control.model';
import { Permission } from 'src/entity/permission/permission.model';
import { Place } from 'src/entity/place/place.model';
import { PlaceType } from 'src/entity/place_type/place_type.model';
import { Role } from 'src/entity/role/role.model';
import { loginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private accountService: AccountService,
    private jwtService: JwtService,
  ) {}
  async login(account: loginDto) {
    const candidate = await this.accountService.getByEmail({
      email: account.mail,
      include: [
        {
          model: Place,
          attributes: ['id', 'name'],
          through: { attributes: [] },
          include: [{ model: PlaceType, attributes: ['id', 'name'] }],
        },
        {
          model: Role,
          attributes: ['id', 'name', 'description', 'code_name'],

          through: { attributes: [] },
        },
      ],
    });
    if (candidate && candidate.password === account.password) {
      return this.generateToken(candidate);
    }
    throw new UnauthorizedException({
      message: 'Некорректная электронная почта или пароль',
    });
  }

  generateToken(account: Account) {
    const payload = {
      mail: account.mail,
      id: account.id,
      fio: account.FIO,
      roles: account.roles,
      places: account.places,
    };

    return {
      token: this.jwtService.sign(payload),
      account: payload,
    };
  }

  check(str: string) {
    console.log(this.jwtService.verify(str));
  }
}
