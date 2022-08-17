import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AccountTable } from 'src/modules/entities/account-table/entities/account-table.entity';
import { DependencyTable } from 'src/modules/entities/dependency-table/entities/dependency-table.entity';
import { DependencyTypeTable } from 'src/modules/entities/dependency-type-table/entities/dependency-type-table.entity';
import { DirectionTable } from 'src/modules/entities/direction-table/entities/direction-table.entity';
import { ProgrammTable } from 'src/modules/entities/programm-table/entities/programm-table.entity';
import { RoleTable } from 'src/modules/entities/role-table/entities/role-table.entity';
import { SchoolTable } from 'src/modules/entities/school-table/entities/school-table.entity';
import { SchoolTypeTable } from 'src/modules/entities/school-type-table/entities/school-type-table.entity';
import { SessionTableService } from 'src/modules/entities/session-table/session-table.service';
import { STRINGS } from 'src/res/strings';
import { validate as uuidValidate } from 'uuid';
import { ROLES_KEY } from './decorators/roles.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private sessionService: SessionTableService,
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
        model: AccountTable,
        attributes: ['id', 'surname', 'name', 'middlename'],
        include: [
          {
            model: RoleTable,
            through: { attributes: [] },
          },
          {
            model: DependencyTable,
            attributes: ['id', 'name', 'short_name'],
            include: [
              DependencyTypeTable,
              {
                model: ProgrammTable,
                include: [
                  DirectionTable,
                  {
                    model: SchoolTable,
                    include: [SchoolTypeTable],
                    attributes: ['id', 'name', 'adress'],
                  },
                ],
                attributes: [
                  'id',
                  'name',
                  'navigator_id',
                  'start_age',
                  'end_age',
                ],
              },
            ],
            through: { attributes: [] },
          },
        ],
      },
    });

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
