import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SessionTableModule } from '../entities/session-table/session-table.module';
import { AccountTableModule } from '../entities/account-table/account-table.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [SessionTableModule, AccountTableModule],
})
export class AuthModule {}
