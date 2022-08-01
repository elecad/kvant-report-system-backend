import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Account } from 'src/modules/account/entities/account.entity';
import { Dependency } from 'src/modules/dependency/entities/dependency.entity';
import { DependencyType } from 'src/modules/dependency_type/entities/dependency_type.entity';
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
      include: {
        model: Account,
        attributes: ['id', 'surname', 'name', 'middlename'],
        include: [
          {
            model: Role,
            through: { attributes: [] },
          },
          {
            model: Dependency,
            attributes: ['id', 'name', 'short_name'],
            include: [DependencyType],
            through: { attributes: [] },
          },
        ],
      },
    });

    console.log(session);

    if (!session) {
      this.throwUnauthorizedException(STRINGS.UnauthorizedError);
    }

    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    request.user = session.account.toJSON();
    request.token = session.token;

    if (!requiredRoles) {
      return true;
    }

    const hasRole = session.account.roles.some((r) =>
      requiredRoles.includes(r.code_name),
    );

    if (!hasRole) {
      this.throwForbiddenException(STRINGS.ForbiddenError);
    }

    return true;
  }

  private throwUnauthorizedException(message: string) {
    throw new UnauthorizedException({
      message,
    });
  }

  private throwForbiddenException(message: string) {
    throw new ForbiddenException({
      message,
    });
  }
}
