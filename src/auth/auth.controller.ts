import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { createAccountDto } from 'src/entity/account/dto/create-account.dto';
import { AuthService } from './auth.service';
import { loginDto } from './dto/login.dto';

@Controller('auth')
@ApiTags('Авторизация')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() account: loginDto) {
    return this.authService.login(account);
  }

  @Post('/register')
  register(@Body() account: createAccountDto) {
    return 1;
  }
}
