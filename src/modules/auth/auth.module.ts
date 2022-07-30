import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SessionModule } from '../session/session.module';
import { AccountModule } from '../account/account.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [SessionModule, AccountModule],
  exports: [AuthService],
})
export class AuthModule {}
