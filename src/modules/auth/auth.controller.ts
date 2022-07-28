import { Body, Controller, Delete, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth-guard/auth.guard';
import { Roles } from 'src/guards/auth-guard/decorators/roles.decorator';
import { Token } from 'src/guards/auth-guard/decorators/token.decorator';
import { User } from 'src/guards/auth-guard/decorators/user.decorator';
import { Account } from '../account/entities/account.entity';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.authentication(loginAuthDto);
  }

  @Delete()
  @UseGuards(AuthGuard)
  @Roles('admin')
  exit(@Token() token: string) {
    return this.authService.exit(token);
  }
}
