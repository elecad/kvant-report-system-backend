import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { AccountController } from './account.controller';
import { Account } from './account.model';
import { AccountService } from './account.service';

@Module({
  controllers: [AccountController],
  providers: [AccountService],
  imports: [
    SequelizeModule.forFeature([Account]),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'STRING',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  exports: [AccountService],
})
export class AccountModule {}
