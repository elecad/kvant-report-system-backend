import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AccountModule } from 'src/entity/account/account.module';
import { JWT_CONFIG } from 'src/configs/jwt.config';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [JwtModule.register(JWT_CONFIG), forwardRef(() => AccountModule)],
  exports: [JwtModule],
})
export class AuthModule {}
