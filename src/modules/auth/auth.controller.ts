import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
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
  exit(@Body() obj: { token: string }) {
    return this.authService.exit(obj.token);
  }
}
