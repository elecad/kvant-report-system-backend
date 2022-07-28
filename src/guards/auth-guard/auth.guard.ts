import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Account } from 'src/modules/account/entities/account.entity';
import { Role } from 'src/modules/role/entities/role.entity';
import { SessionService } from 'src/modules/session/session.service';
import { STRINGS } from 'src/res/strings';
import { validate as uuidValidate } from 'uuid';
import { ROLES_KEY } from './decorators/roles.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private sessionService: SessionService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;

    if (!uuidValidate(token)) {
      this.throwUnauthorizedException(STRINGS.UnauthorizedError);
    }

    const session = await this.sessionService.findOne({
      where: { token },
      include: { model: Account, include: [Role] },
    });

    if (!session) {
      this.throwUnauthorizedException(STRINGS.UnauthorizedError);
    }

    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    request.user = session.account;
    request.token = session.token;

    const hasRole = session.account.roles.some((r) =>
      requiredRoles.includes(r.code_name),
    );

    if (!hasRole) {
      this.throwForbiddenException(STRINGS.ForbiddenError);
    }

    return true;
  }

  private throwUnauthorizedException = (message: string) => {
    throw new UnauthorizedException({
      message,
    });
  };

  private throwForbiddenException = (message: string) => {
    throw new ForbiddenException({
      message,
    });
  };
}
